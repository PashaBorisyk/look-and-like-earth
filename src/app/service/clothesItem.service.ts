import { Injectable } from '@angular/core';
import { ClothesItem } from '../class/clothesItem';


@Injectable({
  providedIn: 'root'
})
export class ClothesItemService {

  clothesItem: ClothesItem = {
    name: 'Джинсы',
    price: {
      value: 60.5,
      currency: 'BYN'
    },
    color: 'Синий',
    material: 'Стрейч',
    date: new Date('12-12-2012'),
    style: 'Зауженный',
    companyIcon: '',
    image: ''
  };

  constructor() { }

  getClothesItem() {
    return this.clothesItem;
  }
}
