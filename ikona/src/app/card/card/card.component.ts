import {
  Component,
  OnInit,
  HostListener
} from '@angular/core';
import {
  TranslateService
} from 'src/app/Services/translate/translate.service';
import {
  ActivatedRoute, Router
} from '@angular/router'
import { CardService } from 'src/app/Services/card/card.service';
import { StorageService } from 'src/app/Services/storage/storage.service';

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
    this.getCardDetails();
    if (this.activatedRoute.snapshot.params.invitationKey) {
      this.shareDeviceDetails();
    } else if(this.activatedRoute.snapshot.params.id || this.activatedRoute.snapshot.params.id === 0){
      // const data = JSON.parse(this.storageService.getData('card'));
      // if(data.card) {
      //   this.bcValue = data.card;
      //   this.text = data.card;
    //   } else {
    //     this.noUrl = true;
    //   }
    // } else {
    //   this.noUrl = true;
    }
    if(!this.activatedRoute.snapshot.params.invitationKey && !this.activatedRoute.snapshot.params.id) {
      this.noUrl = true;
    }
  }

  getCardDetails() {
    this.cardService.getCardDetails().subscribe(res => {
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
      this.showConntent = true;
      this.bcValue = res.result.cardNumber;
      this.text = res.result.cardNumber;
      // this.storageService.setData('card', JSON.stringify({id: res.result.id, card: res.result.cardNumber}))
      // this.router.navigateByUrl(`${res.result.id}`)
    }, err => {
      this.errorInKey = true;
    });
  }

  addToHomeScreen() {
    // if(this.deferredPrompt) {
    this.deferredPrompt.prompt();
    this.deferredPrompt.userChoice
      .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        this.deferredPrompt = null;
      });
    // }
  }

}
