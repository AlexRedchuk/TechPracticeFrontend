import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { TourFormComponent } from './tour-form/tour-form.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthGuardService } from './services/authentication/auth.guard.service';
import { HotelCardComponent } from './hotel-card/hotel-card.component';
import { TourSeemoreComponent } from './tour-seemore/tour-seemore.component';
import { HotelSeeMoreComponent } from './hotel-see-more/hotel-see-more.component';
import { FindToursComponent } from './find-tours/find-tours.component';
import { AddReviewComponent } from './add-review/add-review.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { AlertComponent } from './alert/alert.component';
import { ErrorPageComponent } from './error-page/error-page.component';


const routes: Routes = [
  {
    path: 'hotels', component: HotelCardComponent
  },
  {
    path: '', component: MainPageComponent
  },
  {
    path: 'tours', component: TourFormComponent
  },
  {
    path: 'tours/:id', component: TourFormComponent
  },
  {
    path: 'homepage', component: HomePageComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'findTours', component: FindToursComponent
  },
  {
    path: 'seeMore/:id', component: TourSeemoreComponent
  },
  {
    path: 'aboutHotel/:id', component: HotelSeeMoreComponent
  },
  {
    path: 'addReview', component: AddReviewComponent
  },
  {
    path: 'findTours/:id', component: FindToursComponent
  },
  {
    path: 'aboutUs', component: AboutUsComponent
  },
  {
    path: 'error', component: ErrorPageComponent
  },
  {
    path: '**', redirectTo: '/error'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
