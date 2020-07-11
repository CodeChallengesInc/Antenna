import { Component, Input, ViewChild, ElementRef, AfterViewInit, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { Animal, GameStatus } from 'src/app/models/board';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'cci-ant-grid',
  templateUrl: './ant-grid.component.html',
  styleUrls: ['./ant-grid.component.scss']
})
export class AntGridComponent implements AfterViewInit, OnChanges {

  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>;
  public context: CanvasRenderingContext2D;

  @Input() grid: number[][][] = [];
  @Input() animals: Animal[] = [];
  @Input() elapsedTicks: 0;
  @Input() gameLength: 0;
  @Input() fullWidth = false;
  @Input() mobileDialog = false;

  canvasWidth = 0;
  canvasHeight = 0;
  cellSize = 6;
  highScore = 0;

  private mousePos: any;
  private scaleFactor: number;

  constructor(private cdr: ChangeDetectorRef, private theme: ThemeService) { }

  ngAfterViewInit(): void {
    this.context = this.canvas.nativeElement.getContext('2d');
    this.canvasHeight = this.grid.length * this.cellSize + this.cellSize * 2;
    this.canvasWidth = this.grid[0].length * this.cellSize + this.cellSize * 2;
    this.cdr.detectChanges();
    window.requestAnimationFrame(() => this.draw());
    this.scaleFactor = this.canvasWidth / this.canvas.nativeElement.getBoundingClientRect().width;
    this.canvas.nativeElement.addEventListener('mousemove', (event: MouseEvent) => {
      this.mousePos = {
        x: event.offsetX * this.scaleFactor,
        y: event.offsetY * this.scaleFactor
      };
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.animals) {
      if (this.animals && this.animals.length > 1) {
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
      window.requestAnimationFrame(() => this.draw(changes.animals.previousValue));
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

  drawLabels() {
    if (this.mousePos) {
      this.animals.forEach(ant => {
        const centerX = ant.column * this.cellSize + (this.cellSize / 2);
        const centerY = ant.row * this.cellSize + (this.cellSize / 2);
        const diameter = this.cellSize * 3;
        if (this.mousePos.x > (centerX - diameter) && this.mousePos.x < (centerX + diameter) &&
        this.mousePos.y > (centerY - diameter) && this.mousePos.y < (centerY + diameter)) {
          const name = `${ant.name}${ant.type !== undefined ? ' ' + ant.type : '' } `;
          this.drawLabel(name, centerX, centerY, diameter);
        }
      });
    }
  }

  draw(previousAnts?: Animal[], step?: number): void {
    if (this.context) {
      this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      this.context.globalAlpha = 0.5;

      for (let i = 0; i < this.grid.length; i++) {
        for (let j = 0; j < this.grid[i].length; j++) {
          const colorValue = this.grid[i][j][0];
          if (colorValue > 1) {
            this.context.fillStyle = this.getColor(colorValue);
            this.context.fillRect(j * this.cellSize + this.cellSize, i * this.cellSize + this.cellSize, this.cellSize, this.cellSize);
          }
          const foodValue = this.grid[i][j][1];
          if (foodValue === 1) {
            const centerX = j * this.cellSize + (this.cellSize / 2);
            const centerY = i * this.cellSize + (this.cellSize / 2);
            const radius = this.cellSize / 2 - 1;
            const stroke = this.theme.isDarkTheme() ? 'black' : 'darkgray';
            this.drawCircle(centerX, centerY, radius, 'brown', stroke, 0);
          }
        }
      }

      this.context.globalAlpha = 1;

      for (let i = 0; i < this.animals.length; i++) {
        if (previousAnts) {
          if (!step) {
            step = 0;
          }
          const previousAnt = previousAnts[i];
          const centerX = this.animals[i].column * this.cellSize + (this.cellSize / 2);
          const centerY = this.animals[i].row * this.cellSize + (this.cellSize / 2);
          const prevCenterX = previousAnt.column * this.cellSize + (this.cellSize / 2);
          const prevCenterY = previousAnt.row * this.cellSize + (this.cellSize / 2);
          const dx = prevCenterX + (centerX - prevCenterX) * step;
          const dy = prevCenterY + (centerY - prevCenterY) * step;
          const radius = this.animals[i].type === undefined || this.animals[i].type === 5 ?
           this.cellSize / 2 + 2 :
           this.cellSize / 4 + 1 ;
          if (Math.abs(centerX - prevCenterX) > this.cellSize ||
              Math.abs(centerY - prevCenterY) > this.cellSize) {
            this.drawCircle(centerX, centerY, radius, this.animals[i].color, this.getAntStrokeColor(this.animals[i]), 2);
          } else {
            this.drawCircle(dx, dy, radius, this.animals[i].color, this.getAntStrokeColor(this.animals[i]), 2);
          }
        } else {
          const centerX = this.animals[i].column * this.cellSize + (this.cellSize / 2);
          const centerY = this.animals[i].row * this.cellSize + (this.cellSize / 2);
          const radius = this.cellSize / 2 + 2;
          this.drawCircle(centerX, centerY, radius, this.animals[i].color, this.getAntStrokeColor(this.animals[i]), 2);
        }
      }

      this.drawLabels();

      step += 0.2;
      if (step <= 1) {
        window.requestAnimationFrame(() => this.draw(previousAnts, step));
      }
    }
  }

  private getAntStrokeColor(animal: Animal) {
    if (animal.error) {
      return 'red';
    }

    if (this.highScore && animal.score === this.highScore) {
      return 'gold';
    }

    if (animal.type !== undefined && animal.type !== 5) {
      return 'green';
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

  private drawLabel(text: string, antCenterX: number, antCenterY: number, antRadius) {
    this.context.font = '12px Arial';
    const textWidth = this.context.measureText(text).width;
    this.context.fillStyle = '#000000AA';
    this.context.fillRect(antCenterX - textWidth / 2 + 5, antCenterY - antRadius - 4, textWidth + 4, 16);
    this.context.fillStyle = '#FFFFFF';
    this.context.fillText(text, antCenterX - textWidth / 2 + 7, antCenterY - antRadius + 7);
  }
}
