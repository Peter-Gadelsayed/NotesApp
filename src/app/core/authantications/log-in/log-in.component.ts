import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { SpinnerService } from 'src/app/shared/spinner/spinner.service';
import { ToasterService } from 'src/app/shared/toaster/toaster.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private authservice: AuthService,
    private toastr: ToasterService,
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
        this.toastr.SuccessToaster('Login successful!');
        localStorage.setItem('token', response.token);
        this.authservice.isLogged = () => true;
        setTimeout(() => {
          window.location.replace('/notes');
          this.spinnerService.hide();
        }, 3000);
      },
      error: (err) => {
        const errorMessage = err.error?.message || 'Login failed. Please try again later.';
        this.errorMessage = errorMessage;
        this.spinnerService.hide();
        this.toastr.ErrorToaster(errorMessage);
      }
    });
  }
}


