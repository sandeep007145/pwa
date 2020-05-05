import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnecComponent } from './onec.component';

describe('OnecComponent', () => {
  let component: OnecComponent;
  let fixture: ComponentFixture<OnecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
