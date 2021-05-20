import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageCheckComponent } from './storage-check.component';

describe('StorageCheckComponent', () => {
  let component: StorageCheckComponent;
  let fixture: ComponentFixture<StorageCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorageCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorageCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
