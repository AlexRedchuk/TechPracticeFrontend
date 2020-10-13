import { Component, OnInit } from '@angular/core';
import { HotelService } from '../services/hotel/hotel.service';
import { ActivatedRoute, Params } from '@angular/router';
import { TourService } from '../services/tour/tour.service';
import { Tour } from '../models/Tour';

@Component({
  selector: 'app-hotel-see-more',
  templateUrl: './hotel-see-more.component.html',
  styleUrls: ['./hotel-see-more.component.scss']
})
export class HotelSeeMoreComponent implements OnInit {

  currentCourse: number;
  tours: Tour;
  constructor(private hotelService: HotelService,
              private route: ActivatedRoute,
              private tourService: TourService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.getData(params.id);
    });
  }

  getData(id) {
    this.tourService.getByHotel(id).subscribe( data => {
      console.log(data);
      this.tours = data;
    });
    this.tourService.getUSDCourse().subscribe( data => {
      this.currentCourse = data[0].sale;
    });
  }

}
