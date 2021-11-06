import { MovieModel } from '@models/movie.model';
import { TicketModel } from '@models/ticket.model';

export interface TicketMovieModel {
  movie: MovieModel;
  ticket: TicketModel;
}
