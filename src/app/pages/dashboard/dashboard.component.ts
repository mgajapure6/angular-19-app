import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  template: `
    <div class="dashboard-container">
      <h2><i class="bi bi-speedometer2 me-2"></i>{{ 'SIDEBAR.DASHBOARD' | translate }}</h2>
      <p>Welcome to the Dashboard page. This is accessible only to authenticated users.</p>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 20px;
    }
    h2 {
      font-size: 1.8rem;
      display: flex;
      align-items: center;
      color: var(--dark);
    }
    p {
      font-size: 1rem;
      color: var(--text);
    }
  `]
})
export class DashboardComponent {}