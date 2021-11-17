import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { CinemaModel } from '@models/cinema.model';

import { CinemaService } from '@service/cinema.service';
import { HallService } from '@service/hall.service';
import { SnackBarService } from '@service/snack-bar.service';
import { Nullable } from '@tools/utilityTypes';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.less']
})
export class CinemaComponent implements OnInit {
  cities$!: Observable<string[]>;

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

  private readonly searchTerms = new Subject<string>();

  constructor(
    private readonly cinemaService: CinemaService,
    private readonly hallService: HallService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly snackBarService: SnackBarService,
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
    this.cities$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.cinemaService.getCitiesByTerm(term))
    );
  }

  public search(term: string): void {
    this.searchTerms.next(term);
  }

  public onFileChanged(event: Event): void {
    if (this.cinema?.id === 0) {
      this.snackBarService.showMessage('Please, add cinema first');
      return;
    }

    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;

    const reader = new FileReader();
    reader.onload = (e: any): void => {
      this.cinema!.image = e.target.result.split('base64,')[1];
      this.cinemaService.editCinema(this.cinema!)
        .subscribe(
          () => {
            this.snackBarService.showMessage('Image for cinema added successful!');
          }
        );
    };
    reader.readAsDataURL(files[0]);
  }

  public navigateToHall(idCinema: number, idHall?: number): void {
    if (idHall) {
      void this.router.navigate([`/cinema/${idCinema}/hall/${idHall}`]);
    } else {
      void this.router.navigate([`/cinema/${idCinema}/hall`]);
    }
  }

  public navigateToCinema(id?: number): void {
    if (id) {
      void this.router.navigate(['/cinema/', id]);
    } else {
      void this.router.navigate(['/cinema'])
        .then(
          () => {
            this.cinema = {
              id: 0,
              name: '',
              city: '',
              address: ''
            };
          }
        );
    }
  }

  public deleteHall(idCinema: number, idHall: number, hallName: string): void {
    this.hallService.deleteHall(idCinema, idHall)
      .subscribe(
        () => {
          this.fetchCinemaList();
          this.snackBarService.showMessage(`${hallName} hall deleted successful!`);
        }
      );
  }

  public onApplyClick(): void {
    const newCinema: CinemaModel = {
      name: this.cinemaForm.get('name')?.value as string,
      city: this.cinemaForm.get('city')?.value as string,
      address: this.cinemaForm.get('address')?.value as string
    };
    if (this.currentId) {
      this.cinemaService.editCinema(Object.assign(this.cinema, newCinema))
        .subscribe(
          () => {
            this.fetchCinemaList();
            this.snackBarService.showMessage(`Cinema ${newCinema.name} edited successful!`);
          }
        );
    } else {
      this.cinemaService.addCinema(newCinema)
        .subscribe(
          (id: number) => {
            this.snackBarService.showMessage(`Cinema ${newCinema.name} added successful!`);
            this.navigateToCinema(id);
            this.fetchCinemaList();
          }
        );
    }
  }

  public onDeleteCinemaClick(id?: number, name?: string): void {
    if (id) {
      this.cinemaService.deleteCinema(id)
        .subscribe(
          () => {
            if (id === this.currentId) {
              void this.router.navigate(['cinema']);
            }
            this.snackBarService.showMessage(`Cinema ${name ?? ''} deleted successful!`);
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
