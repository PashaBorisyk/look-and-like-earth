import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit {

  @Input() currency: string;

  constructor() { }

  ngOnInit() {
  }

}
