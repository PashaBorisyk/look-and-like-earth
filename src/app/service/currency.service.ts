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
 

  constructor(private http: HttpClient) { }


  change(currency: string) {
    const symbols = [];
    this.currencies.forEach(item => {
      if (item !== currency) {
        symbols.push(item);
      }
    });
    if (currency === 'BYN') {
      let url;
      const rates: Rate[] = [];
      symbols.forEach(value => {
        url = this.apiForByn + value + '?paramMode=2';
        this.http.get(url).subscribe(item => {
          // @ts-ignore
          const officialRate = item.Cur_OfficialRate;
          rates.push(new Rate(currency, value, officialRate));
          this.currencyChange.next(rates);
        });
      });
    } else {
      const url = this.apiRoot + 'base=' + currency + '&symbols=' + symbols.join(',');
      this.http.get(url).subscribe(value =>  {
        this.currencyChange.next(value);
      });
    }
  }

  getCurrencies() {
    return this.currencies;
  }

  calculate(price: Price, value) {
    switch (price.currency) {
      case 'RUB' : {
        price.value = Math.round(price.value / value.rates.RUB);
        break;
      }
      case 'EUR' : {
        price.value = Math.round(price.value / value.rates.EUR);
        break;
      }
      case 'USD' : {
        price.value = Math.round(price.value / value.rates.USD);
        break;
      }
    }
    price.currency = value.base;
  }
}
