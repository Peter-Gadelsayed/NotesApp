import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  signupForm: FormGroup;
  submitted = false;
  errorMessage!: string;

  constructor(private fb: FormBuilder, private authservice: AuthService, private toastr: ToastrService, private spinner: NgxSpinnerService) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required, Validators.pattern('^01[0125][0-9]{8}$')]],
      age: ['', [Validators.required, Validators.min(1), Validators.max(150)]],
      address: ['', Validators.required],
    });
  }

  get f() {
    return this.signupForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.signupForm.invalid) {
      return;
    }

    this.spinner.show(); // Show spinner

    this.authservice.signup(this.signupForm.value).subscribe({
      next: (response) => {
        this.toastr.success('Login successful!', 'Success', {
          timeOut: 5000, // Toast duration
          progressBar: true, // Show progress bar
          closeButton: true, // Show close button
          tapToDismiss: false, // Click does not dismiss
          positionClass: 'toast-top-right' // Custom position
        });
        localStorage.setItem('token', response.token);
        this.authservice.isLogged = () => true;
        setTimeout(() => {
          window.location.replace('/notes');
          this.spinner.hide(); // Hide spinner after redirection
        }, 2000); // Redirect after 2 seconds
      },
      error: (err) => {
        const errorMessage = err.error?.message || 'Sign up failed. Please try again later.';
        this.errorMessage = errorMessage;
        this.spinner.hide(); // Hide spinner on error
        this.toastr.error(errorMessage, 'Error', {
          timeOut: 5000, // Toast duration
          progressBar: true, // Show progress bar
          closeButton: true, // Show close button
          tapToDismiss: false, // Click does not dismiss
          positionClass: 'toast-top-right' // Custom position
        });
      }
    });

  }
}
