import { Injectable } from '@angular/core';
import { ClothesItem } from '../class/clothesItem';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ClothesItemService {

  apiRoot = 'http://40.69.223.31:9000';
  DEFAULT_LIMIT = 10;

  argument: ClothesItem[];
  source = new BehaviorSubject(this.argument);
  current = this.source.asObservable();

  constructor(private http: HttpClient) { }

  recommendations(): Observable<ClothesItem[]> {
    return this.search('jeans');
  }

  search(value: string): Observable<ClothesItem[]> {

    if (value == null) {
      return this.recommendations();
    }

    //const url = this.apiRoot + '/search/?query=' + value + '&top=' + this.DEFAULT_LIMIT;
    const url = 'http://www.mocky.io/v2/5d3b464b3000005600a2a068';

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
            image: 'https://static.pullandbear.net/2/photos/2019/I/0/1/p/5689/303/427/5689303427_1_1_3.jpg?t=1563380325482'
          };
          clothesItems.push(clothesItem);
        });
        return clothesItems;
      }));
  }

  changeClotheItems(object) {
    this.source.next(object);
  }
}
