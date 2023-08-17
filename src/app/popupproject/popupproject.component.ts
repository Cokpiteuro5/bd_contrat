import { Component, OnInit } from '@angular/core';
import { Programme } from '../models/Programme.model';
import { TypeInvestisement } from '../models/TypeInvestisement.model';
import { Priorite } from '../models/Priorite.model';
import { NatureProgramme } from '../models/NatureProgramme.model';
import { Enjeux } from '../models/enjeux.model';
import { Lead } from '../models/Lead.model';
import { TypeAgile } from '../models/TypeAgile.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BudgetService } from '../service/budget.service';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-popupproject',
  templateUrl: './popupproject.component.html',
  styleUrls: ['./popupproject.component.css']
})
export class PopupprojectComponent implements OnInit {

  projetForm: FormGroup = new FormGroup({}); // Assigning an empty FormGroup initially

  constructor(private dialogRef: MatDialogRef<PopupprojectComponent>,private templateApiService: BudgetService,
    private http: HttpClient,private formBuilder: FormBuilder){

    }
    ngOnInit() {
      this.initForm();

    }

    initForm() {
      this.projetForm = this.formBuilder.group({
        nom: [''],
        nomLe: [''],
        nomEn: ['' ],
        nomPr: [''],
        nomNt: [''],
        nominvestisement: [''],
        nomprog: [''],


      });
    }




    onSubmit() {
      if (this.projetForm.invalid) {
        return;
      }

      const typeAgileData: TypeAgile = this.projetForm.value;
      console.log("typeAgile",typeAgileData)
      this.templateApiService.createTypeAgile(typeAgileData).subscribe(
        (createdTypeAgile: TypeAgile) => {
          console.log("Created Type Agile:", createdTypeAgile);
        }
      );

      const leaddata: Lead = this.projetForm.value;
      console.log("lead",leaddata)
      this.templateApiService.createlead(leaddata).subscribe(
        (createdlead: Lead) => {
          console.log("Created lead:", createdlead);
        }
      );

      const Enjeuxdata: Enjeux = this.projetForm.value;
      console.log("Enjeux",Enjeuxdata)
      this.templateApiService.createenjeux(Enjeuxdata).subscribe(
        (createdenjeux: Enjeux) => {
          console.log("Created enjeux:", createdenjeux);
        }
      );



      const naturedata: NatureProgramme = this.projetForm.value;
      console.log("NatureProgramme",naturedata)
      this.templateApiService.createNature(naturedata).subscribe(
        (creatednature: NatureProgramme) => {
          console.log("Created nature:", creatednature);
        }
      );



      const Prioritedata: Priorite = this.projetForm.value;
      console.log("Priorite",Prioritedata)
      this.templateApiService.createPriorite(Prioritedata).subscribe(
        (createdPriorite: Priorite) => {
          console.log("Created Priorite:", createdPriorite);
        }
      );






      const investisementdata: TypeInvestisement = this.projetForm.value;
      console.log("Investisement",investisementdata)
      this.templateApiService.createInvestisement(investisementdata).subscribe(
        (createdInvestisement: TypeInvestisement) => {
          console.log("Created Investisement:", createdInvestisement);
        }
      );


      const programmedata: Programme = this.projetForm.value;
      console.log("programme",programmedata)
      this.templateApiService.createprogramme(programmedata).subscribe(
        (createdprogramme: Programme) => {
          console.log("Created programme:", createdprogramme);
        }
      );


    }





    closeDialog(): void {
      this.dialogRef.close();
    }

}
