import { Component, OnInit } from '@angular/core';
import {Price} from '../../../class/price';
import {PriceService} from '../../../service/price.service';

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

  constructor(private priceService: PriceService) {}

  ngOnInit() {
    this.priceService.currentPrice.subscribe(price => this.price.value += price.value);
  }

}
