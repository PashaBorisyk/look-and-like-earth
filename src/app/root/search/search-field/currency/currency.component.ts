import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../../../../service/currency.service';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit {

  choiceCurrency;
  currencies = [];
  styleOfList: object = {};

  constructor(private currencyService: CurrencyService) { }

  ngOnInit() {
    this.currencies = this.currencyService.getCurrencies();
    this.choiceCurrency = this.currencies[0];
  }

  choice(event) {
    let currency = event.target.innerText;
    this.currencies.forEach(item => {
      if (item === currency) {
        this.choiceCurrency = currency;
      }
    });
    this.styleOfList = {
      display: 'none',
    };
    this.currencyService.change(this.choiceCurrency);
  }
}
