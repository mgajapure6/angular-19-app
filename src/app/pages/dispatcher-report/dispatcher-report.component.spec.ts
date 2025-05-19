import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatcherReportComponent } from './dispatcher-report.component';

describe('DispatcherReportComponent', () => {
  let component: DispatcherReportComponent;
  let fixture: ComponentFixture<DispatcherReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DispatcherReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DispatcherReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
