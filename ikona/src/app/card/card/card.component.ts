import {
  Component,
  OnInit,
  HostListener
} from '@angular/core';
import {
  TranslateService
} from 'src/app/Services/translate/translate.service';
import {
  ActivatedRoute
} from '@angular/router'
import { CardService } from 'src/app/Services/card/card.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  bcValue = 12345678901231;
  public text = "HRVHUB30\nHRK\n" +
    "000000000012355\n" +
    "PETAR KORETIĆ\n" +
    "PREVOJ DD\n" +
    "10000 Zagreb\n" +
    "pkoretic J.D.O.O\n" +
    "PREVOJ DD\n" +
    "10000 ZAGREB\n" +
    "HR5041240000000000\n" +
    "HR01\n" +
    "7336-68949637625-00001\n" +
    "COST\n" +
    "Uplata za 1. mjesec\n";;
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
    private cardService: CardService
  ) {}

  ngOnInit(): void {
    this.getCardDetails();
    if (this.activatedRoute.snapshot.params.id) {
      this.bcValue = this.activatedRoute.snapshot.params.id;
      this.text = this.activatedRoute.snapshot.params.id;
    }
  }

  getCardDetails() {
    this.cardService.getCardDetails().subscribe(res => {
      this.shareDeviceDetails();
      this.showConntent = true;
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
      InvitationKey: 'BYhM29gQjIWQC5nl',
      DeviceInfo: JSON.stringify({
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        appVersion: navigator.appVersion
      })
    };
    this.cardService.sendDeviceInfo(data).subscribe(res => {
      console.log(res);
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
