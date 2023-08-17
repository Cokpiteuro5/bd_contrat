import { Chart, registerables } from 'chart.js';
import { MorassService } from 'src/app/service/morass.service';
import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, Input } from '@angular/core';

@Component({
  selector: 'app-second-chart-data',
  templateUrl: './second-chart-data.component.html',
  styleUrls: ['./second-chart-data.component.css']
})
export class SecondChartDataComponent implements OnInit {

  @Input() itemchart2: any = {};


  constructor(private morassService: MorassService) { }

  @ViewChild('mySecondChart') mySecondChart!: ElementRef;


  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    Chart.register(...registerables);

const secondChartData = {
      labels: ['Label A', 'Label B', 'Label C', 'Label D', 'Label E', 'Label F', 'Label J', 'Label H', 'Label I', 'Label G', 'Label K', 'Label L'],
      datasets: [{
        label: 'Second Dataset',
        data: [10, 20, 30, 40, 50, 40, 30, 20, 10, 40, 10, 30],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 1
      }]
    };
const secondChartConfig: any = {
      type: 'bar', // Replace 'line' with your desired chart type
      data: secondChartData,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    };

const secondCtx = (this.mySecondChart.nativeElement as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D;
    new Chart(secondCtx, secondChartConfig);
}

}
