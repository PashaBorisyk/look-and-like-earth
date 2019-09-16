import { Injectable } from '@angular/core';
import {ClothesItem} from '../class/clothesItem';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LookItemService {

  private dropSource = new BehaviorSubject(false);
  currentDrop = this.dropSource.asObservable();

  private removeClothes = new BehaviorSubject(null);
  currentRemove = this.removeClothes.asObservable();

  private downloadImage = new BehaviorSubject(false);
  currentDownload = this.downloadImage.asObservable();

  constructor() { }

  isConsist(value, clothesItems: ClothesItem[]): boolean {
    let result = false;
    clothesItems.forEach(function(item) {
      if (item.image === value) {
        result = true;
      }
    });
    return result;
  }

  dropAll() {
    this.dropSource.next(true);
  }

  removeItem(value) {
    this.removeClothes.next(value);
  }

  downloadLook() {
    this.downloadImage.next(true);
  }
}
