import { Component, OnInit } from '@angular/core';
import { PwaService } from '../pwa/pwa.service';

@Component({
  selector: 'app-onec',
  templateUrl: './onec.component.html',
  styleUrls: ['./onec.component.scss']
})
export class OnecComponent implements OnInit {
  title = 'Pwa App';
  constructor(
    public pwa: PwaService
  ) { }

  ngOnInit(): void {
  }

  installPwa(): void {
    this.pwa.promptEvent.prompt();
  }

}
