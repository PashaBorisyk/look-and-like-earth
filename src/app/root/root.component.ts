import {Component, OnInit, ViewChild} from '@angular/core';
import {ChangeDetectorRef, HostListener} from '@angular/core';
import {ClothesItemService} from "../service/clothesItem.service";
import {ClothesItem} from '../class/clothesItem';
import {MasonryService} from '../service/masonry.service';
import {SplitService} from '../service/split.service';
import {EventService} from "../service/event.service";
import {SplitComponent} from 'angular-split';

@Component({
  selector: 'app-main',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent implements OnInit {

  @ViewChild(SplitComponent) splitComponent: SplitComponent;
  clothesItems: ClothesItem[];

  updateMasonry = false;
  maxSize;
  windowWidth;
  areas = [
    {size: 60, order: 1},
    {size: 40, order: 2},
  ];
  menuActive = 'inactived';


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
    this.clothesItemService.recommendations().subscribe(data => {
      this.clothesItems = data;
    });

    this.splitComponent.dragProgress$.subscribe(value => {
      if (value.sizes[0] < 60) {
        this.splitService.iconPosition(false);
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
    const img = document.getElementById('temp-img');
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
    const target = event.target;
    this.eventService.onClick(target.currentSrc);

    const element = target.classList[0];

    if (element === 'select-menu') {
      if (this.menuActive === 'active') {
        this.menuActive = 'inactive';
      } else {
        this.menuActive = 'active';
      }
    } else if (this.menuActive === 'inactive' || this.menuActive === 'active') {
      this.menuActive = 'inactive';
    }
    this.eventService.rootClick(this.menuActive);
  }
}
