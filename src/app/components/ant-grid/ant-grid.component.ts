import { Component, Input, ViewChild, ElementRef, AfterViewInit, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { Ant, Food } from 'src/app/models/board';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'cci-ant-grid',
  templateUrl: './ant-grid.component.html',
  styleUrls: ['./ant-grid.component.scss']
})
export class AntGridComponent implements AfterViewInit, OnChanges {

  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>;
  public context: CanvasRenderingContext2D;

  @Input() grid: number[][] = [];
  @Input() ants: Ant[] = [];
  @Input() food: Food[] = [];
  @Input() elapsedTicks = 0;

  canvasWidth = 0;
  canvasHeight = 0;
  cellSize = 6;
  highScore = 0;

  constructor(private cdr: ChangeDetectorRef, private theme: ThemeService) { }

  ngAfterViewInit(): void {
    this.context = this.canvas.nativeElement.getContext('2d');
    this.canvasHeight = this.grid.length * this.cellSize + this.cellSize * 2;
    this.canvasWidth = this.grid[0].length * this.cellSize + this.cellSize * 2;
    this.cdr.detectChanges();
    window.requestAnimationFrame(() => this.draw());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.ants) {
      if (this.ants && this.ants.length > 1) {
        const leader = this.ants.sort((a, b) => {
          if (a.score > b.score) {
            return 1;
          } else if (a.score < b.score) {
            return -1;
          } else {
            return 0;
          }
        })[this.ants.length - 1];
        if (leader && leader.score) {
          this.highScore = leader.score;
        }
      }
      window.requestAnimationFrame(() => this.draw(changes.ants.previousValue));
    }
  }

  private getColor(value: number): string {
    switch (value) {
      case 2:
        return '#2c4cd6';
      case 3:
        return '#00999b';
      case 4:
        return '#04a003';
      case 5:
        return '#d61336';
      case 6:
        return '#ce6901';
      case 7:
        return '#7e27de';
      case 8:
        return '#cc48a9';
      default:
        return '';
    }
  }

  draw(previousAnts?: Ant[], step?: number): void {
    if (this.context) {
      this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      this.context.globalAlpha = 0.5;

      for (let i = 0; i < this.grid.length; i++) {
        for (let j = 0; j < this.grid[i].length; j++) {
          const value = this.grid[i][j];
          if (value > 1) {
            this.context.fillStyle = this.getColor(value);
            this.context.fillRect(j * this.cellSize + this.cellSize, i * this.cellSize + this.cellSize, this.cellSize, this.cellSize);
          }
        }
      }

      this.context.globalAlpha = 1;

      for (const ant of this.food) {
        const centerX = ant.column * this.cellSize + (this.cellSize / 2);
        const centerY = ant.row * this.cellSize + (this.cellSize / 2);
        const radius = this.cellSize / 2 - 1;
        const stroke = this.theme.isDarkTheme() ? 'black' : 'darkgray';
        this.drawCircle(centerX, centerY, radius, 'brown', stroke, 0);
      }

      for (let i = 0; i < this.ants.length; i++) {
        if (previousAnts) {
          if (!step) {
            step = 0;
          }
          const previousAnt = previousAnts[i];
          const centerX = this.ants[i].column * this.cellSize + (this.cellSize / 2);
          const centerY = this.ants[i].row * this.cellSize + (this.cellSize / 2);
          const prevCenterX = previousAnt.column * this.cellSize + (this.cellSize / 2);
          const prevCenterY = previousAnt.row * this.cellSize + (this.cellSize / 2);
          const dx = prevCenterX + (centerX - prevCenterX) * step;
          const dy = prevCenterY + (centerY - prevCenterY) * step;
          const radius = this.cellSize / 2 + 2;
          if (Math.abs(centerX - prevCenterX) > this.cellSize ||
              Math.abs(centerY - prevCenterY) > this.cellSize) {
            this.drawCircle(centerX, centerY, radius, this.ants[i].color, this.getAntStrokeColor(this.ants[i]), 2);
          } else {
            this.drawCircle(dx, dy, radius, this.ants[i].color, this.getAntStrokeColor(this.ants[i]), 2);
          }
        } else {
          const centerX = this.ants[i].column * this.cellSize + (this.cellSize / 2);
          const centerY = this.ants[i].row * this.cellSize + (this.cellSize / 2);
          const radius = this.cellSize / 2 + 2;
          const color = this.ants[i].error ? 'red' :
          this.drawCircle(centerX, centerY, radius, this.ants[i].color, this.getAntStrokeColor(this.ants[i]), 2);
        }
      }

      step += 0.2;
      if (step <= 1) {
        window.requestAnimationFrame(() => this.draw(previousAnts, step));
      }
    }
  }

  private getAntStrokeColor(ant: Ant) {
    if (ant.error) {
      return 'red';
    }

    if (this.highScore && ant.score === this.highScore) {
      return 'gold';
    }
    return this.theme.isDarkTheme() ? 'white' : 'black';
  }

  private drawCircle(centerX: number, centerY: number, radius: number, fillColor: string, strokeColor: string, lineWidth: number): void {
    this.context.beginPath();
    this.context.arc(centerX + this.cellSize, centerY + this.cellSize, radius, 0, 2 * Math.PI, false);
    this.context.fillStyle = fillColor;
    this.context.fill();
    this.context.lineWidth = lineWidth;
    this.context.strokeStyle = strokeColor;
    this.context.stroke();
  }
}
