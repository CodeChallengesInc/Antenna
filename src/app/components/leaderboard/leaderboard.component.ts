import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { Animal } from 'src/app/models/board';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ViewCodeDialogComponent } from '../view-code-dialog/view-code-dialog.component';
import { ThemeService } from '../../services/theme.service';
import { AntErrorDialogComponent } from '../ant-error-dialog/ant-error-dialog.component';

@Component({
  selector: 'cci-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit, OnChanges {

  @Input() animals: Animal[] = [];
  @Input() allowViewingCode = true;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns: string[] = ['name', 'score', 'menu'];
  dataSource: MatTableDataSource<Animal>;
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
      this.dataSource = new MatTableDataSource(this.animals.filter( a => a.type === undefined || a.type === 5 ));
      // this.dataSource = new MatTableDataSource(this.animals);
      this.dataSource.sort = this.sort;
    }
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.animals);
    this.dataSource.sort = this.sort;
  }

  viewCode(animal: Animal): void {
    this.dialog.open(ViewCodeDialogComponent, { data: { animal }, width: '1000px', height: '800px' });
  }

  showError(animal: Animal): void {
    this.dialog.open(AntErrorDialogComponent, { data: { animal } });
  }

  getBorderColor(ant: Animal) {
    if (ant.error) {
      return 'red';
    }

    if (this.highScore && ant.score === this.highScore) {
      return 'gold';
    }
    return this.theme.isDarkTheme() ? 'white' : 'black';
  }
}
