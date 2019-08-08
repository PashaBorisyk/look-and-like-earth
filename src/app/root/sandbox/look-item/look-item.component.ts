import {Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {ResizeEvent} from 'angular-resizable-element';
import {ResizeService} from "../../../service/resize.service";


@Component({
  selector: 'app-look-item',
  templateUrl: './look-item.component.html',
  styleUrls: ['./look-item.component.css']
})
export class LookItemComponent implements OnInit {

  public styleOfLook: object = {};
  @Input() image: string;

  constructor() { }

  ngOnInit() {
  }

  validate(event: ResizeEvent): boolean {
    return !(!ResizeService.isProportionally(event) || !ResizeService.isValidate(event));
  }


  onResizeEnd(event: ResizeEvent): void {

    this.styleOfLook = {
      width: `${event.rectangle.width}px`,
      height: `${event.rectangle.height}px`
    };

    this.focusWithTime();
  }

  focusWithTime() {
    setTimeout(function () {
      document.getElementById('box').focus();
    }, 100);
  }

  eventOn
}
