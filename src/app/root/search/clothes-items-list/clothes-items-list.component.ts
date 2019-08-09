import {Component, OnInit} from '@angular/core';
import { ClothesItem } from "../../../class/clothesItem";
import {ClothesItemService} from "../../../service/clothesItem.service";
import {NgxMasonryOptions} from 'ngx-masonry';

@Component({
  selector: 'app-clothes-items-list',
  templateUrl: './clothes-items-list.component.html',
  styleUrls: ['./clothes-items-list.component.css']
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
