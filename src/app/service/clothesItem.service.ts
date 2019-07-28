import { Injectable } from '@angular/core';
import { ClothesItem } from '../class/clothesItem';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';


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

  apiRoot = 'http://40.69.223.31:9000';
  DEFAULT_LIMIT = 10;

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

  search(value: string): Observable<ClothesItem[]> {
    const url = this.apiRoot + '/search/?query=' + value + '&top=' + this.DEFAULT_LIMIT;

    return this.http.get(url)
      .pipe(map((res: any[]) => {

        var clothesItems = [];

        res.forEach(function (value) {
          const clothesItem = {
            name: value.data.name,
            price: {
              value: value.data.price.price,
              currency: value.data.price.currency
            },
            color: value.data.color,
            material: value.data.composition[0].material,
            date: value.metaInformation.insertDate,
            style: 'Зауженный',
            companyIcon: '',
            image: 'https://avatars.mds.yandex.net/get-marketpic/364498/market_6Jk-hvrjQHvHZHxFqbW2Jg/900x1200'
          };
          clothesItems.push(clothesItem);
        });
        return clothesItems;
      }));
  }

  searchWithLimit(value: string, limit: number) {
    const url = this.apiRoot + '/search/?query=' + value + '&top=' + limit;

    return this.http
      .get(url);
  }
}
