import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CinemaComponent } from '@app/cinema/cinema.component';
import { HallComponent } from '@app/hall/hall.component';
import { MovieComponent } from '@app/movie/movie.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'cinema', redirectTo: 'cinema/', pathMatch: 'full' },
  { path: 'cinema/:id', component: CinemaComponent },
  { path: 'cinema/:idCinema/hall', redirectTo: 'cinema/:idCinema/hall/', pathMatch: 'full' },
  { path: 'cinema/:idCinema/hall/:idHall', component: HallComponent },
  { path: 'movie', redirectTo: 'movie/', pathMatch: 'full' },
  { path: 'movie/:id', component: MovieComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
