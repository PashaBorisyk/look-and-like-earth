import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ClothesItem} from '../../class/clothesItem';
import {LookItemService} from '../../service/look-item.service';
import {MatSnackBar} from '@angular/material';
import {PriceService} from '../../service/price.service';
import {Price} from '../../class/price';
import {ResizeEvent} from "angular-resizable-element";



@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.css']
})
export class SandboxComponent implements OnInit {

  clothesItems: ClothesItem[];
  public styleOfBoundary: object = {};

  constructor(private lookItemService: LookItemService,
              private priceService: PriceService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.clothesItems = [];
    this.lookItemService.currentDrop.subscribe(value => {
      if (value) {
        let sum = 0;
        this.clothesItems.forEach(item => {
          sum += item.price.value;
        });
        this.priceService.add(new Price(-sum, 'RUB'));
       this.clothesItems = [];
      }
    });

    this.lookItemService.currentRemove.subscribe(value => {
      const temp:ClothesItem[] = [];
      this.clothesItems.forEach(item => {
        if (item.image !== value) {
          temp.push(item);
        }
      });
      this.clothesItems = temp;
    });

    this.lookItemService.currentDownload.subscribe(value => {
      if (value) {
        this.clothesItems.forEach(item => {
          var binaryData = [];
          binaryData.push(item.image);

          const a = document.createElement('a');
          a.href = window.URL.createObjectURL(new Blob(binaryData, {type: "image/jpeg"}));
          a.download = item.name;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        });
      }
    });
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
    this.priceService.add(clothesItem.price);
  }

  refresh() {
    window.location.reload();
  }
}
