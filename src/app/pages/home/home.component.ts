import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

/**
 * HomeComponent displays a welcome page for the Stock Monitoring System,
 * featuring a title, description, navigation buttons, and support links.
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TranslateModule, CommonModule, RouterLink],
  template: `
    <div class="home-container">
      <!-- Hero Section -->
      <div class="hero-section text-center bg-gradient shadow-sm">
        <h1 class="hero-title">{{ 'HOME.TITLE' | translate }}</h1>
        <p class="hero-description">{{ 'HOME.DESCRIPTION' | translate }}</p>
      </div>

      <!-- Navigation Buttons -->
      <div class="container mt-4">
        <div class="row g-4">
          <div class="col-md-6">
            <a routerLink="/management-report" class="card nav-card shadow-sm text-decoration-none">
              <div class="card-body text-center">
                <i class="bi bi-bar-chart display-4 text-primary"></i>
                <h3 class="card-title mt-3">{{ 'HOME.MANAGEMENT_REPORT' | translate }}</h3>
                <p class="card-text text-muted">{{ 'HOME.MANAGEMENT_REPORT_DESC' | translate }}</p>
              </div>
            </a>
          </div>
          <div class="col-md-6">
            <a routerLink="/dispatcher-report" class="card nav-card shadow-sm text-decoration-none">
              <div class="card-body text-center">
                <i class="bi bi-truck display-4 text-primary"></i>
                <h3 class="card-title mt-3">{{ 'HOME.DISPATCHER_REPORT' | translate }}</h3>
                <p class="card-text text-muted">{{ 'HOME.DISPATCHER_REPORT_DESC' | translate }}</p>
              </div>
            </a>
          </div>
        </div>
      </div>

      <!-- Support Links -->
      <div class="container mt-4">
        <div class="row g-4">
          <div class="col-md-6">
            <a href="/user-manual" target="_blank" class="card support-card shadow-sm text-decoration-none">
              <div class="card-body d-flex align-items-center">
                <i class="bi bi-book fs-1 me-3 text-primary"></i>
                <div>
                  <h4 class="card-title mb-0">{{ 'HOME.USER_MANUAL' | translate }}</h4>
                  <p class="card-text text-muted">{{ 'HOME.USER_MANUAL_DESC' | translate }}</p>
                </div>
              </div>
            </a>
          </div>
          <div class="col-md-6">
            <a href="mailto:support@stockmonitor.com" class="card support-card shadow-sm text-decoration-none">
              <div class="card-body d-flex align-items-center">
                <i class="bi bi-envelope fs-1 me-3 text-primary"></i>
                <div>
                  <h4 class="card-title mb-0">{{ 'HOME.SUPPORT_EMAIL' | translate }}</h4>
                  <p class="card-text text-muted">{{ 'HOME.SUPPORT_EMAIL_DESC' | translate }}</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      padding: 50px 20px 20px 20px; /* Account for fixed header */
      min-height: 100vh;
    }
    .hero-section {
      padding: 60px 20px;
      border-radius: 12px;
      background: #fff;
      margin-bottom: 40px;
    }
    .hero-title {
      font-size: 2.5rem;
      font-weight: 600;
      margin-bottom: 20px;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }
    .hero-description {
      font-size: 1.2rem;
      max-width: 800px;
      margin: 0 auto;
      line-height: 1.6;
    }
    .nav-card {
      transition: transform 0.3s, box-shadow 0.3s;
      border: none;
      border-radius: 12px;
      background: var(--white);
      overflow: hidden;
    }
    .nav-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }
    .nav-card .card-title {
      font-size: 1.5rem;
      font-weight: 500;
      color: var(--dark);
    }
    .nav-card .card-text {
      font-size: 0.9rem;
    }
    .support-card {
      transition: transform 0.3s, box-shadow 0.3s;
      border: none;
      border-radius: 12px;
      background: var(--white);
    }
    .support-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }
    .support-card .card-title {
      font-size: 1.2rem;
      font-weight: 500;
      color: var(--dark);
    }
    .support-card .card-text {
      font-size: 0.85rem;
    }
    @media (max-width: 768px) {
      .hero-title {
        font-size: 2rem;
      }
      .hero-description {
        font-size: 1rem;
      }
    }
  `]
})
export class HomeComponent {}