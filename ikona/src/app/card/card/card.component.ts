import {
  Component,
  OnInit,
  HostListener
} from '@angular/core';
import {
  TranslateService
} from 'src/app/Services/translate/translate.service';
import {
  ActivatedRoute,
  Router
} from '@angular/router'
import {
  CardService
} from 'src/app/Services/card/card.service';
import {
  StorageService
} from 'src/app/Services/storage/storage.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  errorInKey = false;
  noUrl = false;
  bcValue;
  public text;
  showConntent = false;
  website;
  barCodeFormats = [];
  languges = [];
  deferredPrompt: any;
  @HostListener('window:beforeinstallprompt', ['$event'])
  onbeforeinstallprompt(e) {
    console.log(e);
    e.preventDefault();
    this.cardService.installData = e;
    this.deferredPrompt = e;
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    public translate: TranslateService,
    private cardService: CardService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params.invitationKey) {
      this.setCardDetails();
    } else if (this.activatedRoute.snapshot.params.id || this.activatedRoute.snapshot.params.id === 0) {
      const data = this.cardService.alldata;
      const card = this.cardService.cardData;
      this.deferredPrompt = this.cardService.installData;
      if (data && card) {
        this.getCardData(data);
        this.getcard(card);
      } else {
        this.router.navigate(['/']);
      }
    }
    if (!this.activatedRoute.snapshot.params.invitationKey && !this.activatedRoute.snapshot.params.id) {
      this.noUrl = true;
    }
  }

  getCardData(res) {
    if (res.result && res.result.market && res.result.market.barcodeFormats) {
      this.translate.useLang(res.result.market.languages[0]);
      this.languges = res.result.market.languages.map(lang => {
        switch (lang) {
          case 'en-US':
            return {
              code: lang, name: 'English'
            }
            case 'es-MX':
              return {
                code: lang, name: 'Spanish'
              }
              case 'fil':
                return {
                  code: lang, name: 'Filipino'
                }
                case 'ms-MY':
                  return {
                    code: lang, name: 'Malay'
                  }
                  case 'th':
                    return {
                      code: lang, name: 'Thai'
                    }
        }
      });
      this.website = res.result.market.website;
      this.barCodeFormats = [res['result']['market'].barcodeFormats[0]];
    } else {
      this.barCodeFormats = ['PDF417']
    }
    this.showConntent = true;
  }

  getcard(res) {
    this.showConntent = true;
    this.bcValue = res.result.cardNumber;
    this.text = res.result.cardNumber;
  }

  setCardDetails() {
    this.cardService.getCardDetails().subscribe(res => {
      this.cardService.alldata = res;
      this.shareDeviceDetails();
    });
  }

  shareDeviceDetails() {
    const data = {
      InvitationKey: this.activatedRoute.snapshot.params.invitationKey,
      DeviceInfo: JSON.stringify({
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        appVersion: navigator.appVersion
      })
    };
    this.cardService.sendDeviceInfo(data).subscribe(res => {
      this.cardService.cardData = res;
      this.router.navigateByUrl(`${res.result.id}`)
    }, err => {
      this.errorInKey = true;
    });
  }

  addToHomeScreen() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPositions.bind(this), this.positionError);
    } else {
      console.log('Geolocation is not supported by this device')
    }
  }

  installIfPermitted() {
    this.deferredPrompt.prompt();
    this.deferredPrompt.userChoice
      .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
          this.storageService.setData('installed', 1);
        } else {
          this.storageService.setData('installed', 0);
          console.log('User dismissed the A2HS prompt');
        }
        this.deferredPrompt = null;
      });
  }

  positionError() {
    alert('Allow device location to continue')
    console.log('Geolocation is not enabled. Please enable to use this feature')
  }

  showPositions(that) {
    // console.log(this.deferredPrompt, this.cardService.installData);
    
    // this.deferredPrompt.prompt();
    // this.deferredPrompt.userChoice
    //   .then((choiceResult) => {
    //     if (choiceResult.outcome === 'accepted') {
    //       console.log('User accepted the A2HS prompt');
    //       this.storageService.setData('installed', 1);
    //     } else {
    //       this.storageService.setData('installed', 0);
    //       console.log('User dismissed the A2HS prompt');
    //     }
    //     this.deferredPrompt = null;
    //   });
    // this.installIfPermitted;
    console.log('posiiton accepted', that)
  }

}
