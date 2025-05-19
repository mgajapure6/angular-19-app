import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

/**
 * AuthComponent provides a standalone login form for user authentication.
 * Uses RxJS for state management and localStorage for persistence.
 */
@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [TranslateModule, CommonModule, RouterLink, ReactiveFormsModule],
  template: `
    <div class="auth-container">
      <div class="card">
        <h1 class="text-center">
          <i class="bi bi-box-arrow-in-right me-2"></i>
          {{ 'AUTH.TITLE' | translate }}
        </h1>
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="mt-4">
          <div class="mb-3">
            <label for="username" class="form-label">{{ 'AUTH.USERNAME' | translate }}</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-person"></i></span>
              <input
                id="username"
                type="text"
                class="form-control"
                formControlName="username"
                [placeholder]="'AUTH.USERNAME_PLACEHOLDER' | translate"
                [ngClass]="{'is-invalid': loginForm.get('username')?.touched && loginForm.get('username')?.invalid}"
              />
              <div *ngIf="loginForm.get('username')?.touched && loginForm.get('username')?.invalid" class="invalid-feedback">
                {{ 'AUTH.USERNAME_REQUIRED' | translate }}
              </div>
            </div>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">{{ 'AUTH.PASSWORD' | translate }}</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-lock"></i></span>
              <input
                id="password"
                type="password"
                class="form-control"
                formControlName="password"
                [placeholder]="'AUTH.PASSWORD_PLACEHOLDER' | translate"
                [ngClass]="{'is-invalid': loginForm.get('password')?.touched && loginForm.get('password')?.invalid}"
              />
              <div *ngIf="loginForm.get('password')?.touched && loginForm.get('password')?.invalid" class="invalid-feedback">
                {{ 'AUTH.PASSWORD_REQUIRED' | translate }}
              </div>
            </div>
          </div>
          <div *ngIf="errorMessage" class="alert alert-danger" role="alert">
            {{ errorMessage | translate }}
          </div>
          <button type="submit" class="btn btn-primary w-100 d-flex align-items-center justify-content-center" [disabled]="loginForm.invalid">
            <i class="bi bi-box-arrow-in-right me-2"></i>
            {{ 'AUTH.LOGIN' | translate }}
          </button>
        </form>
        <div class="text-center mt-3">
          <a routerLink="/start">{{ 'AUTH.BACK_TO_START' | translate }}</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(180deg, var(--background), var(--primary-light));
      padding: 20px;
    }
    .card {
      max-width: 400px;
      width: 100%;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      padding: 30px;
      background: var(--white);
    }
    h1 {
      font-size: 1.8rem;
      font-weight: 500;
      color: var(--dark);
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .form-label {
      font-size: 0.9rem;
      color: var(--dark);
    }
    .input-group-text {
      background: var(--background);
      border: 1px solid var(--border);
      border-right: none;
    }
    .form-control {
      border-radius: 0 20px 20px 0;
      border: 1px solid var(--border);
      padding: 10px;
      font-size: 0.9rem;
    }
    .form-control:focus {
      box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
      border-color: var(--primary);
    }
    .is-invalid ~ .invalid-feedback {
      font-size: 0.8rem;
    }
    .btn-primary {
      border-radius: 20px;
      padding: 12px;
      font-size: 1rem;
      transition: transform 0.2s;
    }
    .btn-primary:hover {
      transform: scale(1.05);
    }
    .btn-primary:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
    .alert-danger {
      font-size: 0.85rem;
      padding: 10px;
      border-radius: 8px;
      margin-bottom: 15px;
    }
    a {
      color: var(--primary);
      text-decoration: none;
      font-size: 0.9rem;
    }
    a:hover {
      text-decoration: underline;
    }
  `]
})
export class AuthComponent implements OnInit {
  /**
   * Login form group for username and password
   */
  loginForm: FormGroup;
  /**
   * Error message for invalid credentials
   */
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Reset error message on init
    this.errorMessage = null;
    // Check if already logged in and redirect to /home
    this.userService.user$.subscribe(user => {
      if (user.isLoggedIn) {
        this.router.navigate(['/home']);
      }
    });
  }

  /**
   * Handles form submission to authenticate the user
   */
  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      const isAuthenticated = this.userService.authenticate(username, password);
      if (isAuthenticated) {
        this.errorMessage = null;
        const returnUrl = this.router.routerState.snapshot.root.queryParams['returnUrl'] || '/home';
        this.router.navigate([returnUrl]);
      } else {
        this.errorMessage = 'AUTH.INVALID_CREDENTIALS';
      }
    }
  }
}