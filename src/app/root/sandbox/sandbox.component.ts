import {Component, OnInit} from '@angular/core';
import {LookItemService} from '../../service/look-item.service';
import {MatSnackBar} from '@angular/material';
import {PriceService} from '../../service/price.service';
import {Price} from '../../class/price';
import {EventService} from '../../service/event.service';
import {LookItem} from '../../class/look-item';
import {ImageLook} from '../../class/image-look';


@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.css']
})
export class SandboxComponent implements OnInit {

  public styleOfBoundary: object = {};
  public styleOfPrice: object = {};

  lookItems: LookItem[] = [];
  emptyImage = 'https://upload.wikimedia.org/wikipedia/commons/5/59/Empty.png';
  focusImage = null;

  constructor(private lookItemService: LookItemService,
              private priceService: PriceService,
              private eventService: EventService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.setBoxSizes();
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
       this.download();
      }
    });

    this.eventService.costSumPositionXEvent.subscribe(value => {
     if (value) {
       const width = window.innerWidth;
       const height = window.innerHeight;
       const left =  - value;
       this.styleOfBoundary = {
         left: `${left}px`,
         height: `${height}px`,
         width: `${width}px`,
       };
     }
    });

    this.lookItemService.currentRemove.subscribe(value => {
      if (value) {
        let index = -1;
        this.lookItems.forEach(item => {
          if (item.image === value.image) {
            index = this.lookItems.indexOf(item);
          }
        });
        if (index !== -1) {
          this.lookItems.splice(index, 1);
        }
      }
    });

    this.eventService.focusEvent.subscribe(imageSrc => {
      this.focusImage = imageSrc;
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

    setTimeout(() => {
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
    canvas.width = window.innerWidth + 200;
    canvas.height = window.innerHeight;
    const images = [];
    // @ts-ignore
    this.lookItems.forEach(lookItem => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = 'https://image.shutterstock.com/image-photo/large-beautiful-drops-transparent-rain-260nw-668593321.jpg';

      const element = document.getElementById(lookItem.image);
      const transform = element.style.transform;
      let x;
      let y;
      if (transform) {
        const regex = /translate3d\(\s?(?<x>[-]?\d*)px,\s?(?<y>[-]?\d*)px,\s?(?<z>[-]?\d*)px\)/;
        // @ts-ignore
        const values = regex.exec(transform);
        // tslint:disable-next-line:radix
        x = parseInt(values[1]) + element.offsetLeft + 320;
        // tslint:disable-next-line:radix
        y = parseInt(values[2]) + element.offsetTop;
      } else {
        // @ts-ignore
        x = element.style.left.replace(/\D/g, '');
        // @ts-ignore
        y = element.style.top.replace(/\D/g, '');
      }
      const imageLook: ImageLook = {
        img,
        width: lookItem.width,
        height: lookItem.height,
        x,
        y
      };
      // @ts-ignore
      images.push(imageLook);
    });
    const costImage = new Image();
    costImage.src = '/assets/img/cost.png';
    const costSum = document.getElementById('costSum').innerText;
    console.log(costSum);

    costImage.onload = () => {
      // @ts-ignore
      images.forEach(value => {
        context.drawImage(value.img, value.x, value.y, value.width, value.height);
      });
      context.drawImage(costImage, canvas.width - 180, canvas.height - 27, 24, 24);
      context.font = '26px Georgia';
      context.fillText(costSum, canvas.width - 150, canvas.height - 10);
    };

    setTimeout(() => {
      const a = document.createElement('a');
      a.download = 'look.png';
      a.href = canvas.toDataURL('image/jpg');
      a.click();
    }, 500);
  }

  setBoxSizes() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.styleOfBoundary = {
      height: `${height}px`,
      width: `${width}px`,
    };
  }

  resize(event) {
    this.eventService.beginResize(event.target.id);
  }
}
