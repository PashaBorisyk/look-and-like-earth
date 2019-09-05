import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SplitService {

  private changeIconPosition = new BehaviorSubject(false);
  currentChangeIconPosition = this.changeIconPosition.asObservable();

  constructor() { }

  iconPosition(value: boolean) {
    this.changeIconPosition.next(value);
  }
}
