import {Component, Input, OnInit} from '@angular/core';
import {CurrencyService} from '../../../service/currency.service';
import {LookItem} from '../../../class/look-item';
import {EventService} from 'src/app/service/event.service';


@Component({
  selector: 'app-look-item',
  templateUrl: './look-item.component.html',
  styleUrls: ['./look-item.component.css']
})
export class LookItemComponent implements OnInit {

  @Input() lookItem: LookItem;
  description = false;
  lookItemStyle: object = [];
  styleOfLook: object = [];

  constructor(private currencyService: CurrencyService,
              private eventService: EventService) { }

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
    this.eventService.focusEvent.subscribe(value => {
      if (value == null || value !== this.lookItem.image ) {
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
