import {Component, Input, OnInit} from '@angular/core';
import {ClothesItem} from '../../../class/clothesItem';
import {CurrencyService} from '../../../service/currency.service';

@Component({
  selector: 'app-look-item',
  templateUrl: './look-item.component.html',
  styleUrls: ['./look-item.component.css']
})
export class LookItemComponent implements OnInit {

  @Input() clothesItem: ClothesItem;
  description = false;

  constructor(private currencyService: CurrencyService) { }

  ngOnInit() {
    this.currencyService.currentChange.subscribe(value => {
      if (value != null && value.base !== this.clothesItem.price.currency) {
        this.currencyService.calculate(this.clothesItem.price, value);
      }
    });
  }
}
