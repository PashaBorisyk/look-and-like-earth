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
            material: {
              value: value.data.composition[0].material,
              percent: value.data.composition[0].percent
            },
            date: value.metaInformation.insertDate,
            style: 'Зауженный',
            companyIcon: '',
            image: value.data.price.price === 1599
              ? 'https://cdn.shopify.com/s/files/1/2143/3217/products/500_7a67b0be-fb5c-419e-8cdb-5e7e4a3fba29_grande.png?v=1564066897'
              :'https://cdn.shopify.com/s/files/1/1889/4591/products/custom_printed_white_unisex_next_level_60_40_t_shirt.png?v=1511212877',
            article: value.data.article,
            shopName: value.metaInformation.shopName,
            description: value.data.description,
            category: value.data.category,
            sex: value.data.sex,
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
