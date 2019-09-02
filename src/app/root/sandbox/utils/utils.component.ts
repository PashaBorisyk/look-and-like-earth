import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {TooltipPosition} from '@angular/material';
import {LookItemService} from '../../../service/look-item.service';

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

  constructor(private lookItemService: LookItemService) { }

  ngOnInit() {
  }

  isActive() {
    return this.menu;
  }

  doActivate() {
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
}
