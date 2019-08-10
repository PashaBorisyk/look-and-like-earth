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
  sizeSandboxArea = 70;
  sizeSearchArea = 30;
  updateMasonry = false;

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
      console.log('Load new clothes');

      const searchValue = localStorage.getItem('searchValue');
      this.clothesItemService.search(searchValue).subscribe(data => {
        this.clothesItems = this.clothesItems.concat(data);
        this.clothesItemService.changeClotheItems(this.clothesItems);
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
