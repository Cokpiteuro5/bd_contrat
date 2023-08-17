import { BudgetData } from './../../models/departement';
import { MorassService } from 'src/app/service/morass.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Departement, ResDepar, ResDepars } from 'src/app/models/departement';
import { DepartementService } from 'src/app/service/departement.service';
import { PopUpService } from '../tables-data/services/pop-up.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-tables-general',
  templateUrl: './tables-general.component.html',
  styleUrls: ['./tables-general.component.css']
})
export class TablesGeneralComponent implements OnInit {


  search : string = ''
  departement: Departement[] = [];

  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;
  fileSelected: boolean = false;
  selectedFile: File | null = null;
  loading: boolean = false;
  uploadProgress: number = 0;

  budgets: BudgetData[] = [];

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

  constructor(private elementRef: ElementRef,private departementService:DepartementService,private router: Router,private popupService: PopUpService) { }

  ngOnInit(): void {
    this.getAllD();
    this.fetchBudgetData();
  }


  getAllD(): void {
    this.departementService.getDepartement().subscribe(
      (res: ResDepars) => {
        this.departement = res.departements;
        console.log(res.departements);
      },
      (error) => {
        console.log('Error occurred while fetching data:', error);
      }
    );
  }

  fetchBudgetData() {
    this.departementService.getBudgetData().subscribe(
      (data) => {
        this.budgets = data.result;
        console.log(this.budgets);

      },
      (error) => {
        console.error('Error fetching budget data:', error);
      }
    );
  }

  getBudgetByCode(code: string): any {
    const codeNumber = parseInt(code, 10); // Parse the code to a number
    return this.budgets.find((budget) => parseInt(budget.Name, 10) === codeNumber);
  }


formatNumberWithSpaces(number?: number): string {
  if (number === undefined) {
    return '';
  }
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}


  downloadTemplate() {
    this.departementService.downloadExcel().subscribe(blob => {
      this.departementService.saveExcelFile(blob, 'Departement_Template.xlsx');
    }, error => {
      console.error(error);
    });
  }

  searchDepartement(){
    this.departementService.searchDepart(this.search).subscribe(({success,departements}:ResDepars)=>{
      if (success) {
        this.departement= departements
      }
      console.log(departements,'search here')
    })
  }
  destroyDepartement(id: string) {
    const confirmation = window.confirm('Are you sure you want to delete this item?');

    if (confirmation) {
      this.departementService.deleteDepart(id).subscribe(res => {
        this.departement = res.departements;
        this.getAllD();
      });
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
  }

  browseFile() {
    this.fileInput.nativeElement.click();
  }

  onFileDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      this.fileSelected = true;
      this.selectedFile = event.dataTransfer.files[0];
    }
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.fileSelected = true;
      this.selectedFile = input.files[0];
    }
  }



  uploadFile(): void {
    if (this.selectedFile) {
      const fileReader = new FileReader();
      fileReader.onload = (e: ProgressEvent<FileReader>) => {
        const target = e.target as FileReader;
        if (target && target.result) {
          const data = new Uint8Array(target.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData: unknown[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

          console.log(jsonData);

          if (jsonData.length > 1) {
            const codeDprt: number = jsonData[1][1] as number;
            const nomDprt: string = jsonData[1][2] as string;
            const crdPersonnel: number = jsonData[1][3] as number;
            const crdMateriel: number = jsonData[1][4] as number;
            const crdPaiement: number = jsonData[1][5] as number;
            const crdEngagement: number = jsonData[1][6] as number;

            const formData = new FormData();
            formData.append('codeDprt', codeDprt ? codeDprt.toString() : '');
            formData.append('nomDprt', nomDprt ?? '');
            formData.append('crdPersonnel', crdPersonnel ? crdPersonnel.toString() : '');
            formData.append('crdMateriel', crdMateriel ? crdMateriel.toString() : '');
            formData.append('crdPaiement', crdPaiement ? crdPaiement.toString() : '');
            formData.append('crdEngagement', crdEngagement ? crdEngagement.toString() : '');

            this.loading = true;

            this.popupService.uploadDepartementFile(formData).subscribe(
              (res: any) => {
                console.log('File uploaded successfully.');
                this.fileSelected = false;
                this.selectedFile = null;
                this.getAllD();

                this.loading = false;
              },
              (error: any) => {
                console.error('Error uploading Departement:', error);
                this.loading = false;
              }
            );
          } else {
            console.error('Invalid data format in the Excel sheet.');
          }
        }
      };

      fileReader.readAsArrayBuffer(this.selectedFile);
    } else {
      console.log('No file selected.');
    }
  }



  clearPopupData() {
    this.selectedFile = null;
    this.fileSelected = false;
    this.loading = false;
  }

  downloadTemplate2(): void {
    const templateData = [
      ['codeDprt', 'nomDprt', 'crdPersonnel', 'crdMateriel', 'crdPaiement', 'crdEngagement'],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      // Add more rows as needed
    ];

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(templateData);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Template');

    const workbookBlob = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const file = new Blob([workbookBlob], { type: 'application/octet-stream' });

    saveAs(file, 'template.xlsx');
  }

}
