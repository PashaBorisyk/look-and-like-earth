import {Component, HostListener, Input, OnInit} from '@angular/core';
import { ClothesItem } from "../../../class/clothesItem";

@Component({
  selector: 'app-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.css']
})
export class ResultsListComponent implements OnInit {

  @Input() clothesItems: ClothesItem[];

  constructor() { }

  ngOnInit() {
  }

  @HostListener('window:scroll', ['$event'])
  scrollHandler() {
    console.log((window.innerHeight + window.scrollY) <= document.body.offsetWidth);
    console.log('window.innerHeight :' + window.pageYOffset);
    console.log('window.scrollY :' + window.scrollY);
    console.log('document.body.offsetHeight :' );
    console.log(window.pageYOffset || document.documentElement.scrollTop);

    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
      console.log(window.scrollY);
    }
  }

}
