import { Component, Input, ViewChild, ElementRef, AfterViewInit, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { Ant, Food } from 'src/app/models/board';

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

  constructor(private cdr: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    this.context = this.canvas.nativeElement.getContext('2d');
    this.canvasHeight = this.grid.length * this.cellSize;
    this.canvasWidth = this.grid[0].length * this.cellSize;
    this.cdr.detectChanges();
    this.draw();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.draw();
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

  draw(): void {
    requestAnimationFrame(() => this.draw);
    if (this.context) {
      this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      this.context.globalAlpha = 0.5;

      for (let i = 0; i < this.grid.length; i++) {
        for (let j = 0; j < this.grid[i].length; j++) {
          const value = this.grid[i][j];
          if (value > 1) {
            this.context.fillStyle = this.getColor(value);
            this.context.fillRect(j * this.cellSize, i * this.cellSize, this.cellSize, this.cellSize);
          }
        }
      }

      this.context.globalAlpha = 1;

      for (const ant of this.food) {
        const centerX = ant.column * this.cellSize + (this.cellSize / 2);
        const centerY = ant.row * this.cellSize + (this.cellSize / 2);
        const radius = this.cellSize / 2 - 1;
        this.drawCircle(centerX, centerY, radius, 'brown', 'black', 1);
      }

      for (const ant of this.ants) {
        const centerX = ant.column * this.cellSize + (this.cellSize / 2);
        const centerY = ant.row * this.cellSize + (this.cellSize / 2);
        const radius = this.cellSize / 2 + 2;
        this.drawCircle(centerX, centerY, radius, ant.color, 'white', 2);
      }
    }
  }

  private drawCircle(centerX: number, centerY: number, radius: number, fillColor: string, strokeColor: string, lineWidth: number): void {
    this.context.beginPath();
    this.context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    this.context.fillStyle = fillColor;
    this.context.fill();
    this.context.lineWidth = lineWidth;
    this.context.strokeStyle = strokeColor;
    this.context.stroke();
  }
}
