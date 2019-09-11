import {Component, Input, OnInit} from '@angular/core';
import {CurrencyService} from '../../../service/currency.service';
import {LookItem} from '../../../class/look-item';
import {EventService} from 'src/app/service/event.service';
import {LookItemService} from '../../../service/look-item.service';
import {MatSnackBar} from '@angular/material';


@Component({
  selector: 'app-look-item',
  templateUrl: './look-item.component.html',
  styleUrls: ['./look-item.component.css']
})
export class LookItemComponent implements OnInit {

  @Input() lookItem: LookItem;
  description = false;
  lookStyle: object;
  showIcon = false;
  width = 220;
  height = 280;
  topDesc = 100;
  leftDesc = 300;
  descriptionStyle: object;

  constructor(private currencyService: CurrencyService,
              private lookItemService: LookItemService,
              private snackBar: MatSnackBar,
              private eventService: EventService) { }

  ngOnInit() {
    this.descriptionStyle = {
      left: `${this.leftDesc}px`,
      top: `${this.topDesc}px`,
    };
    this.currencyService.currentChange.subscribe(value => {
      if (value != null && value.base !== this.lookItem.price.currency) {
        this.currencyService.calculate(this.lookItem.price, value);
      }
    });

    this.eventService.focusEvent.subscribe(imageSrc => {
      if (imageSrc == null || imageSrc !== this.lookItem.image ) {
        this.lookStyle = {
          border: 'none',
          width: `${this.width}px`,
          height: `${this.height}px`,
        };
        this.showIcon = false;
      } else {
        this.lookStyle = {
          border: '1px dashed black',
          borderRadius: '15px',
          width: `${this.width}px`,
          height: `${this.height}px`,
        };
        this.showIcon = true;
      }
    });
    this.eventService.editLookSizeEvent.subscribe(value => {
      if (value != null && value.url === this.lookItem.image) {
        this.width = value.width;
        this.height = value.height;
        this.leftDesc = Math.round(this.width) + 100;
        this.descriptionStyle = {
          left: `${this.leftDesc}px`,
          top: `${this.topDesc}px`,
        };
        this.lookStyle = {
          border: '1px dashed black',
          borderRadius: '15px',
          width: `${this.width}px`,
          height: `${this.height}px`,
        };
      }
    });
  }

  setPosition(event) {
    this.lookItem.positionX = event.screenX;
    this.lookItem.positionY = event.screenY;
  }

  deleteLookItem() {
    this.lookItemService.removeItem(this.lookItem);
    this.snackBar.open('Clothes deleted', '×', {
      duration: 2000,
    });
  }
}
