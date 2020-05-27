import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletBasedLandingPageComponent } from './wallet-based-landing-page.component';

describe('WalletBasedLandingPageComponent', () => {
  let component: WalletBasedLandingPageComponent;
  let fixture: ComponentFixture<WalletBasedLandingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletBasedLandingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletBasedLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
