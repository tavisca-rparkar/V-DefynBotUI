import { Component } from '@angular/core';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
  slides = [{
    "restaurantId": 1,
    "restaurantName": "Dominos Pizza",
    "supplierName": "Zomato",
    "locality": "Viman Nagar, Pune",
    "userRatings" : 5,
    "cuisines": "Italian",
    "image": "https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?cs=srgb&dl=beauty-bloom-blue-67636.jpg&fm=jpg"
  },
  {
    "restaurantId": 2,
    "restaurantName": "La Pino's Pizza",
    "supplierName": "Uber Eats",
    "locality": "Viman Nagar, Pune",
    "userRatings" : 4,
    "cuisines": "Italian",
    "image": "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?cs=srgb&dl=beautiful-beauty-blue-414612.jpg&fm=jpg"
  },
  {
    "restaurantId": 1,
    "restaurantName": "Pizza Hut",
    "supplierName": "Zomato",
    "locality": "Viman Nagar, Pune",
    "userRatings" : 1,
    "cuisines": "Italian",
    "image": "https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?cs=srgb&dl=beauty-bloom-blue-67636.jpg&fm=jpg"
  },
  {
    "restaurantId": 2,
    "restaurantName": "Aunty's Pizza",
    "supplierName": "Uber Eats",
    "locality": "Viman Nagar, Pune",
    "userRatings" : 3,
    "cuisines": "Italian",
    "image": "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?cs=srgb&dl=beautiful-beauty-blue-414612.jpg&fm=jpg"
  }];
  activeSlideIndex = 0;
 
  constructor() {
    for (let i = 0; i < 4; i++) {
      this.addSlide();
    }
  }

  addSlide(): void {
  }
 
  removeSlide(index?: number): void {
    const toRemove = index ? index : this.activeSlideIndex;
    this.slides.splice(toRemove, 1);
  }
}