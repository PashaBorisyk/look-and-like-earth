import { Component, OnInit } from '@angular/core';
import {ClothesItemService} from "../service/clothesItem.service";

@Component({
  selector: 'app-main',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent implements OnInit {

  constructor(private clothesItemService: ClothesItemService) { }

  ngOnInit() {
  }

}
