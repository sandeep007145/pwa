import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  langDictionary: any;
  selectedLanguage: any;
  constructor(
    private readonly apiService: HttpService
  ) { }

  useLang(val) {
    if (this.selectedLanguage !== val) {
      this.apiService.get(`./assets/i18n/${val}.json`).subscribe(res => {
        this.selectedLanguage = val;
        this.langDictionary = (res);
      });
    }
  }

  getLang(value) {
    return this.langDictionary && this.langDictionary[value] || value;
  }
}
