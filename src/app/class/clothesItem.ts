import { Price } from "./price";

export class ClothesItem {
  name: string;
  price: Price;
  color: string;
  material: string;
  date: Date;
  style: string;
  companyIcon: string;
  image: string;

  constructor(name: string, price: Price, color: string, material: string, date: Date, style: string) {
    this.name = name;
    this.price = price;
    this.color = color;
    this.date = date;
    this.style = style;
    this.image = 'https://static.pullandbear.net/2/photos/2019/I/0/1/p/5689/303/427/5689303427_1_1_3.jpg?t=1563380325482';
  }
}
