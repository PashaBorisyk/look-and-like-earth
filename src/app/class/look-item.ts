import {ClothesItem} from './clothesItem';

export class LookItem extends ClothesItem {
  positionX: number;
  positionY: number;

  constructor(clothesItem: ClothesItem, x: number, y: number) {
    super(
      clothesItem.name,
      clothesItem.price,
      clothesItem.color,
      clothesItem.material,
      clothesItem.date,
      clothesItem.style,
      clothesItem.image,
      clothesItem.article,
      clothesItem.shopName,
      clothesItem.description,
      clothesItem.category,
      clothesItem.sex,
      clothesItem.sizes);
    this.positionX = x;
    this.positionY = y;
  }
}
