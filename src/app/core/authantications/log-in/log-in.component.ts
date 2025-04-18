import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { SpinnerService } from 'src/app/shared/spinner/spinner.service';
import { ToasterService } from 'src/app/shared/toaster/toaster.service';
import { faRightFromBracket, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  // FontAwesome Icons
  rightToBracket = faRightFromBracket;
  userPlus = faUserPlus;


  constructor(
    private fb: FormBuilder,
    private authservice: AuthService,
    private toastr: ToasterService,
    private spinner: SpinnerService,
    private router: Router
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

    this.spinner.show(); // Show spinner

    this.authservice.login(this.loginForm.value).subscribe({
      next: (response) => {
        this.toastr.SuccessToaster('Login successful!');
        localStorage.setItem('token', response.token);
        this.authservice.isLogged = () => true;
        setTimeout(() => {
          this.router.navigate(['/notes']);
          // window.location.replace('/notes');
          this.spinner.hide(); // Hide spinner on success
        }, 2500);
      },
      error: (err) => {
        const errorMessage = err.error?.message || 'Login failed. Please try again later.';
        this.errorMessage = errorMessage;
        this.spinner.hide(); // Hide spinner on error
        this.toastr.ErrorToaster(errorMessage);
      }
    });
  }
}


