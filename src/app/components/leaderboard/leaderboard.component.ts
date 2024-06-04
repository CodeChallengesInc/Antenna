import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { Ant } from 'src/app/models/board';
import { MatSort } from '@angular/material/sort';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { ViewCodeDialogComponent } from '../view-code-dialog/view-code-dialog.component';
import { ThemeService } from '../../services/theme.service';
import { AntErrorDialogComponent } from '../ant-error-dialog/ant-error-dialog.component';

@Component({
  selector: 'cci-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit, OnChanges {

  @Input() animals: Ant[] = [];
  @Input() allowViewingCode = true;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns: string[] = ['name', 'score', 'menu'];
  dataSource: MatTableDataSource<Ant>;
  highScore = 0;

  constructor(private dialog: MatDialog, private theme: ThemeService) { }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.animals) {
      if (this.animals.length > 1) {
        const leader = this.animals.sort((a, b) => {
          if (a.score > b.score) {
            return 1;
          } else if (a.score < b.score) {
            return -1;
          } else {
            return 0;
          }
        })[this.animals.length - 1];
        if (leader && leader.score) {
          this.highScore = leader.score;
        }
      }
      this.dataSource = new MatTableDataSource(this.animals);
      this.dataSource.sort = this.sort;
    }
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.animals);
    this.dataSource.sort = this.sort;
  }

  viewCode(ant: Ant): void {
    this.dialog.open(ViewCodeDialogComponent, { data: { ant }, width: '1000px', height: '800px' });
  }

  showError(ant: Ant): void {
    this.dialog.open(AntErrorDialogComponent, { data: { ant } });
  }

  getBorderColor(ant: Ant) {
    if (ant.error) {
      return 'red';
    }

    if (this.highScore && ant.score === this.highScore) {
      return 'gold';
    }
    return this.theme.isDarkTheme() ? 'white' : 'black';
  }
}
