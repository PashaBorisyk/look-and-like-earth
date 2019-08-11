import {Component, Input, OnInit} from '@angular/core';
import {ClothesItem} from '../../../class/clothesItem';
import {MatSnackBar} from '@angular/material';
import {LookItemService} from '../../../service/look-item.service';
import {PriceService} from '../../../service/price.service';

@Component({
  selector: 'app-look-item',
  templateUrl: './look-item.component.html',
  styleUrls: ['./look-item.component.css']
})
export class LookItemComponent implements OnInit {

  @Input() clothesItem: ClothesItem;
  description = false;
  styleOfLook: object = {};
  styleOfDelete: object = {};

  constructor(private snackBar: MatSnackBar,
              private priceService: PriceService,
              private lookItemService: LookItemService) { }

  ngOnInit() {
  }

  setFocus() {
    console.log('focus');
    this.styleOfLook = {
      border: '1px solid #C0C0C0'
    };
    this.styleOfDelete = {
      display: 'block'
    };
  }

  removeFocus() {
    setTimeout(() => {
      console.log('Remove focus');
      this.styleOfLook = {
        border: 'none'
      };
      this.styleOfDelete = {
        display: 'none',
      };
    }, 1000);
  }

  removeClothes() {
    console.log('remove');
    this.lookItemService.removeItem(this.clothesItem.image);
    this.priceService.add({
      value: -this.clothesItem.price.value,
      currency: this.clothesItem.price.currency
    });
    this.snackBar.open('Clothes removed', '×', {
      duration: 2000,
    });
  }
}
