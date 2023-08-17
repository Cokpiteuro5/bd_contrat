import { ChartData } from './../../models/chart-data';
// chart-data.component.ts

import { DepartementService } from 'src/app/service/departement.service';
import { ResDeparTop5 } from './../../models/chart-data'; // Update the import to include ResDeparTop5
import { Chart, registerables } from 'chart.js';
import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-chart-data',
  templateUrl: './chart-data.component.html',
  styleUrls: ['./chart-data.component.css'],
})
export class ChartDataComponent implements OnInit, AfterViewInit {

  @Input() itemchart1: any = {};

  constructor(private departementService: DepartementService) { }

  legendData: ChartData[] = []; // Initialize the legendData array


  @ViewChild('myChart') myChart!: ElementRef;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    Chart.register(...registerables);
    this.fetchDataAndCreateChart();
  }

  fetchDataAndCreateChart(): void {
    // Fetch data from the backend service
    this.departementService.getTop5Departements().subscribe(
      (data: ResDeparTop5) => {

        console.log(data); // Log the fetched data to the console for inspection

        const colors = ['rgba(75, 192, 192, 192)', 'rgba(54, 162, 235, 235)', 'rgba(255, 206, 86, 86)', 'rgba(255, 99, 132)', 'rgba(153, 102, 255, 255)'];
        const borderColors = ['rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(255, 206, 86)', 'rgb(255, 99, 132)', 'rgb(153, 102, 255)'];

        const legendData = data.result.map((item, index) => ({
          codeDprt: item.codeDprt.toString(),
          nomDprt: item.nomDprt,
          SUMTOTAL: item.SUMTOTAL,
          backgroundColor: colors[index % colors.length] // Add the backgroundColor property
        }));

        this.legendData = legendData;


        const chartData = {
          labels: data.result.map((item) => item.codeDprt), // Use the 'codeDprt' property for labels
          datasets: [{
            label: 'Total Budget', // Set a single label for the entire dataset
            data: data.result.map((item) => item.SUMTOTAL),
            backgroundColor: colors,
            borderColor: borderColors,
            borderWidth: 1
          }]
        };


        const chartConfig: any = {
          type: 'bar',
          data: chartData,
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            },
            plugins: {
              legend: {
                labels: {
                  generateLabels: function (chart: any) {
                    const data = chart.data;
                    if (data.labels.length && data.datasets.length) {
                      return data.labels.map((label: any, i: number) => {
                        const meta = chart.getDatasetMeta(0);
                        const ds = data.datasets[0];
                        const arc = meta.data[i];
                        const custom = (arc && arc.custom) || {};
                        const arcOpts = chart.options.elements.arc;
                        const fill = custom.backgroundColor ? custom.backgroundColor : ds.backgroundColor[i];
                        const stroke = custom.borderColor ? custom.borderColor : ds.borderColor[i];
                        const value = data.datasets[0].data[i];
                        const codeDprt = legendData[i].codeDprt;
                        return {
                          text: `${codeDprt}`,
                          fillStyle: fill,
                          strokeStyle: stroke,
                          lineWidth: 1,
                          hidden: isNaN(ds.data[i]) || meta.data[i].hidden,
                          index: i
                        };
                      });
                    }
                    return [];
                  }
                }
              },
              tooltip: {
                callbacks: {
                  label: (context: any) => {
                    const codeDprt = data.result[context.dataIndex].codeDprt;
                    const nomDprt = data.result[context.dataIndex].nomDprt;
                    const value = context.formattedValue;
                    return `Total Budget: ${value}`  ;
                  }
                }
              }
            }
          }
        };

        const ctx = (this.myChart.nativeElement as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D;
        new Chart(ctx, chartConfig);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  getDepartmentTotalBudget(codeDprt: string): string {
    // Implement your logic to get the total budget for the given department code
    // For example, you can use a separate service method to fetch this data from the backend.
    // For this example, I'm just returning a dummy value.
    return '100000';
  }



}
