import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ClothesItemService } from "../../../service/clothesItem.service";
import { ClothesItem } from "../../../class/clothesItem";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SearchMatcherError} from "./error-matcher/search-matcher.error";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.css']
})
export class SearchFieldComponent implements OnInit {

  MIN_LENGTH = 3;
  MAX_LENGTH = 50;

  @ViewChild('searchValue') searchValue: ElementRef;
  clothesItems: ClothesItem[] = [];

  searchFormControl = new FormControl('', [
    Validators.minLength(this.MIN_LENGTH),
    Validators.maxLength(this.MAX_LENGTH)
  ]);

  matcher = new SearchMatcherError();

  constructor(private clothesItemService: ClothesItemService) {  }

  ngOnInit() {}

  doSearch() {

    const value = this.searchValue.nativeElement.value;
    const length = value.length;

    if (!this.isValidateLength(length)) {
      console.log('Invalid value');
      return;
    }

    this.clothesItemService.search(value)
      .subscribe( data => {
        this.clothesItems = data;
      });

    console.log('length: ' + this.clothesItems.length);
  }

  private isValidateLength(length: number) {
    return this.MIN_LENGTH <= length && this.MAX_LENGTH >= length;
  }

}
