import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MorassService } from 'src/app/service/morass.service';
import { PopUpService } from '../tables-data/services/pop-up.service';
import { BudgetService } from 'src/app/service/budget.service';
import { FormBuilder } from '@angular/forms';
import { Programme } from 'src/app/models/Programme.model';
import { SharedServiceService } from 'src/app/services/shared/shared-service.service';

@Component({
  selector: 'app-programme',
  templateUrl: './programme.component.html',
  styleUrls: ['./programme.component.css']
})
export class ProgrammeComponent implements OnInit {
  showCaracteristiquesForm = false;
  programmetOptions:Programme[]=[];
  libelleinitiative : string = '';
  programmeid = null ;

programmes:Programme[]=[]
  constructor(private elementRef: ElementRef,
    private morassService: MorassService,
    private router: Router,
    private popupService: PopUpService,
    private route: ActivatedRoute,

    private templateApiService: BudgetService,
    private formBuilder: FormBuilder,
    private _formBuilder: FormBuilder,private sharedService: SharedServiceService) {

     }

  ngOnInit() {
this.fetchprogramme();
  }



  selectIdProgramme(event: any) {
    this.programmeid = event.target.value;
    const id = event.target.value
    console.log('id programme', id);
    this.sharedService.setSelectedProgrammeId(id);



  }

  onInputChange() {
    this.sharedService.setLibelleInitiative(this.libelleinitiative);
  }

  fetchprogramme() {
    this.morassService.getprogramme().subscribe(
      (programmes: any) => {
        this.programmes = programmes.programme;
        console.log('Fetched programme:', programmes.programme);
             this.programmetOptions=programmes.programme
      }
    );
  }


  
}
