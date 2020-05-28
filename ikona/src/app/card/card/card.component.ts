import { Component, OnInit, HostListener } from '@angular/core';
import { TranslateService } from 'src/app/Services/translate/translate.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  bcValue = 12345678901231;
  public text = "HRVHUB30\nHRK\n" +
  "000000000012355\n"+
  "PETAR KORETIĆ\n"+
  "PREVOJ DD\n"+
  "10000 Zagreb\n"+
  "pkoretic J.D.O.O\n"+
  "PREVOJ DD\n"+
  "10000 ZAGREB\n"+
  "HR5041240000000000\n"+
  "HR01\n"+
  "7336-68949637625-00001\n"+
  "COST\n"+
  "Uplata za 1. mjesec\n";;
  showButton = false;
    deferredPrompt: any;
    @HostListener('window:beforeinstallprompt', ['$event'])
    onbeforeinstallprompt(e) {
      console.log(e);
      e.preventDefault();
      this.deferredPrompt = e;
      this.showButton = true;
    }
    
    constructor(
      private activatedRoute: ActivatedRoute, 
      public translate: TranslateService
      ) { }
  
    ngOnInit(): void {
      if(this.activatedRoute.snapshot.params.id) {
        this.bcValue = this.activatedRoute.snapshot.params.id;
      }
    }
  
    addToHomeScreen() {
      // if(this.deferredPrompt) {
        this.deferredPrompt.prompt();
        this.deferredPrompt.userChoice
        .then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            this.showButton = false;
              console.log('User accepted the A2HS prompt');
            } else {
              console.log('User dismissed the A2HS prompt');
            }
            this.deferredPrompt = null;
          });
      // }
    }
   
  }