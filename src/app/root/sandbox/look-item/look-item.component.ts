import {Component, Input, OnInit} from '@angular/core';
import {ClothesItem} from '../../../class/clothesItem';

@Component({
  selector: 'app-look-item',
  templateUrl: './look-item.component.html',
  styleUrls: ['./look-item.component.css']
})
export class LookItemComponent implements OnInit {

  @Input() clothesItem: ClothesItem;
  description = false;

  constructor() { }

  ngOnInit() {
  }
}
