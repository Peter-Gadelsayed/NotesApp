import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from 'src/app/shared/spinner/spinner.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private authservice: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private spinnerService: SpinnerService
  ) { }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  loginForm!: FormGroup;
  submitted = false;
  errorMessage!: string;

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.spinnerService.show();

    this.authservice.login(this.loginForm.value).subscribe({
      next: (response) => {
        this.toastr.success('Login successful!', 'Success', {
          timeOut: 2500, // Toast duration
          progressBar: true, // Show progress bar
          closeButton: true, // Show close button
          tapToDismiss: false, // Click does not dismiss
          positionClass: 'toast-top-right' // Custom position
        });
        localStorage.setItem('token', response.token);
        this.authservice.isLogged = () => true;
        setTimeout(() => {
          window.location.replace('/notes');
          this.spinnerService.hide();
        }, 1500); // Redirect after 2 seconds
      },
      error: (err) => {
        const errorMessage = err.error?.message || 'Login failed. Please try again later.';
        this.errorMessage = errorMessage;
        this.spinnerService.hide();
        this.toastr.error(errorMessage, 'Error', {
          timeOut: 2500, // Toast duration
          progressBar: true, // Show progress bar
          closeButton: true, // Show close button
          tapToDismiss: false, // Click does not dismiss
          positionClass: 'toast-top-right' // Custom position
        });
      }
    });
  }
}


