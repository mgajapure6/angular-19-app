import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactoryConfigComponent } from './factory-config.component';

describe('FactoryConfigComponent', () => {
  let component: FactoryConfigComponent;
  let fixture: ComponentFixture<FactoryConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FactoryConfigComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FactoryConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
