import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"]
})
export class MenuComponent implements OnInit {
  data = {
    restaurantName: "Domino's Pizza",
    locality: "Viman Nagar, Pune",
    menu: [
      [
        { name: "name1", price: 100 },
        { name: "name2", price: 200 },
        { name: "name3", price: 300 },
        { name: "name4", price: 400 }
      ],
      [
        { name: "name1", price: 100 },
        { name: "name2", price: 200 },
        { name: "name3", price: 300 },
        { name: "name4", price: 400 }
      ],
      [
        { name: "name1", price: 100 },
        { name: "name2", price: 200 },
        { name: "name3", price: 300 },
        { name: "name4", price: 400 }
      ]
    ]
  };

  constructor() {}

  ngOnInit() {}
}
