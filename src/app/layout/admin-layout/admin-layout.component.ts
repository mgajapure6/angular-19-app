import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarService } from '../../core/services/sidebar.service';

/**
 * AdminLayoutComponent serves as the main layout with a fixed header, fixed sidebar,
 * and a scrollable main content area that expands to the remaining viewport width on sidebar collapse.
 */
@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, RouterOutlet, CommonModule],
  template: `
    <div class="d-flex flex-column min-vh-100">
      <!-- Fixed header -->
      <app-header></app-header>
      <!-- Container for sidebar and main content -->
      <div class="d-flex flex-grow-1 content-wrapper">
        <!-- Fixed sidebar -->
        <app-sidebar></app-sidebar>
        <!-- Scrollable main content -->
        <main class="main-content" [ngClass]="{'collapsed': isCollapsed}">
          <div class="content-container">
            <router-outlet></router-outlet>
          </div>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .content-wrapper {
      margin-top: 60px;
    }
    .main-content {
      margin-left: 250px;
      overflow-y: auto;
      height: calc(100vh - 60px);
      background: var(--background);
      box-sizing: border-box; /* Prevent padding issues */
      width: calc(100vw - 250px); /* Occupy remaining viewport width */
      transition: margin-left 0.3s ease, width 0.3s ease; /* Smooth transition */
      background-color: #eff9ff;
    }
    .main-content.collapsed {
      margin-left: 80px;
      width: calc(100vw - 80px); /* Expand to remaining width when collapsed */
    }
    .content-container {
      max-width: 100%;
      margin: 0 auto;
    }
    /* Debug: Visually indicate collapse state */
    .main-content::before {
      content: 'Expanded';
      position: fixed;
      top: 70px;
      right: 20px;
      background: var(--primary);
      color: var(--white);
      padding: 5px 10px;
      border-radius: 5px;
      font-size: 0.8rem;
    }
    .main-content.collapsed::before {
      content: 'Collapsed';
    }
  `]
})
export class AdminLayoutComponent {
  constructor(public sidebarService: SidebarService) {}

  /**
   * Computed property to track sidebar collapse state
   */
  get isCollapsed() {
    return this.sidebarService.getIsCollapsed()();
  }
}