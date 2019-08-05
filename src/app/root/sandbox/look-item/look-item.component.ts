import {Component, HostListener, OnInit} from '@angular/core';
import {ResizeEvent} from 'angular-resizable-element';
import {ResizeService} from "../../../service/resize.service";


@Component({
  selector: 'app-look-item',
  templateUrl: './look-item.component.html',
  styleUrls: ['./look-item.component.css']
})
export class LookItemComponent implements OnInit {

  public style: object = {};
  image = "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1533045736-screen-shot-2018-07-25-at-5-15-04-pm-1533045665.jpg";

  constructor(private resizeService: ResizeService) { }

  ngOnInit() {
  }

  validate(event: ResizeEvent): boolean {
    console.log(event.edges.bottom);
    console.log(event.edges.top);
    console.log(event.edges.left);
    console.log(event.edges.right);
    const MIN_DIMENSIONS_PX: number = 50;
    if (
      event.rectangle.width &&
      event.rectangle.height &&
      (event.rectangle.width < MIN_DIMENSIONS_PX ||
        event.rectangle.height < MIN_DIMENSIONS_PX)
    ) {
      return false;
    }

    return !this.custom(event);
  }


  onResizeEnd(event: ResizeEvent): void {
    console.log('Element was resized', event);
    this.style = {
      left: `${event.rectangle.left}px`,
      top: `${event.rectangle.top}px`,
      width: `${event.rectangle.width}px`,
      height: `${event.rectangle.height}px`
    };
  }

  custom(resizeEvent: ResizeEvent):boolean {
    let firstValue: number;
    let secondValue: number;

    if (!resizeEvent.edges.bottom) {
      firstValue = Number(resizeEvent.edges.bottom);
    }

    if (!resizeEvent.edges.top) {
      if (!firstValue) {
        secondValue = Number(resizeEvent.edges.top);
      } else  {
        firstValue = Number(resizeEvent.edges.top);
      }
    }

    if (!resizeEvent.edges.right) {
      if (!firstValue) {
        secondValue = Number(resizeEvent.edges.right);
      } else  {
        firstValue = Number(resizeEvent.edges.right);
      }
    }

    if (!resizeEvent.edges.left) {
      if (!firstValue) {
        secondValue = Number(resizeEvent.edges.left);
      } else  {
        firstValue = Number(resizeEvent.edges.left);
      }
    }

    firstValue = Math.abs(firstValue);
    secondValue = Math.abs(secondValue);

    console.log('First: ' + firstValue + ', second: ' + secondValue);

    return secondValue === firstValue;
  }
}
