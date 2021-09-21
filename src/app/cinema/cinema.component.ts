import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { CinemaModel } from '@models/cinema.model';

import { CinemaService } from '@service/cinema.service';
import { Nullable } from '@tools/utilityTypes';

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.less']
})
export class CinemaComponent implements OnInit {
  cinemaForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    address: new FormControl(
      '',
      [
        Validators.required,
        Validators.minLength(3)
      ]
    )
  });

  cinema: Nullable<CinemaModel> = null;
  allCinemas: CinemaModel[] = [];
  currentId?: number;

  constructor(
    private readonly cinemaService: CinemaService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {
  }

  public ngOnInit(): void {
    this.activatedRoute.paramMap
      .subscribe(
        (params: ParamMap) => {
          this.currentId = Number(params.get('id'));
          this.fetchCinema();
        }
      );
    this.fetchCinemaList();
  }

  public navigateTo(id?: number): void {
    if (id) {
      void this.router.navigate(['/cinema/', id]);
    } else {
      void this.router.navigate(['/cinema']);
    }
  }

  public onApplyClick(): void {
    const newCinema: CinemaModel = {
      name: this.cinemaForm.get('name')?.value,
      city: this.cinemaForm.get('city')?.value,
      address: this.cinemaForm.get('address')?.value
    };
    if (this.currentId) {
      this.cinemaService.editCinema(Object.assign(this.cinema, newCinema))
        .subscribe(
          () => {
            this.fetchCinemaList();
          }
        );
    } else {
      this.cinemaService.addCinema(newCinema)
        .subscribe(
          (id: number) => {
            this.navigateTo(id);
            this.fetchCinemaList();
          }
        );
    }
  }

  public onDeleteCinemaClick(id?: number): void {
    if (id) {
      this.cinemaService.deleteCinema(id)
        .subscribe(
          () => {
            if (id === this.currentId) {
              void this.router.navigate(['cinema']);
            }
            this.fetchCinemaList();
          }
        );
    }
  }

  private fetchCinema(): void {
    if (this.currentId) {
      this.cinemaService.getCinema(this.currentId)
        .subscribe(
          (cinema: CinemaModel) => {
            this.cinema = cinema;
            this.setCinemaForm(cinema);
          }
        );
    } else {
      this.cinema = null;
      this.setCinemaForm();
    }
  }

  private setCinemaForm(cinema?: CinemaModel): void {
    if (cinema) {
      this.cinemaForm.get('name')?.setValue(cinema.name);
      this.cinemaForm.get('city')?.setValue(cinema.city);
      this.cinemaForm.get('address')?.setValue(cinema.address);
    } else {
      for (const control in this.cinemaForm.controls) {
        this.cinemaForm.get(control)?.setValue('');
      }
    }
  }

  private fetchCinemaList(): void {
    this.cinemaService.getCinemas()
      .subscribe(
        (cinemas: CinemaModel[]) => {
          this.allCinemas = cinemas;
        }
      );
  }
}
