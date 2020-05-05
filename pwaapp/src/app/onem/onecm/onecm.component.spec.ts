import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnecmComponent } from './onecm.component';

describe('OnecmComponent', () => {
  let component: OnecmComponent;
  let fixture: ComponentFixture<OnecmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnecmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnecmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
