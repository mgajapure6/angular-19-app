import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

/**
 * FooterComponent displays a fixed footer inside the sidebar with copyright information,
 * application version, and a version icon. Collapses with the sidebar.
 */
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  template: `
    <footer class="footer">
      <p>
        <i class="bi bi-info-circle me-2"></i>
        {{ 'FOOTER.COPYRIGHT' | translate }} | v{{ appVersion }}
      </p>
    </footer>
  `,
  styles: [`
    .footer {
      position: fixed;
      bottom: 0;
      width: inherit; /* Inherit sidebar width */
      height: 50px;
      background: var(--dark-light);
      color: var(--white);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.2);
      font-size: 0.85rem;
      transition: width 0.3s ease; /* Smooth width transition */
    }
    .bi-info-circle {
      font-size: 1rem;
    }
  `],
})
export class FooterComponent {
  /**
   * Application version from environment
   */
  appVersion = environment.appVersion;
}