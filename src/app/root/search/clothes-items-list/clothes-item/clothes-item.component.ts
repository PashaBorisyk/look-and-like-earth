import {Component, HostListener, Input, OnInit} from '@angular/core';
import { ClothesItem } from '../../../../class/clothesItem';

@Component({
  selector: 'app-clothes-item',
  templateUrl: './clothes-item.component.html',
  styleUrls: ['./clothes-item.component.css']
})
export class ClothesItemComponent implements OnInit {

  @Input() clothesItem: ClothesItem;
  description = false;
  img = null;
  ghostImage = null;

  constructor() { }

  ngOnInit() {
    this.ghostImage = new Image();
    this.ghostImage.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
  }

  allowDrop(event) {
    event.preventDefault();
  }

  changeImagePosition(event: DragEvent) {
    this.img.style.top = `${event.y + 10}px`;
    this.img.style.left = `${event.x + 10}px`;
  }

  removeGhostImage(event) {
    event.dataTransfer.setDragImage(this.ghostImage, 0, 0);
    const json = JSON.stringify(this.clothesItem);
    event.dataTransfer.setData('json', json);

    this.img = document.createElement('img');
    this.img.src = this.clothesItem.image;
    this.img.id = 'temp-img';
    this.img.style.position = 'absolute';
    this.img.style.width = '220px';
    this.img.style.height = '249px';
    document.body.append(this.img);
  }
}
