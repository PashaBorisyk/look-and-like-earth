import { Component, Input, OnInit } from '@angular/core';
import { ClothesItem } from '../../../../class/clothesItem';

@Component({
  selector: 'app-result-item',
  templateUrl: './result-item.component.html',
  styleUrls: ['./result-item.component.css']
})
export class ClothesItemComponent implements OnInit {

  @Input() clothesItem: ClothesItem;
  description: boolean;

  constructor() { }

  ngOnInit() {
  }

  drag(event) {
    console.log('send data');
    event.dataTransfer.setData('text', 'link');
  }

  allowDrop(ev) {
    ev.preventDefault();
  }

}
