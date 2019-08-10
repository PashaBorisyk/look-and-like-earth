import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  private currencies = ['BYN', 'EUR', 'USD', 'RUB'];

  constructor() { }

  getCurrencies() {
    return this.currencies;
  }
}
