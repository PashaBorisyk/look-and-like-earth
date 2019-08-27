import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  fromDate = new Date();
  toDate = new Date();
  date = new FormControl(new Date());

  constructor() { }

  ngOnInit() {
  }
}
