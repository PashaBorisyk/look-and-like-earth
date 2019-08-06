import {Component, OnInit} from '@angular/core';
import { ClothesItem } from "../../../class/clothesItem";
import {ClothesItemService} from "../../../service/clothesItem.service";
import {NgxMasonryOptions} from 'ngx-masonry';

@Component({
  selector: 'app-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.css']
})
export class ResultsListComponent implements OnInit {

  public masonryOptions: NgxMasonryOptions = {
    transitionDuration: '0.1s',
    resize: true,
    initLayout: true,
    fitWidth: true
  };

  clothesItems: ClothesItem[];
  constructor(private clothesItemService: ClothesItemService) {}

  ngOnInit() {
    this.clothesItemService.current.subscribe(clothesItems => this.clothesItems = clothesItems);

    this.clothesItemService.recommendations().subscribe(data => {
      this.clothesItems = data;
    });
  }

}
