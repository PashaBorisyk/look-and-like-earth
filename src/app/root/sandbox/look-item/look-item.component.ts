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
  public styleOfImage: object = {};
  image = "https://static.pullandbear.net/2/photos/2019/I/0/1/p/5689/303/427/5689303427_1_1_3.jpg?t=1563380325482";

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

    this.styleOfImage = {
      height: `${event.rectangle.height}`,
      width: `${event.rectangle.width}`
    };
  }
}
