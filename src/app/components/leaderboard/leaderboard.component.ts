import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { Ant } from 'src/app/models/board';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'cci-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit, OnChanges {

  @Input() ants: Ant[] = [];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns: string[] = ['name', 'score'];
  dataSource: MatTableDataSource<Ant>;

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.ants) {
      this.dataSource = new MatTableDataSource(this.ants);
      this.dataSource.sort = this.sort;
    }
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.ants);
    this.dataSource.sort = this.sort;
  }
}
