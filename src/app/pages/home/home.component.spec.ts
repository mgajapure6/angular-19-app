// src/app/pages/home/home.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), RouterTestingModule, HomeComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display title and description', () => {
    const title = fixture.nativeElement.querySelector('.hero-title');
    const description = fixture.nativeElement.querySelector('.hero-description');
    expect(title.textContent).toContain('Stock Monitoring System');
    expect(description.textContent).toContain('Efficiently track');
  });

  it('should have navigation cards', () => {
    const cards = fixture.nativeElement.querySelectorAll('.nav-card');
    expect(cards.length).toBe(2);
    expect(cards[0].querySelector('.bi-bar-chart')).toBeTruthy();
    expect(cards[1].querySelector('.bi-truck')).toBeTruthy();
  });

  it('should have support links', () => {
    const links = fixture.nativeElement.querySelectorAll('.support-card');
    expect(links.length).toBe(2);
    expect(links[0].href).toContain('/user-manual');
    expect(links[1].href).toContain('mailto:support@stockmonitor.com');
  });
});