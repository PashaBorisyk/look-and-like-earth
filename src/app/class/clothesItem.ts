import { Price } from './price';
import { Material } from './material';

export class ClothesItem {
  name: string;
  price: Price;
  color: string;
  material: Material;
  date: Date;
  style: string;
  image: string;
  article: string;
  shopName: string;
  description: string;
  category: string;
  sex: string;
  sizes: string[];


  constructor(name: string, price: Price, color: string,
              material: Material, date: Date, style: string,
              image: string, article: string, shopName: string,
              description: string, category: string, sex: string, sizes: string[]) {

    this.name = name;
    this.price = price;
    this.color = color;
    this.material = material;
    this.date = date;
    this.style = style;
    this.image = image;
    this.article = article;
    this.shopName = shopName;
    this.description = description;
    this.category = category;
    this.sex = sex;
    this.sizes = sizes;
  }
}
