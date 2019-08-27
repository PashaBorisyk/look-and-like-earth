import {Component, OnInit} from '@angular/core';
import {ClothesItemService} from "../service/clothesItem.service";
import {ClothesItem} from '../class/clothesItem';
import {SplitService} from '../service/split.service';
import {DataService} from '../service/data.service';

@Component({
  selector: 'app-main',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent implements OnInit {

  clothesItems: ClothesItem[];
  areas = [
    {size: 60, order: 1},
    {size: 40, order: 2},
  ];

  constructor(private clothesItemService: ClothesItemService,
              private splitService: SplitService) { }

  ngOnInit() {
    this.clothesItemService.currentSearch.subscribe(clothesItems => this.clothesItems = clothesItems);


    this.clothesItemService.recommendations().subscribe(data => {
      this.clothesItems = data;
    });

    this.splitService.currentChange.subscribe(value => {
      if (value !== null) {
        this.areas[0].size = value[0];
        this.areas[1].size = value[1];
        setTimeout(function() {
          DataService.reloadMasonry();
        }, 800);
      }
    });
  }

  reloadSearch(event) {
    console.log('load');
    if ((event.target.offsetHeight + event.target.scrollTop ) >= event.target.scrollHeight) {
      const searchValue = localStorage.getItem('searchValue');
      console.log(searchValue);
      this.clothesItemService.search(searchValue).subscribe(data => {
        this.clothesItemService.searchAfterScroll(data);
      });
    }
  }

  removeImage() {
    let img = document.getElementById('temp-img');
    if (img !== null) {
      img.remove();
    }
  }

  reloadMasonry() {
    DataService.reloadMasonry();
  }

  checkSearchField(event) {
    if (event.sizes[0] > 70) {
      this.splitService.iconPosition(true);
    } else {
      this.splitService.iconPosition(false);
    }
  }
}
