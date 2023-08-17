import { Component, OnInit } from '@angular/core';
import { Odd, ResOdd } from 'src/app/models/odd';
import { OddService } from 'src/app/service/odd.service';

@Component({
  selector: 'app-list-group',
  templateUrl: './list-group.component.html',
  styleUrls: ['./list-group.component.css']
})
export class ListGroupComponent implements OnInit {
  loading: boolean = false;
  odds: Odd[] = [];
  search: string = '';
  filteredOdds: Odd[] = [];
  p: number = 1;
  itemsPerPage: number = 10;

  onPageChange(pageNumber: number) {
    this.p = pageNumber;
  }

  onItemsPerPageChange() {
    this.p = 1; // Reset the page number to 1 when the items per page is changed
  }

  constructor(private oddService: OddService) {}

  ngOnInit(): void {
    this.getOdds();
    this.filterOdd();
  }

  getOdds() {
    this.loading = true;
    this.oddService.getOdds().subscribe((res: ResOdd) => {
      this.odds = res.oddsLst;
      console.log(res.oddsLst);
      this.loading = false;
    });
  }




  ExportOdd() {
    this.oddService.downloadOddExcel().subscribe(
      (blob) => {
        this.oddService.saveExcelFile(blob, 'ODD_Template.xlsx');
      },
      (error) => {
        console.error(error);
      }
    );
  }

  filterOdd() {
    if (this.search.trim() !== '') {
      this.filteredOdds = this.odds.filter((odd: Odd) => {
        // Apply your desired search criteria here
        const label = odd.etiquette?.label?.toLowerCase() || '';
        return label.includes(this.search.toLowerCase());
      });
    } else {
      this.getOdds();
    }
  }

}
