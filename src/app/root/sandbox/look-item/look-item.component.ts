import {Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
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
  @Input() image: string;

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
