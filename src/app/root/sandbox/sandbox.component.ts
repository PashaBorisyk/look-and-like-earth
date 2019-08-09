import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ClothesItem} from '../../class/clothesItem';
import {LookItemService} from '../../service/look-item.service';
import {MatSnackBar} from '@angular/material';



@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.css']
})
export class SandboxComponent implements OnInit {

  clothesItems: ClothesItem[];
  public styleOfBoundary: object = {};

  constructor(private lookItemService: LookItemService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.clothesItems = [];
  }

  setBackground($event) {
    const imageSrc = $event;
    this.styleOfBoundary = {
      background: `url('${imageSrc}')`,
    };
  }

  allowDrop(event) {
    event.preventDefault();
  }

  getDataFromDraggable(event) {
    event.preventDefault();
    const json = event.dataTransfer.getData('json');
    const clothesItem = JSON.parse(json);

    if (this.lookItemService.isConsist(clothesItem.image, this.clothesItems)) {
      this.snackBar.open('These clothes are already there', '×', {
        duration: 2000,
      });
      return;
    }

    this.clothesItems.push(clothesItem);
  }
}
