import { Injectable } from '@angular/core';
import {ResizeEvent} from "angular-resizable-element";
import {isUndefined} from "util";

@Injectable({
  providedIn: 'root'
})
export class ResizeService {

  constructor() { }

  isProportionally(resizeEvent: ResizeEvent): boolean {

    console.log('inside');
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
