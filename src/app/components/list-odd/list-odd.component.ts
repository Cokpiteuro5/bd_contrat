import { Odd, OddResponse, ResOneOdd } from 'src/app/models/odd';
import { OddService } from './../../service/odd.service';
import {  OddBudget, ResOddBudget } from './../../models/odd';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-list-odd',
  templateUrl: './list-odd.component.html',
  styleUrls: ['./list-odd.component.css']
})
export class ListOddComponent implements OnInit {
  id:any
  loading: boolean = false;
  odds: OddBudget[] = [];
  search: string = '';
  filteredOdds: Odd[] = [];
  p: number = 1;
  itemsPerPage: number = 10;

  showFirstCard: boolean = true;

  toggleCard() {
    this.showFirstCard = !this.showFirstCard;
  }

  onPageChange(pageNumber: number) {
    this.p = pageNumber;
  }

  onItemsPerPageChange() {
    this.p = 1; // Reset the page number to 1 when the items per page is changed
  }

  constructor(private oddService: OddService) {}

  ngOnInit(): void {
    this.getOddBudegt();
    // this.filterOdd();
  }

  getOddBudegt() {
    this.loading = true;
    this.oddService.getOddBudget().subscribe((res: ResOddBudget) => {
      this.odds = res.odds;
      console.log(res.odds,'hshqhqhdhh');
      this.loading = false;
    });
  }



updateOddAndEcart(odd: OddBudget) {
  this.loading = true;
  this.oddService.patchOdd(odd.id, { bs_finance: odd.bs_finance }).subscribe(
    (response: any) => {
      console.log('Odd updated:', response);
      this.calculateAndUpdateEcart(odd.id, {}).subscribe(
        (ecartResponse: any) => {
          console.log('Ecart calculated:', ecartResponse);
          this.loading = false;
          this.getOddBudegt(); // Reload the table data after both operations are done
        },
        (error) => {
          console.error('Error while calculating ecart:', error);
          this.loading = false;
        }
      );
    },
    (error) => {
      console.error('Error while updating odd:', error);
      this.loading = false;
    }
  );
}



calculateAndUpdateEcart(id: number, data: any) {
  return this.oddService.calculateAndUpdateEcart(id, data);
}

}
