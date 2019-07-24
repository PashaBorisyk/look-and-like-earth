import { Component, OnInit } from '@angular/core';
import { GenderService } from '../../../../service/gender.service';

@Component({
  selector: 'app-gender',
  templateUrl: './gender.component.html',
  styleUrls: ['./gender.component.css']
})
export class GenderComponent implements OnInit {

  gender: string;

  constructor(private genderService: GenderService) {
    this.gender = genderService.getMale();
  }

  ngOnInit() {
  }

  changeGender() {
    if (GenderService.isMale(this.gender)) {
      this.gender = this.genderService.getFemale();
    } else {
      this.gender = this.genderService.getMale();
    }
  }

  isMale() {
    return GenderService.isMale(this.gender);
  }
}
