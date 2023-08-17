import { Chart, registerables } from 'chart.js';
import { MorassService } from 'src/app/service/morass.service';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-third-chart-data',
  templateUrl: './third-chart-data.component.html',
  styleUrls: ['./third-chart-data.component.css']
})
export class ThirdChartDataComponent implements OnInit {

  @Input() itemchart3: any = {};

  constructor(private morassService: MorassService) { }

  @ViewChild('myThirdChart') myThirdChart!: ElementRef;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    Chart.register(...registerables);

    const thirdChartData = {
      labels: [
        'Red',
        'Green',
        'Yellow',
        'Grey',
        'Blue'
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [11, 16, 7, 3, 14],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(75, 192, 192)',
          'rgb(255, 205, 86)',
          'rgb(201, 203, 207)',
          'rgb(54, 162, 235)'
        ]
      }]
    };
const thirdChartConfig: any = {
      type: 'polarArea',
      data: thirdChartData,
      options: {}
    };
const thirdCtx = (this.myThirdChart.nativeElement as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D;
    new Chart(thirdCtx, thirdChartConfig);

}

}
