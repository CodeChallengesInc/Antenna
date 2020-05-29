import { Component, OnInit, Input } from '@angular/core';
import { Ant, Food } from 'src/app/models/board';

@Component({
  selector: 'cci-ant-grid',
  templateUrl: './ant-grid.component.html',
  styleUrls: ['./ant-grid.component.scss']
})
export class AntGridComponent implements OnInit {

  @Input() grid: number[][] = [];
  @Input() ants: Ant[] = [];
  @Input() food: Food[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  getAnt(row: number, column: number): Ant | undefined {
    return this.ants.find(a => a.row === row && a.column === column);
  }

  getFood(row: number, column: number): Food | undefined {
    return this.food.find(f => f.row === row && f.column === column);
  }

}
