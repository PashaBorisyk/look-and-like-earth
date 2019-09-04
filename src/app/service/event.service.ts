import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private focusMenu = new BehaviorSubject(null);
  menuEvent = this.focusMenu.asObservable();

  private focusResource = new BehaviorSubject(null);
  focusEvent = this.focusResource.asObservable();

  constructor() { }

  onClick(value: string) {
    this.focusResource.next(value);
  }

  rootClick(value: string) {
    this.focusMenu.next(value);
  }
}
