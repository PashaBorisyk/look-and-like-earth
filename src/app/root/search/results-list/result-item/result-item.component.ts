import {Component, HostListener, Input, OnInit} from '@angular/core';
import { ClothesItem } from '../../../../class/clothesItem';

@Component({
  selector: 'app-result-item',
  templateUrl: './result-item.component.html',
  styleUrls: ['./result-item.component.css']
})
export class ClothesItemComponent implements OnInit {

  @Input() clothesItem: ClothesItem;
  description: boolean;
  img = null;

  constructor() { }

  ngOnInit() {
  }

  allowDrop(event) {
    event.preventDefault();
  }

  changeImagePosition(event: DragEvent) {
    this.img.style.top = `${event.y + 10}px`;
    this.img.style.left = `${event.x + 10}px`;
  }

  createImage() {
    this.img = document.createElement('img');
    this.img.src = this.clothesItem.image;
    this.img.id = 'temp-img';
    this.img.style.position = 'absolute';
    this.img.style.width = '220px';
    this.img.style.height = '249px';
    document.body.append(this.img);
  }

}
