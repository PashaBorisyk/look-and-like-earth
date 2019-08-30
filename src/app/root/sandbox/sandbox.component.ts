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
    console.log(event);
    console.log(event.y);
    event.preventDefault();
    const json = event.dataTransfer.getData('json');
    const clothesItem = JSON.parse(json);

    if (this.lookItemService.isConsist(clothesItem.image, this.lookItems)) {
      this.snackBar.open('These clothes are already there', '×', {
        duration: 2000,
      });
      return;
    }

    const lookItem = new LookItem(clothesItem, event.offsetY, event.offsetX);

    this.lookItems.push(lookItem);
    this.priceService.add(lookItem.price);


    setTimeout(function() {
      const lookItemElement = document.getElementById(lookItem.image);
      lookItemElement.style.position = 'absolute';
      lookItemElement.style.top = `${event.offsetY}px`;
      lookItemElement.style.left = `${event.offsetX}px`;
      console.log('set style');
    }, 1);

    setTimeout(function() {
      const lookItemElement = document.getElementById(lookItem.image);
      lookItemElement.style.position = 'relative';
    }, 100);
  }

  refresh() {
    window.location.reload();
  }


  log(event) {
    console.log(event.source);

    //event.source.element.style.transform(-42, 26, 0); //= 'translate3d(-42px, 26px, 0px)';
  }
}
