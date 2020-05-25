import { Injectable } from '@angular/core';
export interface Item {
  name: string;
  description: string;
  url: string;
  html: string;
  markdown: string;
}
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }
}
