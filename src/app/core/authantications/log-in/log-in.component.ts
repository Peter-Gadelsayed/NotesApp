import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
    private toastr: ToastrService
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

    this.authservice.login(this.loginForm.value).subscribe({
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
          this.router.navigate(['/notes']);
        }, 500);
      },
      error: (err) => {
        const errorMessage = err.error?.message || 'Login failed. Please try again later.';
        this.errorMessage = errorMessage;
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


