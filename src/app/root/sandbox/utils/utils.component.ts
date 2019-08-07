import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-utils',
  templateUrl: './utils.component.html',
  styleUrls: ['./utils.component.css']
})
export class UtilsComponent implements OnInit {

  menu = false;

  constructor() { }

  ngOnInit() {
  }

  isActive() {
    return this.menu;
  }

  doActivate() {
    this.menu = this.menu === true ? false : true;
  }
}
