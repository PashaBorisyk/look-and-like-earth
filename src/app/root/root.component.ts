import {Component, HostListener, OnInit} from '@angular/core';
import {ClothesItemService} from "../service/clothesItem.service";
import {ClothesItem} from '../class/clothesItem';
import {MasonryService} from '../service/masonry.service';

@Component({
  selector: 'app-main',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent implements OnInit {

  clothesItems: ClothesItem[];
  updateMasonry = false;
  areas = [
    {size: 30, order: 1},
    {size: 70, order: 2},
  ];

  constructor(private clothesItemService: ClothesItemService,
              private masonryService: MasonryService) { }

  ngOnInit() {
    this.clothesItemService.current.subscribe(clothesItems => this.clothesItems = clothesItems);

    // !!!!!!!!!!!!! WHEN SERVER WILL RUN , NEED CHECK WHICH DATA REQUIRED

    this.clothesItemService.recommendations().subscribe(data => {
      this.clothesItems = data;
    });
  }

  @HostListener('scroll', ['$event'])
  scrollHandler($event) {
    if (($event.target.offsetHeight + $event.target.scrollTop ) >= $event.target.scrollHeight) {
      const searchValue = localStorage.getItem('searchValue');
      this.clothesItemService.search(searchValue).subscribe(data => {
        this.clothesItemService.changeClotheItems(data);
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
    this.updateMasonry = this.updateMasonry === false;
    this.masonryService.reload(this.updateMasonry);
  }
}
