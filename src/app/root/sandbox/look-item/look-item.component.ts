import { Component, OnInit } from '@angular/core';
import {ResizeEvent} from 'angular-resizable-element';

@Component({
  selector: 'app-look-item',
  templateUrl: './look-item.component.html',
  styleUrls: ['./look-item.component.css']
})
export class LookItemComponent implements OnInit {

  image = "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1533045736-screen-shot-2018-07-25-at-5-15-04-pm-1533045665.jpg";

  constructor() { }

  ngOnInit() {
  }

}
