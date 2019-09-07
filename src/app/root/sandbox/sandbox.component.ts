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
    }, 100);
  }

  refresh() {
    window.location.reload();
  }

  download() {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const img = new Image();
    img.src = 'https://i2.wp.com/freepngimages.com/wp-content/uploads/2016/11/floral-dress-transparent-background.png?fit=600%2C600';
    img.onload = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      this.lookItems.forEach(value => {
        context.drawImage(img, value.positionX, value.positionY);
      });
    };
    setTimeout(() => {
      const a = document.createElement('a');
      a.download = 'look.png';
      a.href = canvas.toDataURL('image/jpg');
      a.click();
    }, 100);
  }
}
