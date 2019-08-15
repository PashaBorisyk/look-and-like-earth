import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasonryService {

  private static state = false;
  private static updateSource = new BehaviorSubject(MasonryService.state);
  static currentUpdate = MasonryService.updateSource.asObservable();

  constructor() { }

  static reload() {
    MasonryService.state = MasonryService.state === false;
    MasonryService.updateSource.next(MasonryService.state);
  }
}
