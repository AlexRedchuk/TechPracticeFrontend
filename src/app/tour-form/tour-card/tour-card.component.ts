import { Component, OnInit } from '@angular/core';
import { TourService } from 'src/app/services/tour/tour.service';
import { Tour } from 'src/app/models/Tour';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-tour-card',
  templateUrl: './tour-card.component.html',
  styleUrls: ['./tour-card.component.scss']
})
export class TourCardComponent implements OnInit {
  tours: Tour[] = [];
  currentCourse: number;

  constructor(private service: TourService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.getData(params.id);
    });
    this.service.getUSDCourse().subscribe( data => {
      this.currentCourse = data[0].sale;
    });

  }

  scrollUp(e) {
    window.scroll(0, 0);
  }
  getData(id: any) {
    if (!id) {
      this.service.getHotTours().subscribe( data => {
        this.tours = data;
      });
    } else {
      this.service.getCountries(id).subscribe( data => {
        this.tours = data;
      });
    }
  }

}
