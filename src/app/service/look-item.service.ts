import { Injectable } from '@angular/core';
import {ClothesItem} from '../class/clothesItem';

@Injectable({
  providedIn: 'root'
})
export class LookItemService {

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
}
