import {Component, HostListener, Inject, Input, OnInit} from '@angular/core';
import { ClothesItem } from "../../../class/clothesItem";
import {DOCUMENT} from "@angular/common";
import {ScrollEvent} from "ngx-scroll-event";

@Component({
  selector: 'app-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.css']
})
export class ResultsListComponent implements OnInit {

  @Input() clothesItems: ClothesItem[];

  constructor() {}

  ngOnInit() {
  }

  @HostListener('window:scroll', [])
  scrollHandler() {
    if ((document.body.clientHeight + window.scrollY) >= document.body.scrollHeight) {
      console.log('tiggred');
    }
  }

}
