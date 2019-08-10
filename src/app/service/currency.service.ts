import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  private currencies = ['RUB', 'EUR', 'USD', 'BYN'];

  constructor() { }

  getCurrencies() {
    return this.currencies;
  }
}
