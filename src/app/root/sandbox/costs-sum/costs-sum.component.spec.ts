import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostsSumComponent } from './costs-sum.component';

describe('CostsSumComponent', () => {
  let component: CostsSumComponent;
  let fixture: ComponentFixture<CostsSumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostsSumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostsSumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
