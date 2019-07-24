import { Injectable } from '@angular/core';
import {Thing} from '../class/thing';


@Injectable({
  providedIn: 'root'
})
export class ThingService {

  thing: Thing = {
    name: 'Джинсы',
    price: 60.5,
    currency: 'BYN',
    color: 'Синий',
    material: 'Стрейч',
    date: 'март 2019',
    style: 'Зауженный',
    companyIcon: '',
    image: ''
  };

  constructor() { }

  getThing() {
    return this.thing;
  }
}
