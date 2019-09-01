import {Component, Input, OnInit} from '@angular/core';
import {ClothesItem} from '../../../class/clothesItem';
import {CurrencyService} from '../../../service/currency.service';
import {EventService} from "../../../service/event.service";

@Component({
  selector: 'app-look-item',
  templateUrl: './look-item.component.html',
  styleUrls: ['./look-item.component.css']
})
export class LookItemComponent implements OnInit {

  @Input() clothesItem: ClothesItem;
  description = false;
  styleOfLook: object = [];

  constructor(private currencyService: CurrencyService,
              private eventService: EventService) { }

  ngOnInit() {
    this.currencyService.currentChange.subscribe(value => {
      if (value != null && value.base !== this.clothesItem.price.currency) {
        this.currencyService.calculate(this.clothesItem.price, value);
      }
    });
    this.eventService.focusEvent.subscribe(value => {
      if (value == null || value !== this.clothesItem.image ) {
        this.styleOfLook = {
          border: 'none',
        };
      } else {
        this.styleOfLook = {
          border: '1px dashed black',
          borderRadius: '15px',
        };
      }
    });
  }
}
