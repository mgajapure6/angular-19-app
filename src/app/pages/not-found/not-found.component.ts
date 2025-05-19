import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

/**
 * NotFoundComponent displays a modern 404 page for invalid routes with a back-to-home button.
 */
@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [TranslateModule, CommonModule, RouterLink],
  template: `
    <div class="not-found-container">
      <div class="card text-center">
        <i class="bi bi-exclamation-circle display-1 text-danger"></i>
        <h1 class="mt-3">{{ 'NOT_FOUND.TITLE' | translate }}</h1>
        <p class="text-muted">{{ 'NOT_FOUND.MESSAGE' | translate }}</p>
        <a routerLink="/start" class="btn btn-primary">
          <i class="bi bi-house me-2"></i>
          {{ 'NOT_FOUND.BACK_HOME' | translate }}
        </a>
      </div>
    </div>
  `,
  styles: [`
    .not-found-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(180deg, var(--background), var(--primary-light));
      padding: 20px;
    }
    .card {
      max-width: 500px;
      width: 100%;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      padding: 30px;
      background: var(--white);
    }
    .display-1 {
      font-size: 5rem;
    }
    h1 {
      font-size: 2rem;
      font-weight: 500;
      color: var(--dark);
    }
    .text-muted {
      font-size: 1rem;
      margin-bottom: 20px;
    }
    .btn-primary {
      border-radius: 20px;
      padding: 10px 20px;
      transition: transform 0.2s;
    }
    .btn-primary:hover {
      transform: scale(1.05);
    }
  `]
})
export class NotFoundComponent {}