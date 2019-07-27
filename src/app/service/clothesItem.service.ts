import { Injectable } from '@angular/core';
import { ClothesItem } from '../class/clothesItem';
import { HttpClient } from '@angular/common/http';


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

  constructor(private http: HttpClient) { }

  getClothesItem() {
    return this.clothesItem;
  }

  search(value: string) {
    return this.http
      .get('http://40.69.223.31:9000/search/?query=jeans&top=1');
    //.get("http://www.mocky.io/v2/5d3b464b3000005600a2a068");

  }
}
