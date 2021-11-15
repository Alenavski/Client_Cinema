import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MovieModel } from '@models/movie.model';
import { MovieService } from '@service/movie.service';
import { SnackBarService } from '@service/snack-bar.service';
import { Nullable } from '@tools/utilityTypes';
import * as moment from 'moment';
import { ShowtimeService } from '@service/showtime.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.less']
})
export class MovieComponent implements OnInit {
  movieForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    minutesLength: new FormControl('', [Validators.required])
  });

  movie: Nullable<MovieModel> = null;
  currentMovies: MovieModel[] = [];
  endedMovies: MovieModel[] = [];

  constructor(
    private readonly movieService: MovieService,
    private readonly showtimeService: ShowtimeService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly snackBarService: SnackBarService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .subscribe(
        (params: ParamMap) => {
          const id = Number(params.get('id'));
          if (id) {
            this.fetchMovie(id);
          } else {
            this.movie = null;
            this.setMovieForm();
          }
          this.fetchCurrentMovies();
        }
      );
  }

  public onFileChanged(event: Event): void {
    if (this.movie!.id === 0) {
      this.snackBarService.showMessage('Please, add movie first');
      return;
    }

    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.movie!.poster = e.target.result.split('base64,')[1];
      this.movieService.editMovie(this.movie!)
        .subscribe(
          () => {
            this.snackBarService.showMessage('Poster for movie added successful!');
          }
        );
    };
    reader.readAsDataURL(files[0]);
  }

  public navigateToMovie(id?: number): void {
    if (id) {
      void this.router.navigate(['/movie/', id]);
    } else {
      void this.router.navigate(['/movie'])
        .then(
          () => {
            this.movie = {
              id: 0,
              title: '',
              description: '',
              minutesLength: 0,
              startDate: new Date(),
              endDate: new Date()
            };
          }
        );
    }
  }

  public deleteMovie(id: number, title: string): void {
    this.movieService.deleteMovie(id)
      .subscribe(
        () => {
          if (this.movie) {
            if (this.movie.id === id) {
              this.navigateToMovie();
              this.snackBarService.showMessage(`Movie "${title}" deleted successful!`);
            }
          }
        }
      );
  }

  public onApplyClick(): void {
    const newMovie: MovieModel = {
      title: this.movieForm.get('title')?.value,
      description: this.movieForm.get('description')?.value,
      startDate: this.movieForm.get('startDate')?.value,
      endDate: this.movieForm.get('endDate')?.value,
      minutesLength: this.movieForm.get('minutesLength')?.value
    };
    if (this.movie?.id) {
      this.movieService.editMovie(Object.assign(this.movie, newMovie))
        .subscribe(
          () => {
            this.navigateToMovie(this.movie!.id);
            this.snackBarService.showMessage(`Movie "${newMovie.title}" edited successful!`);
          }
        );
    } else {
      this.movieService.addMovie(newMovie)
        .subscribe(
          (id: number) => {
            this.navigateToMovie(id);
            this.snackBarService.showMessage(`Movie "${newMovie.title}" added successful!`);
          }
        );
    }
  }

  private setMovieForm(movie?: MovieModel): void {
    if (movie) {
      this.movieForm.get('title')?.setValue(movie.title);
      this.movieForm.get('description')?.setValue(movie.description);
      this.movieForm.get('startDate')?.setValue(moment(movie.startDate).format('yyyy-MM-DD'));
      this.movieForm.get('endDate')?.setValue(moment(movie.endDate).format('yyyy-MM-DD'));
      this.movieForm.get('minutesLength')?.setValue(movie.minutesLength);
    } else {
      for (const control in this.movieForm.controls) {
        this.movieForm.get(control)?.setValue('');
      }
    }
  }

  private fetchMovie(id: number): void {
    this.movieService.getMovie(id)
      .subscribe(
        (movie: MovieModel) => {
          this.movie = movie;
          this.setMovieForm(this.movie);
        }
      );
  }

  private fetchCurrentMovies(): void {
    const currentDateTime = Date.now();
    this.movieService.getMovies()
      .subscribe(
        (movies: MovieModel[]) => {
          this.currentMovies = [];
          this.endedMovies = [];
          for (const movie of movies) {
            if (currentDateTime > Date.parse(movie.endDate.toString())) {
              this.endedMovies.push(movie);
            } else {
              this.currentMovies.push(movie);
            }
          }
        }
      );
  }
}
