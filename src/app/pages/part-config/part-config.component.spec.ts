import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartConfigComponent } from './part-config.component';

describe('PartConfigComponent', () => {
  let component: PartConfigComponent;
  let fixture: ComponentFixture<PartConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartConfigComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
