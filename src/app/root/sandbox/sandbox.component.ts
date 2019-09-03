import {Component, OnInit} from '@angular/core';
import {ClothesItem} from '../../class/clothesItem';
import {LookItemService} from '../../service/look-item.service';
import {MatSnackBar} from '@angular/material';
import {PriceService} from '../../service/price.service';
import {Price} from '../../class/price';
import {LookItem} from '../../class/look-item';



@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.css']
})
export class SandboxComponent implements OnInit {

  lookItems: LookItem[];
  public styleOfBoundary: object = {};
  emptyImage = 'https://upload.wikimedia.org/wikipedia/commons/5/59/Empty.png';

  constructor(private lookItemService: LookItemService,
              private priceService: PriceService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.lookItems = [];
    this.lookItemService.currentDrop.subscribe(value => {
      if (value) {
        let sum = 0;
        this.lookItems.forEach(item => {
          sum += item.price.value;
        });
        this.priceService.add(new Price(-sum, 'RUB'));
        this.lookItems = [];
      }
    });

    this.lookItemService.currentRemove.subscribe(value => {
      const temp: LookItem[] = [];
      this.lookItems.forEach(item => {
        if (item.image !== value) {
          temp.push(item);
        }
      });
      this.lookItems = temp;
    });

    this.lookItemService.currentDownload.subscribe(value => {
      if (value) {
        this.lookItems.forEach(item => {
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

    if (this.lookItemService.isConsist(clothesItem.image, this.lookItems)) {
      this.snackBar.open('These clothes are already there', '×', {
        duration: 2000,
      });
      return;
    }

    const topPosition = event.offsetY;
    const leftPosition = event.offsetX;
    const lookItem = new LookItem(clothesItem, topPosition, leftPosition);
    const image = lookItem.image;

    lookItem.image = this.emptyImage;
    this.lookItems.push(lookItem);
    this.priceService.add(lookItem.price);


    setTimeout(function() {
      const lookItemElement = document.getElementById(lookItem.image);
      lookItemElement.style.position = 'absolute';
      lookItemElement.style.top = `${topPosition}px`;
      lookItemElement.style.left = `${leftPosition}px`;
      lookItem.image = image;
    }, 1);
  }

  refresh() {
    window.location.reload();
  }
}
