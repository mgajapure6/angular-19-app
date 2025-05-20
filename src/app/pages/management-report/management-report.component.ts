import { Component, signal } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ManagementReportService } from '../../core/services/management-report.service';

/**
 * Interface for part data
 */
interface Part {
  partcode: string;
  partDescription: string;
  lagCustomer: number;
  mat: number;
  lagMat: number;
  dailyDemand: number;
  rangeLag: number;
  rangeLagMat: number;
  int: number;
  rangeLagMatInt: number;
  lagSupplier: number;
  factoryCodeSupplier: string;
  siv: string;
}

/**
 * Interface for factory group data
 */
interface Factory {
  factoryName: string;
  parts: Part[];
}

/**
 * ManagementReportComponent displays a full-width table with collapsible factory groups,
 * selectable report time dropdown, search, and export button.
 */
@Component({
  selector: 'app-management-report',
  standalone: true,
  imports: [TranslateModule, CommonModule, FormsModule],
  providers: [DatePipe],
  template: `
    <div class="report-container">
      <!-- Header Controls -->
      <div class="header-controls d-flex justify-content-between align-items-center mb-4">
        <div class="report-time">
          <label class="me-2">{{ 'MANAGEMENT_REPORT.REPORT_TIME' | translate }}</label>
          <select
            class="form-control"
            [(ngModel)]="currentTime"
            (ngModelChange)="onTimeChange()"
          >
            <option *ngFor="let time of availableTimes" [value]="time">{{ time }}</option>
          </select>
        </div>
        <div class="search-form d-flex">
          <input
            type="text"
            class="form-control"
            [placeholder]="'MANAGEMENT_REPORT.SEARCH_PLACEHOLDER' | translate"
            [(ngModel)]="searchTerm"
            (ngModelChange)="filterData()"
          />
          <button class="btn btn-primary" (click)="filterData()">
            <i class="bi bi-search"></i>
          </button>
        </div>
        <button class="btn btn-success" (click)="exportReport()">
          <i class="bi bi-download me-2"></i>
          {{ 'MANAGEMENT_REPORT.EXPORT' | translate }}
        </button>
      </div>

      <!-- Table -->
      <div class="table-responsive">
        <table class="table table-striped table-bordered">
          <thead class="table-dark sticky-top">
            <tr>
              <th>{{ 'MANAGEMENT_REPORT.PARTCODE' | translate }}</th>
              <th>{{ 'MANAGEMENT_REPORT.PART_DESCRIPTION' | translate }}</th>
              <th>{{ 'MANAGEMENT_REPORT.LAG_CUSTOMER' | translate }}</th>
              <th>{{ 'MANAGEMENT_REPORT.MAT' | translate }}</th>
              <th>{{ 'MANAGEMENT_REPORT.LAG_MAT' | translate }}</th>
              <th>{{ 'MANAGEMENT_REPORT.DAILY_DEMAND' | translate }}</th>
              <th>{{ 'MANAGEMENT_REPORT.RANGE_LAG' | translate }}</th>
              <th>
                {{ 'MANAGEMENT_REPORT.RANGE_LAG_MAT' | translate }}
                <i class="bi bi-sort-alpha-down ms-1"></i>
              </th>
              <th>{{ 'MANAGEMENT_REPORT.INT' | translate }}</th>
              <th>{{ 'MANAGEMENT_REPORT.RANGE_LAG_MAT_INT' | translate }}</th>
              <th>{{ 'MANAGEMENT_REPORT.LAG_SUPPLIER' | translate }}</th>
              <th>{{ 'MANAGEMENT_REPORT.FACTORY_CODE_SUPPLIER' | translate }}</th>
              <th>{{ 'MANAGEMENT_REPORT.SIV' | translate }}</th>
            </tr>
          </thead>
          <tbody>
            <ng-container *ngFor="let factory of filteredData; let i = index">
              <!-- Factory Group Row -->
              <tr
                class="factory-group bg-primary text-white text-center"
                (click)="toggleCollapse(i)"
                style="cursor: pointer;"
              >
                <td colspan="13">
                  <div class="group-name">
                    <i class="bi" [ngClass]="collapseStates()[i] ? 'bi-chevron-down' : 'bi-chevron-right'"></i>
                    {{ factory.factoryName }}
                  </div>
                </td>
              </tr>
              <!-- Parts Rows -->
              <ng-container *ngIf="collapseStates()[i]">
                <tr *ngFor="let part of factory.parts">
                  <td>{{ part.partcode }}</td>
                  <td>{{ part.partDescription }}</td>
                  <td>{{ part.lagCustomer }}</td>
                  <td>{{ part.mat }}</td>
                  <td>{{ part.lagMat }}</td>
                  <td>{{ part.dailyDemand }}</td>
                  <td>{{ part.rangeLag }}</td>
                  <td>{{ part.rangeLagMat }}</td>
                  <td>{{ part.int }}</td>
                  <td>{{ part.rangeLagMatInt }}</td>
                  <td>{{ part.lagSupplier }}</td>
                  <td>{{ part.factoryCodeSupplier }}</td>
                  <td>{{ part.siv }}</td>
                </tr>
              </ng-container>
            </ng-container>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .report-container {
      padding: 50px 20px 20px 20px; /* Account for fixed header */
      min-height: 100vh;
    }
    .header-controls {
      padding: 15px;
      background: var(--white);
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    .report-time {
      font-size: 1rem;
      font-weight: 500;
      color: var(--dark);
      display: flex;
      align-items: center;
    }
    .report-time .form-control {
      width: 200px;
      border-radius: 8px;
      font-size: 0.9rem;
    }
    .search-form {
      max-width: 300px;
    }
    .search-form .form-control {
      border-radius: 20px 0 0 20px;
      border-right: none;
      font-size: 0.9rem;
    }
    .search-form .btn-primary {
      border-radius: 0 20px 20px 0;
      padding: 8px 15px;
    }
    .btn-success {
      border-radius: 20px;
      padding: 10px 20px;
      transition: transform 0.2s;
    }
    .btn-success:hover {
      transform: scale(1.05);
    }
    .table-responsive {
      border-radius: 12px;
      overflow-y: auto;
      max-height: calc(100vh - 150px); /* Adjust for header and controls */
    }
    .table {
      margin-bottom: 0;
      font-size: 0.9rem;
    }
    .table th {
      font-weight: 500;
      vertical-align: middle;
      padding: 12px;
    }
    .table td {
      vertical-align: middle;
      padding: 10px;
    }
    .table-striped tbody tr:nth-of-type(odd) {
      background-color: var(--background);
    }
    .factory-group {
      font-weight: 600;
      font-size: 1.1rem;
      transition: background-color 0.2s;
    }
    .factory-group:hover {
      background-color: darken(#49a6ff, 10%) !important;
    }
    .factory-group .bi {
      margin-right: 8px;
    }
    .factory-group td {
      background-color: #49a6ff;
      color: #fff;
    }
    .group-name {
      display: flex;
      align-items: center;
      gap: 45%;
    }
    .sticky-top {
      top: 0px; /* Match AdminLayoutComponent header height */
      z-index: 1000; /* Ensure above content */
      background: var(--dark); /* Prevent content bleed-through */
    }
    @media (max-width: 768px) {
      .header-controls {
        flex-direction: column;
        align-items: stretch;
        gap: 15px;
      }
      .search-form, .report-time .form-control {
        max-width: 100%;
      }
      .report-time, .btn-success {
        text-align: center;
      }
      .table-responsive {
        max-height: calc(100vh - 200px); /* Adjust for mobile */
      }
    }
  `]
})
export class ManagementReportComponent {
  /**
   * Current selected report time
   */
  currentTime: string;
  /**
   * Available report times (last 10 half-hours)
   */
  availableTimes: string[] = [];
  /**
   * Search term signal
   */
  searchTerm = signal('');
  /**
   * Collapse state for each factory
   */
  collapseStates = signal<boolean[]>([]);
  /**
   * Original report data
   */
  reportData: Factory[] = [];
  /**
   * Filtered report data based on search
   */
  filteredData: Factory[] = [];

  constructor(
    private reportService: ManagementReportService,
    private datePipe: DatePipe,
    private translate: TranslateService
  ) {
    // Initialize report times (last 10 half-hours)
    this.initializeReportTimes();
    this.currentTime = this.availableTimes[0]; // Default to latest time
    // Fetch data
    this.reportData = this.reportService.getReportData();
    this.filteredData = [...this.reportData];
    // Initialize collapse states (all expanded)
    this.collapseStates.set(new Array(this.reportData.length).fill(true));
  }

  /**
   * Generates dummy report times for the last 10 half-hour intervals
   */
  private initializeReportTimes() {
    const now = new Date('2025-05-20T13:30:00'); // Approximate 1:30 PM IST
    for (let i = 0; i < 10; i++) {
      const time = new Date(now.getTime() - i * 30 * 60 * 1000); // Subtract 30 minutes
      const formattedTime = this.datePipe.transform(time, 'yyyy-MM-dd HH:mm') || '';
      this.availableTimes.push(formattedTime);
    }
  }

  /**
   * Handles report time selection change
   */
  onTimeChange() {
    console.log('Selected Report Time:', this.currentTime);
    // TODO: Filter data based on selected time
  }

  /**
   * Toggles collapse state for a factory
   * @param index Factory index
   */
  toggleCollapse(index: number) {
    this.collapseStates.update(states => {
      const newStates = [...states];
      newStates[index] = !newStates[index];
      return newStates;
    });
  }

  /**
   * Filters data based on search term
   */
  filterData() {
    const term = this.searchTerm().toLowerCase();
    if (!term) {
      this.filteredData = [...this.reportData];
      return;
    }
    this.filteredData = this.reportData.map(factory => ({
      ...factory,
      parts: factory.parts.filter(
        part =>
          part.partcode.toLowerCase().includes(term) ||
          part.partDescription.toLowerCase().includes(term)
      )
    })).filter(factory => factory.parts.length > 0);
  }

  /**
   * Placeholder for export functionality
   */
  exportReport() {
    console.log('Exporting Management Report:', this.filteredData);
    // TODO: Implement CSV/PDF export
  }
}