import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SplitService {

  private changeSize = new BehaviorSubject(null);
  currentChange = this.changeSize.asObservable();

  constructor() { }

  editSplitSize(sandboxArea: number, searchArea: number) {
    this.changeSize.next([sandboxArea, searchArea]);
  }
}
