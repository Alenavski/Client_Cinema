import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CinemaComponent } from '@app/cinema/cinema.component';
import { HallComponent } from '@app/hall/hall.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'cinema/:id', component: CinemaComponent },
  { path: 'cinema/:idCinema/hall/:idHall', component: HallComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
