import {Component, HostListener, Inject, Input, OnInit} from '@angular/core';
import { ClothesItem } from "../../../class/clothesItem";
import {DOCUMENT} from "@angular/common";
import {ScrollEvent} from "ngx-scroll-event";
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

  @HostListener('window:scroll', [])
  scrollHandler() {
    if ((document.body.clientHeight + window.scrollY) >= document.body.scrollHeight) {
      console.log('tiggred');
    }
  }

}
