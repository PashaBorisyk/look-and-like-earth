import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LookItemComponent } from './look-item.component';

describe('LookItemComponent', () => {
  let component: LookItemComponent;
  let fixture: ComponentFixture<LookItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LookItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LookItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
