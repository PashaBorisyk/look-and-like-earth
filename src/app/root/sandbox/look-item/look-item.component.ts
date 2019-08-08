import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-look-item',
  templateUrl: './look-item.component.html',
  styleUrls: ['./look-item.component.css']
})
export class LookItemComponent implements OnInit {

  @Input() image: string;

  constructor() { }

  ngOnInit() {
  }
}
