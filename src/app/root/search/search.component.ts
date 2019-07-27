import { Component, OnInit } from '@angular/core';
import {ClothesItemService} from "../../service/clothesItem.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private clothesItemService: ClothesItemService) { }

  ngOnInit() {
  }

}
