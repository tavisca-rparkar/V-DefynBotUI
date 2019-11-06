export class Cart {
  item: string[];
  price: number[];
  qty: number[];

  constructor() {}

  AddToCart(menu) {
    this.item = new Array(menu.length);
    this.price = new Array(menu.length);
    this.qty = new Array(menu.length);

    for (let index = 0; index < menu.length; index++) {
      this.item[index] = menu[index].name;
      this.price[index] = menu[index].price;
      this.qty[index] = 0;
    }
  }

  DecrementCount(index) {
    if (this.qty[index] > 0) {
      this.qty[index] -= 1;
    }
  }

  IncrementCount(index) {
    if (this.qty[index] < 10) {
      this.qty[index] += 1;
    }
  }
}
