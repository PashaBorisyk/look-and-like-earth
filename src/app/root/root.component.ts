import {ChangeDetectorRef, Component, HostListener, OnInit} from '@angular/core';
import {ClothesItemService} from "../service/clothesItem.service";
import {ClothesItem} from '../class/clothesItem';
import {MasonryService} from '../service/masonry.service';
import {SplitService} from '../service/split.service';
import {EventService} from "../service/event.service";

@Component({
  selector: 'app-main',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent implements OnInit {

  clothesItems: ClothesItem[];
  updateMasonry = false;
  areas;
  maxSize;
  windowWidth;

  constructor(private clothesItemService: ClothesItemService,
              private splitService: SplitService,
              private eventService: EventService,
              private ref: ChangeDetectorRef,
              private masonryService: MasonryService) {
    ref.detach();
    setInterval(() => {
      const width = this.windowWidth;
      if (width != null && width !== window.innerWidth) {
        this.calculateSplitAreaSize();
      }
      this.ref.detectChanges();
    }, 100);
  }

  ngOnInit() {
    this.clothesItemService.currentSearch.subscribe(clothesItems => this.clothesItems = clothesItems);

    // !!!!!!!!!!!!! WHEN SERVER WILL RUN , NEED CHECK WHICH DATA REQUIRED

    this.clothesItemService.recommendations().subscribe(data => {
      this.clothesItems = data;
    });

    this.splitService.currentChange.subscribe(value => {
      if (value !== null) {
        this.areas[0].size = value[0];
        this.areas[1].size = value[1];
        setTimeout(function() {
          MasonryService.reload();
        }, 800);
      }
    });

    this.calculateSplitAreaSize();
  }

  reloadSearch(event) {
    if ((event.target.offsetHeight + event.target.scrollTop ) >= event.target.scrollHeight) {
      const searchValue = localStorage.getItem('searchValue');
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
    MasonryService.reload();
  }

  checkSearchField(event) {
    if (event.sizes[0] > 70) {
      this.splitService.iconPosition(true);
    } else {
      this.splitService.iconPosition(false);
    }
  }

  calculateSplitAreaSize() {
    this.windowWidth = window.innerWidth;
    const areaSize = this.windowWidth / 2;
    this.maxSize = this.windowWidth - 150;
    this.areas = [
      {size: areaSize, order: 1},
      {size: areaSize, order: 2},
    ];
  }

  @HostListener('click', ['$event'])
  listenAllClick(event) {
    this.eventService.onClick(event.path[0].currentSrc);
    let menuActive = 'inactive';
    if (event.path[0].classList[0] === 'select-menu') {
      menuActive = 'active';
    }
    this.eventService.rootClick(menuActive);
  }
}
