import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-location-detection',
  templateUrl: './location-detection.component.html',
  styleUrls: ['./location-detection.component.css']
})
export class LocationDetectionComponent implements OnInit {

  public lat;
  public lng;

  public ngOnInit(): void {
    // this.getLocation();
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: Position) => {
        if (position) {
          console.log("Latitude: " + position.coords.latitude +
            "Longitude: " + position.coords.longitude);
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          console.log(this.lat);
          console.log(this.lng);
        }
      },
        (error: PositionError) => console.log(error));
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
}
