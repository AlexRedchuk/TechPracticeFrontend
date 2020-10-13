import { Component, OnInit } from '@angular/core';
import { HotelService } from 'src/app/services/hotel/hotel.service';
import { Hotel } from 'src/app/models/Hotel';
import { CountryService } from 'src/app/services/country/country.service';
import { Country } from 'src/app/models/Country';


@Component({
  selector: 'app-hotel-card',
  templateUrl: './hotel-card.component.html',
  styleUrls: ['./hotel-card.component.scss']
})
export class HotelCardComponent implements OnInit {

  searchInput;
  hotels: Hotel[] = [];
  hotelLimit = 0;
  hotelsToShow: Hotel[];
  country: Country[] = [];

  constructor(private service: HotelService) { }

  ngOnInit(): void {
    this.service.getHotels().subscribe( data => {
      this.hotels = data;
      this.hotelLimit = (this.hotels.length < 10) ? this.hotels.length : 10;
      this.hotelsToShow = this.hotels.slice(0, this.hotelLimit);
    });
  }

  search() {
    this.service.findHotelsByName(this.searchInput).subscribe ( data => {
      this.hotels = data;
      this.hotelLimit = (this.hotels.length < 10) ? this.hotels.length : 10;
      this.hotelsToShow = this.hotels.slice(0, this.hotelLimit);
      console.log(data);
    });
  }

  scrollUp(e) {
    window.scroll(0, 0);
  }

  showMoreHotels() {
    if (this.hotelLimit < this.hotels.length) {
      const addLength = (this.hotels.length - this.hotelLimit) < 5 ? (this.hotels.length - this.hotelLimit) : 5;
      this.hotelLimit += addLength;
      this.hotelsToShow = this.hotels.slice(0, this.hotelLimit);
    }
  }

}
