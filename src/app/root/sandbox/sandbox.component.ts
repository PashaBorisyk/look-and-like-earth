import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';



@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.css']
})
export class SandboxComponent implements OnInit {

  images = [
    'https://static.pullandbear.net/2/photos/2019/I/0/1/p/5689/303/427/5689303427_1_1_3.jpg?t=1563380325482',
    'https://cdn.shopify.com/s/files/1/2143/3217/products/500_7a67b0be-fb5c-419e-8cdb-5e7e4a3fba29_grande.png?v=1564066897',
    'http://agarta.prostoprint.com/static/products/full-7eba3083fd07f49c9f009950d607ba79.png'];

  public styleOfBoundary: object = {};

  constructor() { }

  ngOnInit() {
  }

  setBackground($event) {
    const imageSrc = $event;
    this.styleOfBoundary = {
      background: `url('${imageSrc}')`,
    };
  }
}
