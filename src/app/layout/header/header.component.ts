import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { SidebarService } from '../../core/services/sidebar.service';
import { UserService } from '../../core/services/user.service';
import { Router } from '@angular/router';

/**
 * HeaderComponent displays the top navigation bar with brand title, language switcher,
 * collapse button, notification bell, and user info with logout option.
 */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  template: `
    <header class="header">
      <div class="container-fluid d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center">
          <h1 class="brand-title">{{ 'APP_TITLE' | translate }}</h1>
          <button class="btn btn-outline-light ms-3 d-flex" (click)="toggleSidebar()">
            <i class="bi bi-list"></i>
          </button>
        </div>
        <div class="d-flex align-items-center">
          <div class="notification me-3 position-relative">
            <i class="bi bi-bell"></i>
            <span class="badge bg-danger position-absolute top-0 start-100 translate-middle">3</span>
          </div>
          <div class="dropdown me-3">
            <button class="btn btn-outline-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              {{ currentLang === 'en' ? 'English' : 'Deutsch' }}
            </button>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#" (click)="switchLang('en'); $event.preventDefault()">English</a></li>
              <li><a class="dropdown-item" href="#" (click)="switchLang('de'); $event.preventDefault()">Deutsch</a></li>
            </ul>
          </div>
          <div class="user-info dropdown">
            <button class="btn btn-outline-light dropdown-toggle d-flex" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="bi bi-person-circle me-3"></i>
              {{ user?.username || 'Guest' }}
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
              <li>
                <a class="dropdown-item" href="#" (click)="logout(); $event.preventDefault()">
                  <i class="bi bi-box-arrow-right me-2"></i>
                  {{ 'HEADER.LOGOUT' | translate }}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 60px;
      background: linear-gradient(90deg, var(--dark), var(--dark-light));
      color: var(--white);
      z-index: 1000;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }
    .container-fluid {
      height: 100%;
      padding: 0 20px;
    }
    .brand-title {
      font-size: 1.5rem;
      font-weight: 500;
      color: var(--white);
      margin: 0;
    }
    .btn-outline-light {
      border-radius: 20px;
      padding: 5px 10px;
      font-size: 0.9rem;
    }
    .btn-outline-light:hover {
      background: var(--primary-light);
      border-color: var(--primary-light);
    }
    .notification .bi-bell {
      font-size: 1.3rem;
      cursor: pointer;
      transition: transform 0.2s;
    }
    .notification .bi-bell:hover {
      transform: scale(1.1);
    }
    .notification .badge {
      font-size: 0.6rem;
      padding: 3px 5px;
    }
    .dropdown-menu {
      background: var(--white);
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }
    .dropdown-item {
      font-size: 0.9rem;
      color: var(--dark);
      padding: 8px 15px;
    }
    .dropdown-item:hover {
      background: var(--primary-light);
      color: var(--dark);
    }
    .user-info .dropdown-toggle {
      display: flex;
      align-items: center;
      font-size: 0.9rem;
    }
  `]
})
export class HeaderComponent {
  /**
   * Current language for translation
   */
  currentLang: string;
  /**
   * Current user state
   */
  user: { username: string; isLoggedIn: boolean } | null = null;

  /**
   * LocalStorage key for language
   */
  private readonly LANGUAGE_KEY = 'app_language';

  constructor(
    private translate: TranslateService,
    private sidebarService: SidebarService,
    private userService: UserService,
    private router: Router
  ) {
    // Initialize language from localStorage or default to 'en'
    this.currentLang = localStorage.getItem(this.LANGUAGE_KEY) || 'en';
    this.translate.use(this.currentLang);
    // Subscribe to user state
    this.userService.user$.subscribe(user => {
      this.user = user;
    });
  }

  /**
   * Switches the application language and persists in localStorage
   * @param lang The language code (en/de)
   */
  switchLang(lang: string) {
    this.translate.use(lang);
    this.currentLang = lang;
    localStorage.setItem(this.LANGUAGE_KEY, lang);
  }

  /**
   * Toggles the sidebar collapse state
   */
  toggleSidebar() {
    this.sidebarService.toggleCollapse();
  }

  /**
   * Logs out the user and redirects to /auth
   */
  logout() {
    this.userService.logout();
    this.router.navigate(['/auth']);
  }
}