import { Component, OnInit } from '@angular/core';
import { GenderService } from '../../../../service/gender.service';

@Component({
  selector: 'app-gender',
  templateUrl: './gender.component.html',
  styleUrls: ['./gender.component.css']
})
export class GenderComponent implements OnInit {

  selectGender: string;
  genders: string[];

  constructor(private genderService: GenderService) { }


  ngOnInit() {
    this.genders = this.genderService.getGenders();
    this.selectGender = this.genders[0];
  }

  isMale(value) {
    return value === 'male';
  }

  choice(value) {
    this.selectGender = value;
  }
}
