import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  private currency = ['BYN', 'EUR', 'USD'];

  constructor() { }

  getCurrency() {
    return this.currency[0];
  }

  getCurrencyByPosition(position: number) {
    return this.currency[position];
  }

  getLastPosition() {
    length = this.currency.length;
    if (length === 0 || length === 1) {
      return 0;
    } else {
      return length - 1;
    }
  }
}
