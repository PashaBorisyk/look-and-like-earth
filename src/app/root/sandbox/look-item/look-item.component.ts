import {Component, Input, OnInit} from '@angular/core';
import {ClothesItem} from '../../../class/clothesItem';
import {MatSnackBar} from '@angular/material';
import {LookItemService} from '../../../service/look-item.service';
import {PriceService} from '../../../service/price.service';
import {CurrencyService} from '../../../service/currency.service';

@Component({
  selector: 'app-look-item',
  templateUrl: './look-item.component.html',
  styleUrls: ['./look-item.component.css']
})
export class LookItemComponent implements OnInit {

  @Input() clothesItem: ClothesItem;
  description = false;
  increase = false;
  width = '220px';
  height = '280px';
  styleOfLook: object = {};
  styleOfDelete: object = {};
  styleOfResize: object = {};

  constructor(private snackBar: MatSnackBar,
              private priceService: PriceService,
              private currencyService: CurrencyService,
              private lookItemService: LookItemService) { }

  ngOnInit() {
    this.currencyService.currentChange.subscribe(value => {
      if (value != null && value.base !== this.clothesItem.price.currency) {
        this.currencyService.calculate(this.clothesItem.price, value);
      }
    });
  }

  setFocus() {
    this.styleOfLook = {
      border: '1px solid #C0C0C0',
      width: `${this.width}`,
      height: `${this.height}`,
    };
    this.styleOfDelete = {
      display: 'block'
    };
    this.styleOfResize = {
      display: 'block',
    };
  }

  removeFocus() {
    setTimeout(() => {
      this.styleOfLook = {
        border: 'none',
        width: `${this.width}`,
        height: `${this.height}`,
      };
      this.styleOfDelete = {
        display: 'none',
      };
      this.styleOfResize = {
        display: 'none',
      };
    }, 2500);
  }

  removeClothes() {
    this.lookItemService.removeItem(this.clothesItem.image);
    this.priceService.add({
      value: -this.clothesItem.price.value,
      currency: this.clothesItem.price.currency
    });
    this.snackBar.open('Clothes removed', '×', {
      duration: 2000,
    });
  }

  resize() {
    this.increase = this.increase === false;
    if (!this.increase) {
      this.width = '220px';
      this.height = '280px';
    } else {
      this.width = '180px';
      this.height = '210px';
    }
    this.styleOfLook = {
      border: '1px solid #C0C0C0',
      width: `${this.width}`,
      height: `${this.height}`,
    };
  }
}
