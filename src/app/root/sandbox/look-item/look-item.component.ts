import {Component, Input, OnInit} from '@angular/core';
import {CurrencyService} from '../../../service/currency.service';
import {LookItem} from '../../../class/look-item';

@Component({
  selector: 'app-look-item',
  templateUrl: './look-item.component.html',
  styleUrls: ['./look-item.component.css']
})
export class LookItemComponent implements OnInit {

  @Input() lookItem: LookItem;
  description = false;
  lookItemStyle: object = [];

  constructor(private currencyService: CurrencyService) { }

  ngOnInit() {
    console.log('create look');
    this.currencyService.currentChange.subscribe(value => {
      if (value != null && value.base !== this.lookItem.price.currency) {
        this.currencyService.calculate(this.lookItem.price, value);
      }
    });
    this.lookItemStyle = {/*
      top: `${this.lookItem.positionX}px`,
      left: `${this.lookItem.positionY}px`,*/
    };
  }
}
