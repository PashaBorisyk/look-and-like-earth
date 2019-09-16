import {Component, HostListener, Input, OnInit} from '@angular/core';
import { ClothesItem } from '../../../../class/clothesItem';
import {CurrencyService} from '../../../../service/currency.service';
import {Rate} from "../../../../class/rate";

@Component({
  selector: 'app-clothes-item',
  templateUrl: './clothes-item.component.html',
  styleUrls: ['./clothes-item.component.css']
})
export class ClothesItemComponent implements OnInit {

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

  allowDrop(event) {
    event.preventDefault();
  }

  beginDraggable(event) {
    const json = JSON.stringify(this.clothesItem);
    event.dataTransfer.setData('json', json);
  }

  shopIcon() {
    switch (this.clothesItem.shopName) {
      case 'zara' : {
        return 'assets/img/zara.png';
      }
      case 'h&m' : {
        return 'assets/img/hm.png';
      }
      default : {
        return 'assets/img/fred.png';
      }
    }
  }
}
