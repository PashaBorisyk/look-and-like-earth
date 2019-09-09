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
        };
        this.showIcon = false;
      } else {
        this.styleOfLook = {
          border: '1px dashed black',
          borderRadius: '15px',
        };
        this.showIcon = true;
      }
    });
  }

  deleteLookItem() {
    this.lookItemService.removeItem(this.lookItem);
  }
}
