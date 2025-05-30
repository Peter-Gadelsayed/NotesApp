import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToasterService } from 'src/app/shared/toaster/toaster.service';
import { faRightFromBracket, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { SpinnerService } from 'src/app/shared/spinner/spinner.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  // FontAwesome Icons
  rightToBracket = faRightFromBracket;
  userPlus = faUserPlus;



  signupForm: FormGroup;
  submitted = false;
  errorMessage!: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authservice: AuthService,
    private toastr: ToasterService,
    private spinner: SpinnerService,
  ) {
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

  get form() {
    return {
      dirty: this.signupForm.dirty,
      submitted: this.submitted
    };
  }

  onSubmit() {
    this.submitted = true;

    if (this.signupForm.invalid) {
      return;
    }

    this.spinner.show(); // Show spinner

    this.authservice.signup(this.signupForm.value).subscribe({
      next: (response) => {
        this.toastr.SuccessToaster('Login successful!');
        localStorage.setItem('token', response.token);
        this.authservice.isLogged = () => true;
        setTimeout(() => {
          this.router.navigate(['/notes']);
          // window.location.replace('/notes');
          this.spinner.hide(); // Hide spinner on success
        }, 3000);
      },
      error: (err) => {
        const errorMessage = err.error?.message || 'Sign up failed. Please try again later.';
        this.errorMessage = errorMessage;
        this.spinner.hide(); // Hide spinner on error
        this.toastr.ErrorToaster(errorMessage);
      }
    });

  }
}
