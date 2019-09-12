import { Component, OnInit } from '@angular/core';
import {Price} from '../../../class/price';
import {PriceService} from '../../../service/price.service';
import {CurrencyService} from '../../../service/currency.service';
import {LookItemService} from '../../../service/look-item.service';

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

  constructor(private priceService: PriceService,
              private lookItemService: LookItemService,
              private currencyService: CurrencyService) {}

  ngOnInit() {
    this.priceService.currentPrice.subscribe(price => this.price.value += price.value);
    this.currencyService.currentChange.subscribe(value => {
      if (value != null && value.base !== this.price.currency) {
        this.currencyService.calculate(this.price, value);
      }
    });
    this.lookItemService.currentRemove.subscribe(value => {
      if (value) {
        this.price.value = this.price.value - value.price.value;
      }
    });
  }

}
