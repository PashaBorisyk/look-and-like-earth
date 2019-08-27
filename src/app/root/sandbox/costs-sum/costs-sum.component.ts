import { Component, OnInit } from '@angular/core';
import {Price} from '../../../class/price';
import {CurrencyService} from '../../../service/currency.service';
import {DataService} from '../../../service/data.service';

@Component({
  selector: 'app-costs-sum',
  templateUrl: './costs-sum.component.html',
  styleUrls: ['./costs-sum.component.css']
})
export class CostsSumComponent implements OnInit {

  price: Price = {
    value: 0,
    currency: 'RUB',
  };

  constructor(private dataService: DataService,
              private currencyService: CurrencyService) {}

  ngOnInit() {
    this.dataService.costSumEvent.subscribe(price => this.price.value += price.value);
    this.currencyService.currentChange.subscribe(value => {
      if (value != null && value.base !== this.price.currency) {
        this.currencyService.calculate(this.price, value);
      }
    });
  }

}
