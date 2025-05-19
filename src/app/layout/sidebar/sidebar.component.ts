import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { SidebarService } from '../../core/services/sidebar.service';

/**
 * SidebarComponent displays a fixed navigation menu with Bootstrap Icons, hover effects,
 * and tooltips for collapsed state. Fills full height.
 */
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TranslateModule, CommonModule],
  template: `
    <nav class="sidebar" [ngClass]="{'collapsed': sidebarService.getIsCollapsed()()}">
      <div class="sidebar-sticky">
        <ul class="nav flex-column">
          <li class="nav-item">
            <a class="nav-link" routerLink="/home" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" [title]="sidebarService.getIsCollapsed()() ? ('SIDEBAR.HOME' | translate) : ''">
              <i class="bi bi-house"></i>
              <span [ngClass]="{'d-none': sidebarService.getIsCollapsed()()}">{{ 'SIDEBAR.HOME' | translate }}</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" routerLink="/dashboard" routerLinkActive="active" [title]="sidebarService.getIsCollapsed()() ? ('SIDEBAR.DASHBOARD' | translate) : ''">
              <i class="bi bi-speedometer2"></i>
              <span [ngClass]="{'d-none': sidebarService.getIsCollapsed()()}">{{ 'SIDEBAR.DASHBOARD' | translate }}</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" routerLink="/management-report" routerLinkActive="active" [title]="sidebarService.getIsCollapsed()() ? ('SIDEBAR.MANAGEMENT_REPORT' | translate) : ''">
              <i class="bi bi-file-earmark-text"></i>
              <span [ngClass]="{'d-none': sidebarService.getIsCollapsed()()}">{{ 'SIDEBAR.MANAGEMENT_REPORT' | translate }}</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" routerLink="/dispatcher-report" routerLinkActive="active" [title]="sidebarService.getIsCollapsed()() ? ('SIDEBAR.DISPATCHER_REPORT' | translate) : ''">
              <i class="bi bi-file-earmark-ruled"></i>
              <span [ngClass]="{'d-none': sidebarService.getIsCollapsed()()}">{{ 'SIDEBAR.DISPATCHER_REPORT' | translate }}</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" routerLink="/factory-config" routerLinkActive="active" [title]="sidebarService.getIsCollapsed()() ? ('SIDEBAR.FACTORY_CONFIG' | translate) : ''">
              <i class="bi bi-gear"></i>
              <span [ngClass]="{'d-none': sidebarService.getIsCollapsed()()}">{{ 'SIDEBAR.FACTORY_CONFIG' | translate }}</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" routerLink="/part-config" routerLinkActive="active" [title]="sidebarService.getIsCollapsed()() ? ('SIDEBAR.PART_CONFIG' | translate) : ''">
              <i class="bi bi-puzzle"></i>
              <span [ngClass]="{'d-none': sidebarService.getIsCollapsed()()}">{{ 'SIDEBAR.PART_CONFIG' | translate }}</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" routerLink="/parameter-config" routerLinkActive="active" [title]="sidebarService.getIsCollapsed()() ? ('SIDEBAR.PARAMETER_CONFIG' | translate) : ''">
              <i class="bi bi-sliders"></i>
              <span [ngClass]="{'d-none': sidebarService.getIsCollapsed()()}">{{ 'SIDEBAR.PARAMETER_CONFIG' | translate }}</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  `,
  styles: [`
    .sidebar {
      position: fixed;
      top: 60px;
      left: 0;
      width: 250px;
      height: calc(100vh - 60px);
      background: linear-gradient(180deg, var(--dark), var(--dark-light));
      color: var(--white);
      transition: width 0.3s ease;
      z-index: 900;
      display: flex;
      flex-direction: column;
      box-shadow: 4px 0 12px rgba(0, 0, 0, 0.2);
    }
    .sidebar.collapsed {
      width: 80px;
    }
    .sidebar-sticky {
      flex-grow: 1;
      overflow-y: auto;
      padding: 20px 0;
      height: 100%;
    }
    .nav-link {
      display: flex;
      align-items: center;
      padding: 12px 20px;
      color: var(--white);
      font-size: 0.95rem;
      transition: background 0.2s, padding-left 0.2s;
    }
    .nav-link:hover {
      background: var(--primary-light);
      padding-left: 25px;
    }
    .nav-link.active {
      background: var(--primary);
      position: relative;
    }
    .nav-link.active::after {
      content: '';
      position: absolute;
      right: 0;
      width: 4px;
      height: 100%;
      background: var(--accent);
    }
    .bi {
      font-size: 1.5rem;
      width: 24px;
      height: 24px;
      margin-right: 10px;
      transition: transform 0.2s;
    }
    .nav-link:hover .bi {
      transform: scale(1.1);
    }
    .collapsed .nav-link {
      justify-content: center;
    }
    .nav-link[title] {
      position: relative;
    }
    .nav-link[title]:hover::after {
      content: attr(title);
      position: absolute;
      left: 100%;
      top: 50%;
      transform: translateY(-50%);
      background: var(--dark);
      color: var(--white);
      padding: 5px 10px;
      border-radius: 5px;
      white-space: nowrap;
      z-index: 1000;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }
  `],
})
export class SidebarComponent {
  constructor(public sidebarService: SidebarService, private translate: TranslateService) {}
}