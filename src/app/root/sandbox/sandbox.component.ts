import {Component, OnInit} from '@angular/core';
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
          const binaryData = [];
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

  download() {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const img = new Image();
    img.src = 'data:image/jpeg;base64,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';
    img.onload = function () {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      context.drawImage(img, 0, 0);
    };
    setTimeout(() => {
      const a = document.createElement('a');
      a.download = 'look.png';
      a.href = canvas.toDataURL("image/jpg");
      a.click();
    }, 100);
  }
}
