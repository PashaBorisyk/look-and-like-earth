import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  toDate: Date;
  fromDate: Date;
  dateRange: Object;

  constructor() { }

  ngOnInit() {
    this.toDate = new Date();
    this.fromDate = new Date();
    this.fromDate.setDate(this.fromDate.getDate() - 7);
    this.dateRange = {'begin': this.fromDate, 'end': this.toDate};
  }
}
