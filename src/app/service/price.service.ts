import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Price} from '../class/price';

@Injectable({
  providedIn: 'root'
})
export class PriceService {

  private priceSource = new BehaviorSubject(new Price(0, 'BYN'));
  currentPrice = this.priceSource.asObservable();

  constructor() { }

  add(price: Price) {
    this.priceSource.next(price);
  }
}
