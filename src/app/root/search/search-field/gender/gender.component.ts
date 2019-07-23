import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gender',
  templateUrl: './gender.component.html',
  styleUrls: ['./gender.component.css']
})
export class GenderComponent implements OnInit {

  gender = 'male';

  constructor() { }

  ngOnInit() {
  }

  changeGender() {
    if (this.isMale()) {
      this.gender = 'female';
    } else {
      this.gender = 'male';
    }
  }

  isMale(): boolean {
    return this.gender === 'male';
  }

}
