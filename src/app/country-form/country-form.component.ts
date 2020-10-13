import { Component, OnInit } from '@angular/core';
import {CountryService} from '../services/country/country.service';
import {Country} from '../models/Country';
import { TourService } from '../services/tour/tour.service';


@Component({
  selector: 'app-country-form',
  templateUrl: './country-form.component.html',
  styleUrls: ['./country-form.component.scss']
})
export class CountryFormComponent implements OnInit {

  countries: Country[];

  constructor(private service: CountryService, private tourService: TourService ) { }

  ngOnInit(): void {
    this.getCountries();
  }

  getCountries() {
    this.service.getCountries().subscribe( (countries) => {
      this.countries = countries;
    });
  }
}

