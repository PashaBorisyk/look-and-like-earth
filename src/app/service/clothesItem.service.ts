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
    image: 'https://static.pullandbear.net/2/photos/2019/I/0/1/p/5689/303/427/5689303427_1_1_3.jpg?t=1563380325482'
  };

  constructor(private http: HttpClient) { }

  getClothesItem() {
    return this.clothesItem;
  }

  getClothesItems() {
    const items: ClothesItem[] = [];

    for (let i = 0; i < 10; i++) {
      if (i === 1) {
        const temp = {
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
          image: 'https://avatars.mds.yandex.net/get-marketpic/364498/market_6Jk-hvrjQHvHZHxFqbW2Jg/900x1200'
        };
        items.push(temp);
        continue;
      }
      items.push(this.clothesItem);
    }
    return items;
  }

  search(value: string) {
    return this.http
      .get('http://40.69.223.31:9000/search/?query=jeans&top=1');

  }
}
