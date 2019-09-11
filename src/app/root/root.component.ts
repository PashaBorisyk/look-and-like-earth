import {ChangeDetectorRef, Component, HostListener, OnInit, ViewChild} from '@angular/core';
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
  maxSize;
  windowWidth;
  areas;
  menuActive = 'inactived';
  resizeImageSrc;


  constructor(private clothesItemService: ClothesItemService,
              private splitService: SplitService,
              private eventService: EventService,
              private ref: ChangeDetectorRef) {
    ref.detach();
    setInterval(() => {
      const width = this.windowWidth;
      if (width != null && width !== window.innerWidth) {
        this.calculateSplitAreaSize();
      }
      MasonryService.reload();
      this.ref.detectChanges();
    }, 100);
    setTimeout(() => {
      const costSumPosition: number =  this.areas[1].size;
      this.eventService.changeCostSumPosition(costSumPosition);
    }, 105);
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

    this.splitComponent.dragProgress$.subscribe(value => {
      // @ts-ignore
      const costSumPosition: number =  value.sizes[1];
      this.eventService.changeCostSumPosition(costSumPosition);
    });
    this.eventService.resizeEvent.subscribe(src => {
      this.resizeImageSrc = src;
    });
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

    this.resizeImageSrc = null;
    const target = event.target;
    this.eventService.onClick(target.id);

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

  @HostListener('mousemove', ['$event'])
  mouseMove(event) {
    if (this.resizeImageSrc) {
      const url = this.resizeImageSrc.split('_')[1];
      const mainUrl = "main_" + url;
      const element = document.getElementById(url);
      if (element) {
        const transform = element.style.transform;
        const regex = /translate3d\(\s?(?<x>[-]?\d*)px,\s?(?<y>[-]?\d*)px,\s?(?<z>[-]?\d*)px\)/;
        const value = regex.exec(transform);
        //console.log(value);
        const x =  parseInt(value[1]) + element.offsetLeft + 320;
        const y = parseInt(value[2]) + element.offsetTop;
        //console.log(x, y);
        const value = {
          url: url,
          width: '250px',
          height: '270px'
        };
        this.eventService.setSize(value);
      }
    }
  }
}
