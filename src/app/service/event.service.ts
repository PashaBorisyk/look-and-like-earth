import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private focusMenu = new BehaviorSubject(null);
  menuEvent = this.focusMenu.asObservable();


  private costSumPositionX = new BehaviorSubject(null);
  costSumPositionXEvent = this.costSumPositionX.asObservable();

  private focusResource = new BehaviorSubject(null);
  focusEvent = this.focusResource.asObservable();

  private resizeResource = new BehaviorSubject(null);
  resizeEvent = this.resizeResource;

  private editLookSize = new BehaviorSubject(null);
  editLookSizeEvent = this.editLookSize;

  constructor() { }

  onClick(value: string) {
    const url = value.split('_')[1];
    this.focusResource.next(url);
  }

  rootClick(value: string) {
    this.focusMenu.next(value);
  }

  changeCostSumPosition(x: number) {
    this.costSumPositionX.next(x);
  }

  beginResize(src) {
    this.resizeResource.next(src);
  }

  setSize(value) {
    this.editLookSize.next(value);
  }
}
