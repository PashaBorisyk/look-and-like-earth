import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ClothesItem} from '../../class/clothesItem';



@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.css']
})
export class SandboxComponent implements OnInit {

  clothesItems: ClothesItem[];
  public styleOfBoundary: object = {};

  constructor() { }

  ngOnInit() {
    this.clothesItems = [];
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

  getDataFromDraggable(event) {
    event.preventDefault();
    const json = event.dataTransfer.getData('json');
    const clothesItem = JSON.parse(json);
    this.clothesItems.push(clothesItem);
  }
}
