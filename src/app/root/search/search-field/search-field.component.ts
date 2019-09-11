import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ClothesItemService} from '../../../service/clothesItem.service';
import {ClothesItem} from '../../../class/clothesItem';
import {FormControl, Validators} from '@angular/forms';
import {SearchMatcherError} from './error-matcher/search-matcher.error';
import {SplitService} from '../../../service/split.service';
import {el} from '@angular/platform-browser/testing/src/browser_util';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.css']
})
export class SearchFieldComponent implements OnInit {

  MIN_LENGTH = 3;
  MAX_LENGTH = 50;
  splitState;

  @ViewChild('searchValue') searchValue: ElementRef;
  clothesItems: ClothesItem[];

  searchFormControl = new FormControl('', [
    Validators.minLength(this.MIN_LENGTH),
    Validators.maxLength(this.MAX_LENGTH)
  ]);

  matcher = new SearchMatcherError();

  constructor(private clothesItemService: ClothesItemService,
              private ref: ChangeDetectorRef,
              private splitService: SplitService) {
    ref.detach();
    setInterval(() => {
      const calendar = document.getElementById('calendar');
      const icons = document.getElementById('icons');
      if (calendar) {
        const calendarRect = calendar.getBoundingClientRect();
        const calendarWidth = calendarRect.width + calendarRect.left + 10;
        if (calendarWidth > window.innerWidth) {
          this.splitState = true;
        }
      } else if (icons) {
        const width = icons.offsetWidth;
        if (width > 500) {
          this.splitState = false;
        }
      }
      this.ref.detectChanges();
    }, 100);
  }

  ngOnInit() {
    this.splitService.currentChangeIconPosition.subscribe(value => {
      this.splitState = value;
    });
  }

  doSearch() {
    const value = this.searchValue.nativeElement.value;
    const length = value.length;

    if (!this.isValidateLength(length)) {
      return;
    }

    this.clothesItemService.search(value)
      .subscribe( data => {
        this.clothesItems = data;
        this.clothesItemService.searchAfterInput(this.clothesItems);
      });

    localStorage.setItem('searchValue', value);
  }

  onKeydown(event) {
    if (event.key === 'Enter' ) {
      this.doSearch();
    }
  }

  private isValidateLength(length: number) {
    return this.MIN_LENGTH <= length && this.MAX_LENGTH >= length;
  }
}
