import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {ResizeEvent} from 'angular-resizable-element';
import {ResizeService} from "../../../service/resize.service";


@Component({
  selector: 'app-look-item',
  templateUrl: './look-item.component.html',
  styleUrls: ['./look-item.component.css']
})
export class LookItemComponent implements OnInit {

  public styleOfOutLook: object = {};
  public styleOfLook: object = {};
  image = "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1533045736-screen-shot-2018-07-25-at-5-15-04-pm-1533045665.jpg";

  constructor() { }

  ngOnInit() {
  }

  validate(event: ResizeEvent): boolean {
    return !(!ResizeService.isProportionally(event) || !ResizeService.isValidate(event));
  }


  onResizeEnd(event: ResizeEvent): void {
    console.log('Element was resized', event);
    this.styleOfLook = {
      left: `${event.rectangle.left}px`,
      top: `${event.rectangle.top}px`,
      width: `${event.rectangle.width}px`,
      height: `${event.rectangle.height}px`
    };

    this.styleOfOutLook = {
      left: `${event.rectangle.left}px`,
      top: `${event.rectangle.top}px`,
      width: `${event.rectangle.width}px`,
      height: `${event.rectangle.height}px`
    };
  }
}
