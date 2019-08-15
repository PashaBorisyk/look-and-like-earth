import {Component, OnInit} from '@angular/core';
import { ClothesItem } from "../../../class/clothesItem";
import {ClothesItemService} from "../../../service/clothesItem.service";
import {NgxMasonryOptions} from 'ngx-masonry';
import {MasonryService} from '../../../service/masonry.service';

@Component({
  selector: 'app-clothes-items-list',
  templateUrl: './clothes-items-list.component.html',
  styleUrls: ['./clothes-items-list.component.css']
})
export class ResultsListComponent implements OnInit {

  public masonryOptions: NgxMasonryOptions = {
    transitionDuration: '0.8s',
    resize: true,
    initLayout: true,
    fitWidth: true,
    horizontalOrder: true
  };

  updateMasonry;


  clothesItems: ClothesItem[] = [];
  constructor(private clothesItemService: ClothesItemService) { }

  ngOnInit() {
    this.clothesItemService.currentSearch.subscribe(clothesItems =>  {
      if (clothesItems !== null ) {
        this.clothesItems = clothesItems;
      }
    });

    this.clothesItemService.currentSearchAfterReload.subscribe(value => {
      if (value !== null ) {
        value.forEach( item => {
          this.clothesItems.push(item);
        });
      }
    });

    this.clothesItemService.recommendations().subscribe(data => {
      this.clothesItems = data;
    });
    MasonryService.currentUpdate.subscribe(updateMasonry => this.updateMasonry = updateMasonry);
  }
}
