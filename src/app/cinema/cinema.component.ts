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
    name: new FormControl('', [
      Validators.required
    ]),
    city: new FormControl('', [
      Validators.required
    ]),
    address: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ])
  });

  cinema: Nullable<CinemaModel> = null;
  allCinemas: CinemaModel[] = [];
  currentId: number = 0;

  constructor(
    private readonly cinemaService: CinemaService,
    private readonly activatedRoute: ActivatedRoute,
    public router: Router
  ) {
  }

  public ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      (params: ParamMap) => {
        this.currentId = Number(params.get('id'));
        this.getCinema();
      }
    );
    this.getCinemaList();
  }

  public navigateTo(id: number): void {
    this.currentId = id;
    void this.router.navigate(['/cinema', id]);
    this.getCinema();
  }

  public onApplyClick(): void {
    const newCinema: CinemaModel = {
      name: this.cinemaForm.get('name')?.value,
      city: this.cinemaForm.get('city')?.value,
      address: this.cinemaForm.get('address')?.value
    };
    if (this.currentId) {
      this.cinemaService.editCinema(Object.assign(this.cinema, newCinema)).subscribe(
        () => {
          this.getCinemaList();
        }
      );
    }
    else {
      this.cinemaService.addCinema(newCinema).subscribe(
        (id: number) => {
          newCinema.id = id;
          this.currentId = id;
          this.allCinemas.push(newCinema);
          this.navigateTo(id);
        }
      );
    }
  }

  public onDeleteCinemaClick(id?: number): void {
    if (id) {
      this.cinemaService.deleteCinema(id).subscribe(
        () => {
          if (id === this.currentId) {
            this.navigateTo(0);
          }
          this.getCinemaList();
        }
      );
    }
  }

  private getCinema(): void {
    if (this.currentId) {
      this.cinemaService.getCinema(this.currentId).subscribe(
        (cinema: CinemaModel) => {
          this.cinema = cinema;
          this.cinemaForm.get('name')?.setValue(cinema.name);
          this.cinemaForm.get('city')?.setValue(cinema.city);
          this.cinemaForm.get('address')?.setValue(cinema.address);
        }
      );
    }
    else {
      this.cinema = null;
      this.cinemaForm.get('name')?.setValue('');
      this.cinemaForm.get('city')?.setValue('');
      this.cinemaForm.get('address')?.setValue('');
    }
  }

  private getCinemaList(): void {
    this.cinemaService.getCinemas().subscribe(
      (cinemas: CinemaModel[]) => {
        this.allCinemas = cinemas;
      }
    );
  }
}
