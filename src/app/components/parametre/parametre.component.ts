import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Lead } from 'src/app/models/Lead.model';
import { NatureProgramme } from 'src/app/models/NatureProgramme.model';
import { Priorite } from 'src/app/models/Priorite.model';
import { Programme } from 'src/app/models/Programme.model';
import { TypeAgile } from 'src/app/models/TypeAgile.model';
import { TypeInvestisement } from 'src/app/models/TypeInvestisement.model';
import { Enjeux } from 'src/app/models/enjeux.model';
import { Projet } from 'src/app/models/projet.model';
import { MorassService } from 'src/app/service/morass.service';
import { PopUpService } from '../tables-data/services/pop-up.service';
import { BudgetService } from 'src/app/service/budget.service';
import { Entite } from 'src/app/models/entite.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-parametre',
  templateUrl: './parametre.component.html',
  styleUrls: ['./parametre.component.css']
})

export class ParametreComponent implements OnInit {

  // Formgroup

  poppupprojetForm:FormGroup;
  toppings: FormGroup;


  budgets:Entite[] = [];

  leads: Lead[] = [];
  Typeagiles:TypeAgile[]=[]
  Enjeuxs:Enjeux[]=[]
Priorites:Priorite[]=[]
natures:NatureProgramme[]=[]
investisements:TypeInvestisement[]=[]

   programmes:Programme[]=[]

   showCaracteristiquesForm = false;

   project:Projet[]=[];














  constructor(
    private elementRef: ElementRef,
    private morassService: MorassService,
    private router: Router,
    private popupService: PopUpService,
    private route: ActivatedRoute,

    private templateApiService: BudgetService,
    private formBuilder: FormBuilder,
    private _formBuilder: FormBuilder
  ) {

  {
      this.poppupprojetForm = this.formBuilder.group({
        nom: '',
        nomLe: '',
        nomEn: '' ,
        nomPr: '',
        nomNt: '',
        nominvestisement: '',
        nomprog: '',


      });
    }

{

  this.toppings = this._formBuilder.group({
    nom: ['', Validators.required],
    interne: null,
    externe: null,
    regie: null,
    type:'',
    forfait :null,
   TJM_interne:null,
   TJM_externe:null,
   TJM_regie:null,
   projet_id:null,

  });
}



  }
  ngOnInit() {


    // this.initForm();

    this.fetchLeads();
    this. fetchtype();
    this.fetchenjuex();
    this.fetchnature();
    this.fetchpriorite();
    this.fetchinvestisement();
    this.fetchprogramme();

  }




  onSavepopupadmin() {
    const {
      nom,
      interne,
      externe,
      regie,
      forfait,
      projet_id,
      TJM_interne,
      TJM_externe,
      TJM_regie
    } = this.toppings.value;

    let newType = ''; // Initialize newType variable

    if (regie === null) {
      if (interne) {
        newType = 'EI'; // Set newType to 'EI' when interne is checked
      } else {
        newType = 'forfait'; // Set newType to 'forfait' when interne is not checked
      }
    } else {
      newType = 'regie'; // Set newType to 'regie' when regie is not null
    }

    const dataToSave = {
      nom,
      interne,
      externe,
      regie,
      forfait,
      type: newType, // Use the calculated newType value
      projet_id,
      TJM_interne,
      TJM_externe,
      TJM_regie
    };

    this.templateApiService.saveTemplateData(dataToSave)
      .subscribe(({ success, entite }: any) => {
        if (success) {
          this.budgets = entite;
          console.log('hahowa entite', entite);
        }
      });

    this.toppings.reset();
  }













  // getTotalCTB(): number {
  //   const totalCTB1 = this.sommeExternes1;
  //   return Number(totalCTB1.toFixed(2));
  // }
  // getTotalCTB1(): number {
  //   const totalCTB = this.sommeExternes1 + this.sommeregie1 +this.sommeinterne1;
  //   return Number(totalCTB.toFixed(2));
  // }




/// project
// onSubmitproject() {
//   if (this.projetForm) {
//     const projetData = this.projetForm.value; // Get the form data as a regular JS object

//     // const programme_id = this.
//     console.log(projetData);


//   }
// }

fetchLeads() {
  this.morassService.getlead().subscribe(
    (leads: any) => {
      this.leads = leads.lead;
      console.log('Fetched leads:', leads.lead);
           this.leads=leads.lead
    }
  );
}


fetchenjuex() {
  this.morassService.getenjeux().subscribe(
    (Enjeuxs: any) => {
      this.Enjeuxs = Enjeuxs.enjeux;
      console.log('Fetched Enjeux:', Enjeuxs.enjeux);
           this.Enjeuxs=Enjeuxs.enjeux
    }
  );
}



fetchnature() {
  this.morassService.getnature().subscribe(
    (natures: any) => {
      this.natures = natures.natureProgramme;
      console.log('Fetched natures:', natures.nature_programme);
           this.natures=natures.nature_programme
    }
  );
}


fetchpriorite() {
  this.morassService.getpriorite().subscribe(
    (Priorites: any) => {
      this.Priorites = Priorites.priorite;
      console.log('Fetched Priorites:', Priorites.priorite);
           this.Priorites=Priorites.priorite
    }
  );
}

fetchtype() {
  this.morassService.gettypeAgile().subscribe(
    (Typeagiles: any) => {
      this.Typeagiles = Typeagiles.type_agile;
      console.log('Fetched Typeagiles:', Typeagiles.type_agile);
           this.Typeagiles=Typeagiles.type_agile
    }
  );
}


fetchinvestisement() {
  this.morassService.getinvestisement().subscribe(
    (investisements: any) => {
      this.investisements = investisements.type_investisement;
      console.log('Fetched investisements:', investisements.type_investisement);
           this.investisements=investisements.type_investisement
    }
  );
}


fetchprogramme() {
  this.morassService.getprogramme().subscribe(
    (programmes: any) => {
      this.programmes = programmes.programme;
      console.log('Fetched programme:', programmes.programme);
           this.programmes=programmes.programme
    }
  );
}






// onSubmitprojectpopup() {
//   if (this.poppupprojetForm.invalid) {
//     return;
//   }
//   const formData = this.poppupprojetForm.value;

//    if (formData.typeAgileData == '') {
//       console.log('annee vide');

//     }else{
//   const typeAgileData: TypeAgile = this.poppupprojetForm.value;
//   console.log("typeAgile",typeAgileData)
//   this.templateApiService.createTypeAgile(typeAgileData).subscribe(
//     (createdTypeAgile: TypeAgile) => {
//       console.log("Created Type Agile:", createdTypeAgile);
//     }
//   );
// }
//   const leaddata: Lead = this.poppupprojetForm.value;
//   console.log("lead",leaddata)
//   this.templateApiService.createlead(leaddata).subscribe(
//     (createdlead: Lead) => {
//       console.log("Created lead:", createdlead);
//     }
//   );

//   const Enjeuxdata: Enjeux = this.poppupprojetForm.value;
//   console.log("Enjeux",Enjeuxdata)
//   this.templateApiService.createenjeux(Enjeuxdata).subscribe(
//     (createdenjeux: Enjeux) => {
//       console.log("Created enjeux:", createdenjeux);
//     }
//   );



//   const naturedata: NatureProgramme = this.poppupprojetForm.value;
//   console.log("NatureProgramme",naturedata)
//   this.templateApiService.createNature(naturedata).subscribe(
//     (creatednature: NatureProgramme) => {
//       console.log("Created nature:", creatednature);
//     }
//   );



//   const Prioritedata: Priorite = this.poppupprojetForm.value;
//   console.log("Priorite",Prioritedata)
//   this.templateApiService.createPriorite(Prioritedata).subscribe(
//     (createdPriorite: Priorite) => {
//       console.log("Created Priorite:", createdPriorite);
//     }
//   );






//   const investisementdata: TypeInvestisement = this.poppupprojetForm.value;
//   console.log("Investisement",investisementdata)
//   this.templateApiService.createInvestisement(investisementdata).subscribe(
//     (createdInvestisement: TypeInvestisement) => {
//       console.log("Created Investisement:", createdInvestisement);
//     }
//   );


//   const programmedata: Programme = this.poppupprojetForm.value;
//   console.log("programme",programmedata)
//   this.templateApiService.createprogramme(programmedata).subscribe(
//     (createdprogramme: Programme) => {
//       console.log("Created programme:", createdprogramme);
//     }
//   );


// }






onSubmitprojectpopup() {
  if (this.poppupprojetForm.invalid) {
    return;
  }

  const formData = this.poppupprojetForm.value;

  // Check if 'typeAgileData' field is empty
  if (formData.nom == '') {
    console.log('typeAgileData vide');
  } else {
    const typeAgileData: TypeAgile = formData;
    console.log("typeAgile", typeAgileData);
    this.templateApiService.createTypeAgile(typeAgileData).subscribe(
      (createdTypeAgile: TypeAgile) => {
        console.log("Created Type Agile:", createdTypeAgile);
      }
    );
  }

  // Check if 'leaddata' field is empty
  if (formData.nomLe == '') {
    console.log('leaddata vide');
  } else {
    const leaddata: Lead = formData;
    console.log("lead", leaddata);
    this.templateApiService.createlead(leaddata).subscribe(
      (createdlead: Lead) => {
        console.log("Created lead:", createdlead);
      }
    );
  }

  // Continue checking and creating other types of data...

  // Check if 'enjeuxData' field is empty
  if (formData.nomEn =='') {
    console.log('enjeuxData vide');
  } else {
    const enjeuxData: Enjeux = formData;
    console.log("enjeuxData", enjeuxData);
    this.templateApiService.createenjeux(enjeuxData).subscribe(
      (createdEnjeux: Enjeux) => {
        console.log("Created enjeux:", createdEnjeux);
      }
    );
  }

  // Check if 'natureData' field is empty
  if (formData.nomNt =='') {
    console.log('natureData vide');
  } else {
    const natureData: NatureProgramme = formData;
    console.log("natureData", natureData);
    this.templateApiService.createNature(natureData).subscribe(
      (createdNature: NatureProgramme) => {
        console.log("Created nature:", createdNature);
      }
    );
  }

  // Continue checking and creating other types of data...

  // Check if 'prioriteData' field is empty
  if (formData.nomPr =='') {
    console.log('prioriteData vide');
  } else {
    const prioriteData: Priorite = formData;
    console.log("prioriteData", prioriteData);
    this.templateApiService.createPriorite(prioriteData).subscribe(
      (createdPriorite: Priorite) => {
        console.log("Created priorite:", createdPriorite);
      }
    );
  }

  // Continue checking and creating other types of data...

  // Check if 'investisementData' field is empty
  if (formData.nominvestisement == '') {
    console.log('investisementData vide');
  } else {
    const investisementData: TypeInvestisement = formData;
    console.log("investisementData", investisementData);
    this.templateApiService.createInvestisement(investisementData).subscribe(
      (createdInvestisement: TypeInvestisement) => {
        console.log("Created investisement:", createdInvestisement);
      }
    );
  }

  // Continue checking and creating other types of data...

  // Check if 'programmeData' field is empty
  if (formData.nomprog =='') {
    console.log('programmeData vide');
  } else {
    const programmeData: Programme = formData;
    console.log("programmeData", programmeData);
    this.templateApiService.createprogramme(programmeData).subscribe(
      (createdProgramme: Programme) => {
        console.log("Created programme:", createdProgramme);
      }
    );
  }
  this.poppupprojetForm.reset();

  this.router.navigate(['/Parametr']);
  Swal.fire({
    icon: 'success',
    title: 'Form Submitted!',
    text: 'Your form has been successfully submitted.',
  });


}








}

