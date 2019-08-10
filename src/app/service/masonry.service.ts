import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasonryService {

  private updateSource = new BehaviorSubject(false);
  currentUpdate = this.updateSource.asObservable();

  constructor() { }

  reload(value: boolean) {
    this.updateSource.next(value);
  }
}
