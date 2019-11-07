export class Cart {
  menu: Array<Category>;
  category: Array<MenuItem>;

  constructor() {
    this.menu = new Array<Category>();
  }

  AddToCart(menu) {
    menu.forEach(category => {
      this.category = new Array<MenuItem>();
      category.items.forEach(item => {
        this.category.push({
          name: item.name,
          price: item.price,
          quantity: 0
        });
      });
      this.menu.push({
        categoryName: category.categoryName,
        menuItem: this.category
      });
    });
  }

  DecrementCount(category, item) {
    if (this.menu[category].menuItem[item].quantity > 0) {
      this.menu[category].menuItem[item].quantity -= 1;
    }
  }

  IncrementCount(category, item) {
    if (this.menu[category].menuItem[item].quantity < 10) {
      this.menu[category].menuItem[item].quantity += 1;
    }
  }
}

export class MenuItem {
  name: string;
  price: number;
  quantity: number;
}

export class Category {
  categoryName: string;
  menuItem: MenuItem[];
}
