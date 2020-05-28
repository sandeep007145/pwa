import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from 'src/app/Services/translate/translate.service';

@Pipe({
  name: 'translate',
  pure: false
})
export class TranslatePipe implements PipeTransform {

  constructor(
    private translate: TranslateService
  ) { }
  transform(value: any, ...args: any[]): any {
    return this.translate.getLang(value);
  }

}