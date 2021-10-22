import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MovieModel } from '@models/movie.model';
import { MovieService } from '@service/movie.service';
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

  public navigateToMovie(id?: number): void {
    if (id) {
      void this.router.navigate(['/movie/', id]);
    } else {
      void this.router.navigate(['/movie']);
    }
  }

  public deleteMovie(id: number): void {
    this.movieService.deleteMovie(id).subscribe(
      () => {
        if (this.movie) {
          if (this.movie.id === id) {
            this.navigateToMovie();
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
          }
        );
    } else {
      this.movieService.addMovie(newMovie).subscribe(
        (id: number) => {
          this.navigateToMovie(id);
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
    this.movieService.getMovie(id).subscribe(
      (movie: MovieModel) => {
        this.movie = movie;
        this.setMovieForm(this.movie);
      }
    );
  }

  private fetchCurrentMovies(): void {
    const currentDate = new Date();
    this.movieService.getMovies(currentDate.toDateString()).subscribe(
      (movies: MovieModel[]) => {
        this.currentMovies = movies;
        this.fetchEndedMovies();
      }
    );
  }

  private fetchEndedMovies(): void {
    this.movieService.getMovies().subscribe(
      (movies: MovieModel[]) => {
        this.endedMovies = [];
        for (const movie of movies) {
          if (!this.currentMovies.find(m => m.id == movie.id)) {
            this.endedMovies.push(movie);
          }
        }
      }
    );
  }
}
