// src/app/pages/management-report/management-report.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManagementReportComponent } from './management-report.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { ManagementReportService } from '../../core/services/management-report.service';
import { DatePipe } from '@angular/common';

describe('ManagementReportComponent', () => {
  let component: ManagementReportComponent;
  let fixture: ComponentFixture<ManagementReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), FormsModule, ManagementReportComponent],
      providers: [ManagementReportService, DatePipe]
    }).compileComponents();

    fixture = TestBed.createComponent(ManagementReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display report time dropdown', () => {
    const dropdown = fixture.nativeElement.querySelector('.report-time select');
    expect(dropdown).toBeTruthy();
    expect(dropdown.options.length).toBe(10);
    expect(dropdown.options[0].text).toContain('2025-05-20 13:30');
  });

  it('should display table with factory groups and chevrons', () => {
    const groups = fixture.nativeElement.querySelectorAll('.factory-group');
    expect(groups.length).toBe(10);
    expect(groups[0].textContent).toContain('Factory 1');
    expect(groups[0].querySelector('.bi-chevron-down')).toBeTruthy();
    expect(groups[0].querySelector('.group-name')).toBeTruthy();
  });

  it('should toggle collapse and chevron', () => {
    component.toggleCollapse(0);
    fixture.detectChanges();
    expect(component.collapseStates()[0]).toBeFalse();
    const group = fixture.nativeElement.querySelector('.factory-group');
    expect(group.querySelector('.bi-chevron-right')).toBeTruthy();
  });

  it('should filter data', () => {
    component.searchTerm.set('P1001');
    component.filterData();
    fixture.detectChanges();
    const rows = fixture.nativeElement.querySelectorAll('tbody tr:not(.factory-group)');
    expect(rows.length).toBeGreaterThan(0);
  });

  it('should log export', () => {
    spyOn(console, 'log');
    component.exportReport();
    expect(console.log).toHaveBeenCalled();
  });
});