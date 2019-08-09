import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';



@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.css']
})
export class SandboxComponent implements OnInit {

  images = [
    'https://static.pullandbear.net/2/photos/2019/I/0/1/p/5689/303/427/5689303427_1_1_3.jpg?t=1563380325482'];

  url = null;
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

  allowDrop(ev) {
    ev.preventDefault();
  }

  drop(event) {
    event.preventDefault();
    this.url = event.dataTransfer.getData('text');
    this.images.push(this.url);
  }
}
