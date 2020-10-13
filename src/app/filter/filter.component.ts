import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CountryService } from '../services/country/country.service';
import { Country } from '../models/Country';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TourService } from '../services/tour/tour.service';
import { Tour } from '../models/Tour';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Output() filteredTours = new EventEmitter<Tour[]>();
  @Input() default: string;
  countries: Country[];
  filterForm: FormGroup;
  constructor(private countryService: CountryService,
              private tourService: TourService) { }

  ngOnInit(): void {
    this.countryService.getCountries().subscribe(data => {
      this.countries = data;
    });
    this.filterForm = new FormGroup({
      country: new FormControl(''),
      date_min: new FormControl('', [Validators.required]),
      date_max: new FormControl('', [Validators.required]),
      duration: new FormControl('', [Validators.required, Validators.min(2), Validators.max(7)]),
      adults: new FormControl('', [Validators.required, Validators.min(1), Validators.max(4)]),
      children: new FormControl('', [Validators.required, Validators.min(0), Validators.max(4)])
    });
  }

  onSubmit() {
    const dateMin = new Date( this.filterForm.get('date_min').value);
    const dateMax = new Date( this.filterForm.get('date_max').value);
    const obj = {
      country: this.filterForm.get('country').value,
            minDate: dateMin,
            maxDate: dateMax,
            duration: this.filterForm.get('duration').value || undefined,
            adults: this.filterForm.get('adults').value || undefined,
            children: this.filterForm.get('children').value || undefined
          };
    console.log(obj);
    this.tourService.filterTours(obj).subscribe(data => {
        this.filteredTours.emit(data);
      });
  }

}
