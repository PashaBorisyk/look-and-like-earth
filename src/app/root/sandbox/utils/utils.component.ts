import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {TooltipPosition} from '@angular/material';
import {Observable} from 'rxjs';
import {LookItemService} from '../../../service/look-item.service';
import {SplitService} from '../../../service/split.service';

@Component({
  selector: 'app-utils',
  templateUrl: './utils.component.html',
  styleUrls: ['./utils.component.css']
})
export class UtilsComponent implements OnInit {

  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

  menu = false;
  imageSrc = null;

  @Output() imageEvent = new EventEmitter<string>();

  constructor(private lookItemService: LookItemService,
              private splitService: SplitService) { }

  ngOnInit() {
  }

  isActive() {
    return this.menu;
  }

  doActivate(event) {
    let menu = document.getElementById("menu");
    this.menu = this.menu === true ? false : true;
  }

  displayUploadFile() {
    document.getElementById('uploadFile').click();
  }

  upload(event) {
    this.processFile(event).then( () => {
      this.imageEvent.emit(this.imageSrc);
    });
  }

  processFile(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => this.imageSrc = reader.result;
    reader.readAsDataURL(file);

    return new Promise(resolve => {
      setTimeout( () => {
        resolve(event);
        }, 2000);
      });
  }

  removeAll() {
    this.lookItemService.dropAll();
  }

  downloadLook() {
    this.lookItemService.downloadLook();
  }

  hideSearch() {
    this.splitService.editSplitSize(100, 0);
  }

  showSearch() {
    this.splitService.editSplitSize(60, 40);
  }
}
