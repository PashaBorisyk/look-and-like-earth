import { Injectable } from '@angular/core';
import { ClothesItem } from '../class/clothesItem';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ClothesItemService {

  apiRoot = 'http://localhost:9000';
  DEFAULT_LIMIT = 10;

  argument: ClothesItem[];
  private searchClothes = new BehaviorSubject(null);
  currentSearch = this.searchClothes.asObservable();

  private searchClothesAfterScroll = new BehaviorSubject(null);
  currentSearchAfterReload = this.searchClothesAfterScroll.asObservable();

  constructor(private http: HttpClient) { }

  recommendations(): Observable<ClothesItem[]> {
    localStorage.setItem('searchValue', 'jeans');
    return this.search('jeans');
  }

  search(value: string): Observable<ClothesItem[]> {

    if (value == null) {
      return this.recommendations();
    }

    const url = this.apiRoot + '/search/?query=' + value + '&top=' + this.DEFAULT_LIMIT;
    //const url = 'http://www.mocky.io/v2/5d3b464b3000005600a2a068';
    // const url = 'http://www.mocky.io/v2/5d5587f135000074af087e96';

    return this.http.get(url)
      .pipe(map((res: any[]) => {

        var clothesItems = [];

        res.forEach(function (value) {
          const priceValue = Math.ceil(value.data.price.price * 100) / 100;
          const clothesItem = {
            name: value.data.name,
            price: {
              value: priceValue,
              currency: value.data.price.currency
            },
            color: value.data.color,
            material: {
              value: 'хлопок',
              percent: '100%'
            },
            date: value.metaInformation.insertDate,
            style: 'Зауженный',
            companyIcon: '',
            image: value.data.images.noBackgroundImageUrl ,
            article: value.data.article,
            shopName: value.metaInformation.shopName,
            description: value.data.description,
            category: value.data.category,
            sex: value.data.sex,
            sizes: value.data.sizes,
          };
          clothesItems.push(clothesItem);
        });
        return clothesItems;
      }));
  }

  searchAfterInput(object) {
    this.searchClothes.next(object);
  }

  searchAfterScroll(object) {
    this.searchClothesAfterScroll.next(object);
  }
}
