import {Component, Input, OnInit} from '@angular/core';
import {CurrencyService} from '../../../service/currency.service';
import {LookItem} from '../../../class/look-item';
import {EventService} from 'src/app/service/event.service';
import {LookItemService} from '../../../service/look-item.service';


@Component({
  selector: 'app-look-item',
  templateUrl: './look-item.component.html',
  styleUrls: ['./look-item.component.css']
})
export class LookItemComponent implements OnInit {

  @Input() lookItem: LookItem;
  description = false;
  styleOfLook: object = [];
  showIcon = false;
  width = '220px';
  height = '280px';

  constructor(private currencyService: CurrencyService,
              private lookItemService: LookItemService,
              private eventService: EventService) { }

  ngOnInit() {
    this.currencyService.currentChange.subscribe(value => {
      if (value != null && value.base !== this.lookItem.price.currency) {
        this.currencyService.calculate(this.lookItem.price, value);
      }
    });

    this.eventService.focusEvent.subscribe(imageSrc => {
      if (imageSrc == null || imageSrc !== this.lookItem.image ) {
        this.styleOfLook = {
          border: 'none',
          width: `${this.width}`,
          height: `${this.height}`,
        };
        this.showIcon = false;
      } else {
        this.styleOfLook = {
          border: '1px dashed black',
          borderRadius: '15px',
          width: `${this.width}`,
          height: `${this.height}`,
        };
        this.showIcon = true;
      }
    });
    this.eventService.editLookSizeEvent.subscribe(value => {
      if (value != null && value.url === this.lookItem.image) {
        this.width = value.width;
        this.height = value.height;
        this.styleOfLook = {
          border: '1px dashed black',
          borderRadius: '15px',
          width: `${this.width}`,
          height: `${this.height}`,
        };
      }
    });
  }

  setPosition(event) {
    console.log(event);
    this.lookItem.positionX = event.screenX;
    this.lookItem.positionY = event.screenY;
  }

  deleteLookItem() {
    this.lookItemService.removeItem(this.lookItem);
  }
}
