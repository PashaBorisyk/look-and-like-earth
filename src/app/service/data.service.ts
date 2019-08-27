import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Price} from '../class/price';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  private static stateOfMasonry = false;
  private static masonryReloadItemsSource = new BehaviorSubject(DataService.stateOfMasonry);
  static masonryReloadItemsEvent = DataService.masonryReloadItemsSource;

  private price: Price = new Price(0, 'RUB');
  private costSumCalculateSource = new BehaviorSubject(this.price);
  costSumEvent = this.costSumCalculateSource.asObservable();

  static reloadMasonry() {
    DataService.stateOfMasonry = DataService.stateOfMasonry === false;
    DataService.masonryReloadItemsSource.next(DataService.stateOfMasonry);
  }

  editCostSum(value: Price) {
    this.costSumCalculateSource.next(value);
  }
}
