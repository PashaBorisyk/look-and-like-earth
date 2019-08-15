import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SplitService {

  private changeSize = new BehaviorSubject(null);
  currentChange = this.changeSize.asObservable();

  private changeIconPosition = new BehaviorSubject(false);
  currentChangeIconPosition = this.changeIconPosition.asObservable();

  constructor() { }

  editSplitSize(sandboxArea: number, searchArea: number) {
    this.changeSize.next([sandboxArea, searchArea]);
  }

  iconPosition(value: boolean) {
    this.changeIconPosition.next(value);
  }
}
