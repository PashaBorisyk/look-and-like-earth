import {Component, HostListener, OnInit} from '@angular/core';
import {ResizeEvent} from 'angular-resizable-element';


@Component({
  selector: 'app-look-item',
  templateUrl: './look-item.component.html',
  styleUrls: ['./look-item.component.css']
})
export class LookItemComponent implements OnInit {

  public style: object = {};
  image = "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1533045736-screen-shot-2018-07-25-at-5-15-04-pm-1533045665.jpg";

  constructor() { }

  ngOnInit() {
  }

  validate(event: ResizeEvent): boolean {
    const MIN_DIMENSIONS_PX: number = 50;
    if (
      event.rectangle.width &&
      event.rectangle.height &&
      (event.rectangle.width < MIN_DIMENSIONS_PX ||
        event.rectangle.height < MIN_DIMENSIONS_PX)
    ) {
      return false;
    }
    return true;
  }


  onResizeEnd(event: ResizeEvent): void {
    console.log('Element was resized', event);
    this.style = {
      position: 'fixed',
      left: `${event.rectangle.left}px`,
      top: `${event.rectangle.top}px`,
      width: `${event.rectangle.width}px`,
      height: `${event.rectangle.height}px`
    };
  }
}
