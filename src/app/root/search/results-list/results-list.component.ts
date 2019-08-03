import {Component, OnInit} from '@angular/core';
import { ClothesItem } from "../../../class/clothesItem";
import {ClothesItemService} from "../../../service/clothesItem.service";

@Component({
  selector: 'app-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.css']
})
export class ResultsListComponent implements OnInit {

  clothesItems: ClothesItem[];
  constructor(private clothesItemService: ClothesItemService) {}

  ngOnInit() {
    this.clothesItemService.current.subscribe(clothesItems => this.clothesItems = clothesItems);

    this.clothesItemService.recommendations().subscribe(data => {
      this.clothesItems = data;
    });
  }

}
