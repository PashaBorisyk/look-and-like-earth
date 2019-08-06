import { Injectable } from '@angular/core';
import {ResizeEvent} from "angular-resizable-element";

@Injectable({
  providedIn: 'root'
})
export class ResizeService {

  static MIN_DIMENSIONS_PX = 50;

  constructor() { }

  static isProportionally(resizeEvent: ResizeEvent): boolean {

    let firstValue: number | boolean;
    let secondValue: number | boolean;

    if (resizeEvent.edges.bottom !== undefined) {
      firstValue = resizeEvent.edges.bottom;
    }

    if (resizeEvent.edges.top !== undefined) {
      if (firstValue !== undefined) {
        secondValue = resizeEvent.edges.top;
      } else  {
        firstValue = resizeEvent.edges.top;
      }
    }

    if (resizeEvent.edges.right !== undefined) {
      if (firstValue !== undefined) {
        secondValue = resizeEvent.edges.right;
      } else  {
        firstValue = resizeEvent.edges.right;
      }
    }

    if (resizeEvent.edges.left !== undefined) {
      if (firstValue !== undefined) {
        secondValue = resizeEvent.edges.left;
      } else  {
        firstValue = resizeEvent.edges.left;
      }
    }

    if (firstValue < 0) {
      firstValue = +firstValue * (-1);
    }

    if (secondValue < 0) {
      secondValue = +secondValue * (-1);
    }

    console.log('First: ' + firstValue + ', second: ' + secondValue);
    console.log(secondValue === firstValue);

    return secondValue === firstValue;
  }

  static isValidate(event: ResizeEvent): boolean {
    return !(event.rectangle.width &&
      event.rectangle.height &&
      (event.rectangle.width < this.MIN_DIMENSIONS_PX || event.rectangle.height < this.MIN_DIMENSIONS_PX));
  }
}
