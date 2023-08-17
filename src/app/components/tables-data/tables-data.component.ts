import { Component, OnInit, ElementRef, ViewChild, Pipe } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Morass, Pagination, ResMorass, ResMorasses } from 'src/app/models/morass';
import { MorassService } from 'src/app/service/morass.service';
import { PopUpService } from './services/pop-up.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Lead } from 'src/app/models/Lead.model';
import { TypeAgile } from 'src/app/models/TypeAgile.model';
import { Enjeux } from 'src/app/models/enjeux.model';
import { Priorite } from 'src/app/models/Priorite.model';
import { NatureProgramme } from 'src/app/models/NatureProgramme.model';
import { TypeInvestisement } from 'src/app/models/TypeInvestisement.model';
import { Programme } from 'src/app/models/Programme.model';
import { BudgetCtb } from 'src/app/models/BudgetCtb.model';
import { Entite } from 'src/app/models/entite.model';
import { Projet } from 'src/app/models/projet.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PopupprojectComponent } from 'src/app/popupproject/popupproject.component';
import { BudgetService } from 'src/app/service/budget.service';
import { BehaviorSubject } from 'rxjs';
import { Auth } from 'src/app/models/auth';
import { AuthService } from 'src/app/auth.service';




@Component({
  selector: 'app-tables-data',
  templateUrl: './tables-data.component.html',
  styleUrls: ['./tables-data.component.css'],
})
export class TablesDataComponent implements OnInit {

  // Formgroup
  userprofil = null ;
  projetForm: FormGroup ;
  toppings: FormGroup;
  yourFormCTB:FormGroup
  poppupprojetForm:FormGroup;

  total :0 | undefined;
  sommeExternes1: number | undefined;
  sommeregie1:number | undefined;
  sommeinterne1:number | undefined;

  leads: Lead[] = [];
  Typeagiles:TypeAgile[]=[]
  Enjeuxs:Enjeux[]=[]
Priorites:Priorite[]=[]
natures:NatureProgramme[]=[]
investisements:TypeInvestisement[]=[]

   programmes:Programme[]=[]

   showCaracteristiquesForm = false;
  formDataArray:BudgetCtb[] = [];
  budgets:Entite[] = [];
   project:Projet[]=[];

   intiveOptions:Projet[]=[];
  //  LES Options

   montantOptions: Lead[] = []
   TypeOptions:TypeAgile[]=[]
   enjeuxOptions:Enjeux[]=[]
   PrioriteOptions:Priorite[]=[]
 natureOptions:NatureProgramme[]=[]
 investisementOptions:TypeInvestisement[]=[]
 programmetOptions:Programme[]=[]
 solitionOptions:Entite[] = [];


  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;
  fileSelected: boolean = false;
  selectedFile: File | null = null;
  uploadProgress: number = 0;

  p: number = 1;
  itemsPerPage: number = 10;

  onPageChange(pageNumber: number) {
    this.p = pageNumber;
  }

  onItemsPerPageChange() {
    this.p = 1; // Reset the page number to 1 when the items per page is changed
  }
  authData: Auth | null = null;



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
      this.toppings = this._formBuilder.group({
       nom: '',
       interne: null,
       externe: null,
       regie: null,
       type: false,
      TJM_interne:null,
      TJM_externe:null,
      TJM_regie:null,
      projet_id:null,

     });


    }{
      this.poppupprojetForm = this.formBuilder.group({
        nom: [''],
        nomLe: [''],
        nomEn: ['' ],
        nomPr: [''],
        nomNt: [''],
        nominvestisement: [''],
        nomprog: [''],


      });
    }

  {
  this.projetForm = this._formBuilder.group({
    nom: '',
    programme_id: null,
    user_id: null,
    ref_wave_id: null,
    lead_id: null,
    annee_id: null,
    enjeux_id: null,
    phase_id: null,
    type_investisement_id: null,
    priorite_id: null,
    nature_programme_id: null,
    type_agile_id: null,
    type: false,
    sdi: false,
    top_15: false,
    filiale: false,
    reconduction_annee_prochaine: false,
    initiative_anne_en_cours: false,
    urban_sociale_techno: false,
    hors_feuille_de_route: false,
    transverse: false,
    action_en_cours: false,
    dematerialisation: false,
    digital: false,
    description: '',
    actions: '',
    copro_1: '',
    copro_2: '',
    date_lancement: null,
    date_cloture: null,
    ref_sciforma: '',
  });
  }
{
  this.yourFormCTB = this.formBuilder.group({
    nom: ['', Validators.required],
    sans_interne: [null, Validators.required],


  });
}


  }
  ngOnInit() {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);

      this.userprofil = user.profil.nom
    }

    // this.initForm();
    this.fetchBudgets();
    this.fetchctb();
    this.fetchLeads();
    this. fetchtype();
    this.fetchenjuex();
    this.fetchnature();
    this.fetchpriorite();
    this.fetchinvestisement();
    this.fetchprogramme();
    this.fetchProjet();
  }





// initForm() {

// }
















  // onSavepopupadmin() {
  //   const {nom, interne, externe, regie, type, montant_id, projet_id , TJM_interne,TJM_externe, TJM_regie} = this.toppings.value;

  //   if (regie == null) {
  //     const newtype =  type == true
  //     console.log('regie null' , newtype);
  //     console.log('GEThj',{nom, interne, externe, regie, type, montant_id, projet_id, TJM_interne,TJM_externe, TJM_regie });


  //     this.templateApiService.saveTemplateData({nom, interne, externe, regie, type : newtype, montant_id, projet_id , TJM_interne,TJM_externe, TJM_regie}).subscribe(({success, entite}: any) => {
  //     console.log(entite);


  //       if(success) {

  //         this.budgets = entite;
  //         console.log('true entite with id project' , entite);




  //       }
  //     })

  //   }else {

  //       console.log('false');

  //     const newtype =  type == false

  //     console.log('regie not null' ,  );
  //       this.templateApiService.saveTemplateData({ nom, interne, externe, regie, type : newtype, montant_id, projet_id , TJM_interne,TJM_externe, TJM_regie}).subscribe(({success, entite}: any) => {

  //       })
  //   }


  // }

  onSavepopupadmin() {
    const {
      nom,
      interne,
      externe,
      regie,
      type,
      montant_id,
      projet_id,
      TJM_interne,
      TJM_externe,
      TJM_regie
    } = this.toppings.value;

    if (regie == null) {
      const newtype = type === true; // corrected logic here
      console.log('regie null', newtype);
      console.log('GEThj', {
        nom,
        interne,
        externe,
        regie,
        type,
        montant_id,
        projet_id,
        TJM_interne,
        TJM_externe,
        TJM_regie
      });

      this.templateApiService
        .saveTemplateData({
          nom,
          interne,
          externe,
          regie,
          type: newtype,
          montant_id,
          projet_id,
          TJM_interne,
          TJM_externe,
          TJM_regie
        })
        .subscribe(({ success, entite }: any) => {
          if (success) {
            this.budgets = entite;
            console.log('true entite with id project', entite);
          }
        });
    } else {
      console.log('false');
      const newtype = type === false; // corrected logic here

      console.log('regie not null', newtype);
      this.templateApiService
        .saveTemplateData({
          nom,
          interne,
          externe,
          regie,
          type: newtype,
          montant_id,
          projet_id,
          TJM_interne,
          TJM_externe,
          TJM_regie
        })
        .subscribe(({ success, entite }: any) => {
          // handle the response if needed
        });
    }
  }



  downloadTemplate() {
    this.morassService.downloadExcel().subscribe(blob => {
      this.morassService.saveExcelFile(blob, 'Budgetaire_Template.xlsx');
    }, error => {
      console.error(error);
    });
  }


  destroyMorass(id: string) {
    // const confirmation = window.confirm('Are you sure you want to delete this item?');

    // if (confirmation) {
    //   this.morassService.deleteMorass(id).subscribe(res => {
    //     this.morass = res.budgetaires;
    //     this.getAllM();
    //   });
    // }
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



  clearPopupData() {
    this.selectedFile = null;
    this.fileSelected = false;

    // Set the loading flag back to false when clearing the popup data
    // this.loading = false;
  }













  fetchBudgets() {
    this.morassService.getTemplateData().subscribe(
      (response: any) => {
        this.solitionOptions = response.entite;
        console.log("jh" ,response.entite );



        const externesArray = response.map((b: any) => b.externe);
        console.log(externesArray);
        const sommeExternes = externesArray.reduce((acc: any, externe: any) => acc + externe, 0);
        this.sommeExternes1 = sommeExternes;
        console.log(this.sommeExternes1, 'le total externe');

        const rigieArray = response.map((b: any) => b.regie);
        console.log(rigieArray);
        const sommeregie = rigieArray.reduce((acc: any, regie: any) => acc + regie, 0);
        this.sommeregie1 = sommeregie * 4.29;
        console.log(this.sommeregie1, 'le total regie');
      },
      (error: any) => {
        // Handle the error if needed
        console.error('Error fetching template data:', error);
      }
    );
  }

  fetchctb() {
    this.morassService.getBudgetCtb().subscribe(
      ({ success, budget_ctb }: any) => {
        console.log('ctb get:', success, budget_ctb);

        if (success && budget_ctb) {
          this.formDataArray = budget_ctb;
          console.log('ctbsave', budget_ctb);

          // Loop through each object in the array to access 'nom' and 'sans_interne'
          for (const data of budget_ctb) {
            const { nom, sans_interne } = data;

          }

          // If you want to work with the 'sans_interne' values in an array for further processing
          const interneArray = budget_ctb.map((data: any) => data.sans_interne);
          console.log('Interne Array:', interneArray);

          const sommeinterne = interneArray.reduce((acc: number, sans_interne: number) => acc + sans_interne, 0);
          this.sommeinterne1 = sommeinterne;
          console.log('Somme Interne:', this.sommeinterne1);
        }
      }
    );
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
onSubmitproject() {
  if (this.projetForm) {
    const projetData = this.projetForm.value; // Get the form data as a regular JS object

    // const programme_id = this.
    console.log(projetData);



    // this.morassService.createProjet(projetData).subscribe(
    //   (createdProjet: any) => {
    //     console.log('Projet created successfully:', createdProjet);
    //     // Perform any other actions upon successful creation
    //   }
    // );
  }
}

fetchLeads() {
  this.morassService.getlead().subscribe(
    (leads: any) => {
      this.leads = leads.lead;
      console.log('Fetched leads:', leads.lead);
           this.montantOptions=leads.lead
    }
  );
}


fetchenjuex() {
  this.morassService.getenjeux().subscribe(
    (Enjeuxs: any) => {
      this.Enjeuxs = Enjeuxs.enjeux;
      console.log('Fetched Enjeux:', Enjeuxs.enjeux);
           this.enjeuxOptions=Enjeuxs.enjeux
    }
  );
}



fetchnature() {
  this.morassService.getnature().subscribe(
    (natures: any) => {
      this.natures = natures.natureProgramme;
      console.log('Fetched natures:', natures.nature_programme);
           this.natureOptions=natures.nature_programme
    }
  );
}


fetchpriorite() {
  this.morassService.getpriorite().subscribe(
    (Priorites: any) => {
      this.Priorites = Priorites.priorite;
      console.log('Fetched Priorites:', Priorites.priorite);
           this.PrioriteOptions=Priorites.priorite
    }
  );
}

fetchtype() {
  this.morassService.gettypeAgile().subscribe(
    (Typeagiles: any) => {
      this.Typeagiles = Typeagiles.type_agile;
      console.log('Fetched Typeagiles:', Typeagiles.type_agile);
           this.TypeOptions=Typeagiles.type_agile
    }
  );
}


fetchinvestisement() {
  this.morassService.getinvestisement().subscribe(
    (investisements: any) => {
      this.investisements = investisements.type_investisement;
      console.log('Fetched investisements:', investisements.type_investisement);
           this.investisementOptions=investisements.type_investisement
    }
  );
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






onSubmitprojectpopup() {
  if (this.poppupprojetForm.invalid) {
    return;
  }

  const typeAgileData: TypeAgile = this.poppupprojetForm.value;
  console.log("typeAgile",typeAgileData)
  this.templateApiService.createTypeAgile(typeAgileData).subscribe(
    (createdTypeAgile: TypeAgile) => {
      console.log("Created Type Agile:", createdTypeAgile);
    }
  );

  const leaddata: Lead = this.poppupprojetForm.value;
  console.log("lead",leaddata)
  this.templateApiService.createlead(leaddata).subscribe(
    (createdlead: Lead) => {
      console.log("Created lead:", createdlead);
    }
  );

  const Enjeuxdata: Enjeux = this.poppupprojetForm.value;
  console.log("Enjeux",Enjeuxdata)
  this.templateApiService.createenjeux(Enjeuxdata).subscribe(
    (createdenjeux: Enjeux) => {
      console.log("Created enjeux:", createdenjeux);
    }
  );



  const naturedata: NatureProgramme = this.poppupprojetForm.value;
  console.log("NatureProgramme",naturedata)
  this.templateApiService.createNature(naturedata).subscribe(
    (creatednature: NatureProgramme) => {
      console.log("Created nature:", creatednature);
    }
  );



  const Prioritedata: Priorite = this.poppupprojetForm.value;
  console.log("Priorite",Prioritedata)
  this.templateApiService.createPriorite(Prioritedata).subscribe(
    (createdPriorite: Priorite) => {
      console.log("Created Priorite:", createdPriorite);
    }
  );






  const investisementdata: TypeInvestisement = this.poppupprojetForm.value;
  console.log("Investisement",investisementdata)
  this.templateApiService.createInvestisement(investisementdata).subscribe(
    (createdInvestisement: TypeInvestisement) => {
      console.log("Created Investisement:", createdInvestisement);
    }
  );


  const programmedata: Programme = this.poppupprojetForm.value;
  console.log("programme",programmedata)
  this.templateApiService.createprogramme(programmedata).subscribe(
    (createdprogramme: Programme) => {
      console.log("Created programme:", createdprogramme);
    }
  );


}

// onSaveCTB() {
//     // Extract form values
//     const { nom, sans_interne } = this.yourFormCTB.value;

//     this.templateApiService.saveBudgetCtb({ nom, sans_interne }).subscribe(
//       (response: BudgetCtb) => {
//         // Since the API directly returns the BudgetCtb object, handle it directly
//         this.formDataArray = [response];
//         console.log('hero', response);

//       },
//       (error: any) => {
//         // Handle error if needed
//       }
//     );
//   }










  fetchProjet(): void {
    this.morassService.getProjet().subscribe(
      (data : any) => {
        this.intiveOptions = data.projet;
        console.log("projet her",data.projet)
      }
    );
  }






}
















