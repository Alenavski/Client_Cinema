import { Component,  OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { AdditionModel } from '@models/addition.model';
import { HallAdditionModel } from '@models/hall-addition.model';

import { AdditionService } from '@service/addition.service';

@Component({
  selector: 'app-addition',
  templateUrl: './addition.component.html',
  styleUrls: ['./addition.component.less']
})
export class AdditionComponent implements OnInit {
  hallId: number = 0;
  hallAdditions: HallAdditionModel[] = [];
  allAdditions: AdditionModel[] = [];
  needAdditions: boolean = false;
  newAddition: AdditionModel = {
    id: 0,
    name: ''
  };
  newHallAddition: HallAdditionModel = {
    price: 0,
    addition: {
      id: 0,
      name: ''
    }
  };

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly additionService: AdditionService
  ) { }

  ngOnInit(): void {
    this.fetchAllAdditions();
    this.activatedRoute.paramMap
      .subscribe(
        (params: ParamMap) => {
          this.hallId = Number(params.get('idHall'));
          if (this.hallId !== 0) {
            this.fetchHallAdditions();
          }
        }
      );
  }

  public deleteHallAddition(additionId: number): void {
    if (this.hallId !== 0) {
      this.additionService.deleteHallAddition(this.hallId, additionId).subscribe(
        () => {
          this.fetchHallAdditions();
        }
      );
    }
  }

  public addHallAddition(): void {
    if (this.hallId !== 0) {
      this.additionService.addHallAddition(this.hallId, this.newHallAddition).subscribe(
        () => {
          this.hallAdditions.push(this.newHallAddition);
          this.newHallAddition = {
            price: 0,
            addition: {
              id: 0,
              name: ''
            }
          };
        }
      );
    }
  }

  public addAddition(): void {
    this.additionService.addAddition(this.newAddition).subscribe(
      (id: number) => {
        this.allAdditions.push({ id: id, name: this.newAddition.name });
        this.newAddition = {
          id: 0,
          name: ''
        };
      }
    );
  }

  public deleteAddition(id: number): void {
    this.additionService.deleteAddition(id).subscribe(
      () => {
        this.fetchAllAdditions();
      }
    );
  }

  private fetchAllAdditions(): void {
    this.additionService.getAdditions().subscribe(
      (additions: AdditionModel[]) => {
        this.allAdditions = additions;
      }
    );
  }

  private fetchHallAdditions(): void {
    this.additionService.getHallAdditions(this.hallId).subscribe(
      (additions: HallAdditionModel[]) => {
        this.hallAdditions = additions;
      }
    );
  }

}
