import { NumberFormatPipe } from './../pipe/NumberFormatPipe';
import { DepartmentSum } from './../../models/chart-data';
import { DepartementService } from 'src/app/service/departement.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [NumberFormatPipe] // Add NumberFormatPipe to the providers array

})
export class DashboardComponent implements OnInit {

  formatNumber(value?: number): string {
    if (value === undefined || isNaN(value)) {
      return 'N/A';
    }

    const abbreviations = ['KD', 'MD', 'BD', 'TD'];

    if (value < 1000) {
      return value.toString();
    }

    let index = -1;
    do {
      value /= 1000;
      index++;
    } while (value >= 1000 && index < abbreviations.length - 1);

    // Round to one decimal point if necessary
    value = Math.round(value * 10) / 10;

    return value + abbreviations[index];
  }


  chartData1: any;

  globalSum!: DepartmentSum;

  constructor(private departmentsService: DepartementService) {}

  ngOnInit() {
    this.fetchGlobalSum();
  }

  fetchGlobalSum() {
    this.departmentsService.getGlobalSum().subscribe(
      (result: DepartmentSum) => {
        this.globalSum = result;
        // Do something with the globalSum data
      },
      (error) => {
        console.error('Error fetching global sum:', error);
      }
    );
  }

  showFirstCard: boolean = true;

  toggleCard() {
    this.showFirstCard = !this.showFirstCard;
  }

}
