import { Component, OnInit } from '@angular/core';
import { Tour } from '../models/Tour';
import { TourService } from '../services/tour/tour.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-find-tours',
  templateUrl: './find-tours.component.html',
  styleUrls: ['./find-tours.component.scss']
})
export class FindToursComponent implements OnInit {

  default: string;
  currentCourse: number;
  tourLimit = 0;
  toursToShow: Tour[];
  tours: Tour[];
  constructor(private tourService: TourService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe( (params: Params) => {
      this.default = params.id;
      this.getData(params.id);
    });
    this.tourService.getUSDCourse().subscribe( data => {
      this.currentCourse = data[0].sale;
    });
  }

  getData(id) {
    if (id) {
      this.tourService.getCountries(id).subscribe( data => {
        this.tours = data;
        this.tourLimit = (this.tours.length < 10) ? this.tours.length : 10;
        this.toursToShow = this.tours.slice(0, this.tourLimit);
      });
    }
    else {
      this.tourService.getTours().subscribe( data => {
        this.tours = data;
        this.tourLimit = (this.tours.length < 10) ? this.tours.length : 10;
        this.toursToShow = this.tours.slice(0, this.tourLimit);
      });
    }
  }

  showMoreTours() {
    if (this.tourLimit < this.tours.length) {
      const addLength = (this.tours.length - this.tourLimit) < 5 ? (this.tours.length - this.tourLimit) : 5;
      this.tourLimit += addLength;
      this.toursToShow = this.tours.slice(0, this.tourLimit);
    }
  }
  scrollUp(e) {
    window.scroll(0, 0);
  }
  getFilteredTours(filteredTours: Tour[]) {
    this.tours = filteredTours;
    this.tourLimit = (this.tours.length < 10) ? this.tours.length : 10;
    this.toursToShow = this.tours.slice(0, this.tourLimit);
  }
}
