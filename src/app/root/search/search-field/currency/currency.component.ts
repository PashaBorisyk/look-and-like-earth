import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../../../../service/currency.service';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit {

  private currency;
  private nowPosition;
  private lastPosition;

  constructor(private currencyService: CurrencyService) {
    this.currency = this.currencyService.getCurrency();
    this.nowPosition = 0;
    this.lastPosition = this.currencyService.getLastPosition();
  }

  ngOnInit() {
  }

  changeCurrency() {
    if (this.nowPosition === this.lastPosition) {
      this.nowPosition = 0;
    }
    this.nowPosition++;
    this.currency = this.currencyService.getCurrencyByPosition(this.nowPosition);
  }
}
