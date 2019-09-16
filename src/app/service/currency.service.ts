import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ClothesItem} from '../class/clothesItem';
import {Price} from '../class/price';
import {Rate} from "../class/rate";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  private currencies = ['RUB', 'EUR', 'USD', 'BYN'];
  private currencyChange = new BehaviorSubject(null);
  currentChange = this.currencyChange.asObservable();
  apiRoot = 'https://api.exchangeratesapi.io/latest?';
  apiForByn = 'http://www.nbrb.by/API/ExRates/Rates/';
  selectCurrency = this.currencies[0];

  constructor(private http: HttpClient) { }


  change(currency: string) {
    const symbols = [];
    this.currencies.forEach(item => {
      if (item !== currency) {
        symbols.push(item);
      }
    });
    const requestSymbols = symbols.join(',');
    const url = 'http://localhost:8080/api/v1/currency/?base=' + currency + '&symbols=' + requestSymbols;
    this.http.get(url).subscribe(value => {
      this.currencyChange.next(value);
      this.selectCurrency = currency;
    });
  }

  getCurrencies() {
    return this.currencies;
  }

  calculate(price: Price, value) {
    for (let i = 0; i < value.rates.length; i++) {
      if (value.rates[i].symbol === price.currency) {
        price.value = Math.round(price.value / value.rates[i].value);
      }
    }
    price.currency = value.base;
  }
}
