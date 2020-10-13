import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule  } from '@angular/common/http';
import { LoginFormComponent } from './login-form/login-form.component';
import { CountryFormComponent } from './country-form/country-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { HotelCardComponent } from './hotel-card/hotel-card.component';
import { MainPageComponent } from './main-page/main-page.component';
import { TourFormComponent } from './tour-form/tour-form.component';
import { TourCardComponent } from './tour-form/tour-card/tour-card.component';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { HomePageComponent } from './home-page/home-page.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ReviewSeeMoreComponent } from './review-see-more/review-see-more.component';
import { FooterComponent } from './footer/footer.component';
import { FilterComponent } from './filter/filter.component';
import { TourSeemoreComponent } from './tour-seemore/tour-seemore.component';
import { HotelSeeMoreComponent } from './hotel-see-more/hotel-see-more.component';
import { FindToursComponent } from './find-tours/find-tours.component';
import { NumTransformPipe } from './pipes/num-transform.pipe';
import { AddReviewComponent } from './add-review/add-review.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { AlertComponent } from './alert/alert.component';
import { ErrorPageComponent } from './error-page/error-page.component';






@NgModule({
  declarations: [
    AppComponent,
    RegistrationFormComponent,
    LoginFormComponent,
    CountryFormComponent,
    HotelCardComponent,
    MainPageComponent,
    TourFormComponent,
    TourCardComponent,
    HomePageComponent,
    ReviewSeeMoreComponent,
    FooterComponent,
    FilterComponent,
    TourSeemoreComponent,
    HotelSeeMoreComponent,
    FindToursComponent,
    NumTransformPipe,
    AddReviewComponent,
    AboutUsComponent,
    AlertComponent,
    ErrorPageComponent
  ],
    imports: [
        BrowserModule,
        MatButtonModule,
        MatMenuModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatCardModule,
        MatToolbarModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule
    ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
