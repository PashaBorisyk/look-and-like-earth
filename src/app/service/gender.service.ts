import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenderService {

  private genders = ['male', 'female'];

  constructor() { }

  getGenders() {
    return this.genders;
  }

  static isMale(gender: string) {
    return gender === 'male';
  }

  getMale() {
    return this.genders[0];
  }

  getFemale() {
    return this.genders[1];
  }
}
