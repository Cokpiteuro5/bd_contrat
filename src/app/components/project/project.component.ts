import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BudgetCtb } from 'src/app/models/BudgetCtb.model';
import { Lead } from 'src/app/models/Lead.model';
import { NatureProgramme } from 'src/app/models/NatureProgramme.model';
import { Priorite } from 'src/app/models/Priorite.model';
import { Programme } from 'src/app/models/Programme.model';
import { TypeAgile } from 'src/app/models/TypeAgile.model';
import { TypeInvestisement } from 'src/app/models/TypeInvestisement.model';
import { Enjeux } from 'src/app/models/enjeux.model';
import { Entite } from 'src/app/models/entite.model';
import { Projet } from 'src/app/models/projet.model';
import { MorassService } from 'src/app/service/morass.service';
import { PopUpService } from '../tables-data/services/pop-up.service';
import { BudgetService } from 'src/app/service/budget.service';
import { SharedServiceService } from 'src/app/services/shared/shared-service.service';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  userprofil = null ;
  projetForm: FormGroup ;
  // toppings: FormGroup;
  // yourFormCTB:FormGroup
  poppupprojetForm!:FormGroup;

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


  //  LES Options

   montantOptions: Lead[] = []
   TypeOptions:TypeAgile[]=[]
   enjeuxOptions:Enjeux[]=[]
   PrioriteOptions:Priorite[]=[]
 natureOptions:NatureProgramme[]=[]
 investisementOptions:TypeInvestisement[]=[]
 programmetOptions:Programme[]=[]
 solitionOptions:Entite[] = [];
 selectedProgrammeId = null ;
 initiative = '' ;

  constructor( private elementRef: ElementRef,
    private morassService: MorassService,
    private router: Router,
    private popupService: PopUpService,
    private route: ActivatedRoute,
    private sharedService: SharedServiceService,

    private templateApiService: BudgetService,
    private formBuilder: FormBuilder,
    private _formBuilder: FormBuilder) {



      // {
      //   this.toppings = this._formBuilder.group({
      //    nom: '',
      //    interne: null,
      //    externe: null,
      //    regie: null,
      //    type: false,
      //   TJM_interne:null,
      //   TJM_externe:null,
      //   TJM_regie:null,

      //  });
      // }

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

     }

  ngOnInit(){

    this.sharedService.selectedProgrammeId$.subscribe((id : any) => {
      this.selectedProgrammeId = id;
      // Do something with the received data
    });

    this.sharedService.libelleInitiative$.subscribe((libelle : any) => {
      this.initiative = libelle;
      // Do something with the received data
    });
    const userString = localStorage.getItem('user');



  if (userString) {
    const user = JSON.parse(userString);

    this.userprofil = user.profil.nom
  }



this.fetchBudgets();
this.fetchLeads();
this. fetchtype();
this.fetchenjuex();
this.fetchnature();
this.fetchpriorite();
this.fetchinvestisement();
this.fetchprogramme();
}



  onSubmitprojectpopup() {
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
    clearPopupData() {
      // this.loading = false;
      }
      fetchBudgets() {
        this.morassService.getTemplateData().subscribe(
          (response: any) => {
            this.budgets = response.entite;
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









        ///
        onSubmitproject() {
          if (this.projetForm) {
            const projetData = this.projetForm.value; // Get the form data as a regular JS object
            console.log(' new data by input is : ', this.selectedProgrammeId , ' new nom by input is : ',  this.initiative);

        console.log(projetData);


        this.morassService.createProjet({

          nom: this.initiative, // Access the 'nom' property
          programme_id: this.selectedProgrammeId,
          enjeux_id: this.projetForm.value.enjeux_id,
          ref_wave_id: this.projetForm.value.ref_wave_id,
          lead_id: this.projetForm.value.lead_id,
          annee_id: this.projetForm.value.annee_id,
          phase_id: this.projetForm.value.phase_id,
          type_investisement_id: this.projetForm.value.type_investisement_id,
          priorite_id: this.projetForm.value.priorite_id,
          nature_programme_id: this.projetForm.value.nature_programme_id,
          type_agile_id: this.projetForm.value.type_agile_id,
          type: 'initiative',
          sdi: this.projetForm.value.sdi,
          top_15: this.projetForm.value.top_15,
          filiale: this.projetForm.value.filiale,
          reconduction_annee_prochaine: this.projetForm.value.reconduction_annee_prochaine,
          initiative_anne_en_cours: this.projetForm.value.initiative_anne_en_cours,
          urban_sociale_techno: this.projetForm.value.urban_sociale_techno,
          hors_feuille_de_route: this.projetForm.value.hors_feuille_de_route,
          transverse: this.projetForm.value.transverse,
          action_en_cours: this.projetForm.value.action_en_cours,
          dematerialisation: this.projetForm.value.dematerialisation,
          digital: this.projetForm.value.digital,
          description: this.projetForm.value.description,
          actions: this.projetForm.value.actions,
          copro_1: this.projetForm.value.copro_1,
          copro_2: this.projetForm.value.copro_2,
          date_lancement: this.projetForm.value.date_lancement,
          date_cloture: this.projetForm.value.date_cloture,
          ref_sciforma: this.projetForm.value.ref_sciforma
        }).subscribe(
          (createdProjet: any) => {
            console.log('Projet created successfully:', createdProjet.projet);

            console.log("ana hna", createdProjet.projet.id);

            try {
              console.log("Before navigation");
              this.router.navigate(['/tables-data/budget',createdProjet.projet.id]);
              console.log("After navigation");
            } catch (error) {
              console.log("Error while navigating:", error);
            }
            // Redirect to a new route with the created project's ID
         }
        );

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
          this.investisements = programmes.programme;
          console.log('Fetched programme:', programmes.programme);
               this.programmetOptions=programmes.programme
        }
        );
        }






  }
























































































