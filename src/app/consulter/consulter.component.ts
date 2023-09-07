import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges,Input } from '@angular/core';
import { Entite } from '../models/entite.model';
import { BudgetService } from '../service/budget.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MorassService } from '../service/morass.service';
import { ApiProgramme, Programme } from '../models/Programme.model';
import { Projet } from '../models/projet.model';
import { TypeInvestisement } from '../models/TypeInvestisement.model';
import { Lead } from '../models/Lead.model';
import { TypeAgile } from '../models/TypeAgile.model';
import { Enjeux } from '../models/enjeux.model';
import { Priorite } from '../models/Priorite.model';
import { NatureProgramme } from '../models/NatureProgramme.model';

@Component({
  selector: 'app-consulter',
  templateUrl: './consulter.component.html',
  styleUrls: ['./consulter.component.css']
})
export class ConsulterComponent implements OnInit  {

  fetchedEntites: any[] = []; // Initialize as an empty array


  selectedProjectName: string | undefined;
  showCaracteristiquesForm = false;
  programmes: Programme[] = [];
  selectedEntite: any = []; // Declare the property
  investisements:TypeInvestisement[]=[];
  leads: Lead[] = [];
  Typeagiles:TypeAgile[]=[];
  Enjeuxs:Enjeux[]=[];
Priorites:Priorite[]=[];
natures:NatureProgramme[]=[];


  entite:any;
  // projet: any = {}; // Initialize the projet object

  intiveOptions: Projet[] = [];
  // projet: Projet[] = [];


  myForm: FormGroup;
  projetForm : FormGroup
  budgets:  Entite[]=[];
  // intiveOptions:any=[];
  constructor(
    private cdRef: ChangeDetectorRef,
    private morassService: MorassService,
    private router: Router,
    private route: ActivatedRoute,

    private templateApiService: BudgetService,
    private formBuilder: FormBuilder,
    private _formBuilder: FormBuilder) {
      this.myForm = this.formBuilder.group({
        selectedId: [''] // Use a different form control for the selected ID
      });
      this.projetForm = this._formBuilder.group({


        programme_id: '',
        ref_wave_id: '',
        lead_id: [''],
        annee_id: '',
        enjeux_id: '',
        phase_id: '',
        type_investisement_id: '', // Make sure it's an empty string or set it to the appropriate initial value
        priorite_id: '',
        nature_programme_id: '',
        type_agile_id: '',
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
        date_lancement: '',
        date_cloture: '',
        ref_sciforma: '',
        });

     }

  ngOnInit(): void {
    this.onInitiativeSelected();
    // this.fetchBudgets();
    this.fetchprogramme();
    // this.fetchProjects();



  }

  // fetchBudgets() {
  //   this.morassService.getTemplateData().subscribe(
  //     (response: any) => {
  //       this.budgets = response.entite;
  //      this.intiveOptions = response.entite;
  //       console.log("this.intiveOptions conslter" ,this.intiveOptions );





  //     },

  //   );
  // }



  nomprog : Programme[] = []
    fetchprogramme() {
    this.morassService.getprogramme().subscribe(
      (prog: any) => {
        this.programmes = prog.programme
        console.log('Fetched programme11:', this.programmes);


      }
    );
  }
















  // fetchIntiveOptions() {
  //   this.morassService.getTemplateData().subscribe(
  //     (entites: Entite[]) => {
  //       this.intiveOptions = entites;
  //     }
  //   );
  // }

  idinitiative  = null;



  leadd  = '';
  Enjexx='';
  Nature='';
  typeA='';
  Priorite='';
  anne='';
  wave='';
  sciforma="";
  investisement='';
  copro1="";
  copro2="";
  data="";
  sdi = false;
top_15 = false;
transverse = false;
date_cloture = "";
date_lancement = "";
deletedAt = "";
dematerialisation = false;
description = "";
digital = false;
hors_feuille_de_route = false;
type="";
fetchProjects(id : number): void {
  this.morassService.getAllProjects().subscribe(
    (projects: any) => {
      this.intiveOptions = projects.projet.filter((option: any) => option.programme_id == id);
      console.log('Fetched Projects:', this.intiveOptions);
    }
  );
}
onProgrammeSelected(event: any) {
  const selectedProgramId = event.target.value;
  console.log('Selected Program ID:', selectedProgramId);

  this.fetchProjects(selectedProgramId)
  console.log('Filtered Options:', this.intiveOptions);
}

  // fetchProjects(): void {
  //   this.morassService.getAllProjects().subscribe(
  //     (projects: any) => {
  //       this.intiveOptions = projects.projet ;
  //       console.log('Fetched Projects:', this.intiveOptions);
  //     }
  //   );
  // }


  // onInitiativeSelected() {
  //   const selectedId = this.myForm.get('selectedId')?.value;

  //   if (selectedId) {
  //     this.morassService.getoneproject(selectedId).subscribe(
  //       (projectData: any) => {
  //         console.log('Received Project Data:', projectData);


  //         const selectedOption = this.intiveOptions.find(option => option.id === selectedId);
  //         if (selectedOption) {
  //           selectedOption.nom = projectData.nom;




  //           this.projetForm.patchValue({
  //             lead_id: projectData.lead_id,
  //             enjeux_id: projectData.enjeux_id,
  //             nature_programme_id: projectData.nature_programme_id,
  //             // ... other fields
  //           });




  //           console.log('Updated Form Values:', this.projetForm.value);
  //         }
  //       }
  //     );
  //   }
  // }






idprojet : any

  onInitiativeSelected() {
    const selectedId = this.myForm.get('selectedId')?.value;

    this.idprojet = selectedId


    if (selectedId) {
      this.morassService.getoneproject(selectedId).subscribe(
        (projectData: any) => {
          console.log('Received Project Data:', projectData);

          const selectedEntite = projectData.projet[0]; // Assuming there's only one entity in the array

          this.leadd = selectedEntite.lead?.nomLe || '';
          this.Enjexx = selectedEntite.enjeux?.nomEn || '';
          this.Nature = selectedEntite.nature_programme?.nomNt || '';
          this.typeA = selectedEntite.type_agile?.nom || '';
          this.Priorite = selectedEntite.priorite?.nomPr || '';
          this.investisement = selectedEntite.type_investisement?.nominvestisement || '';

          this.copro1 = selectedEntite.copro_1 || '';
          this.copro2 = selectedEntite.copro_2 || '';
          this.data = selectedEntite.top_15;

          this.wave = this.selectedEntite.ref_wave;
          this.sciforma = this.selectedEntite.ref_sciforma;
          this.sdi = this.selectedEntite.sdi;
        this.transverse = this.selectedEntite.transverse;
        this.type = this.selectedEntite.type;

          // Assign values from your new data
          this.date_cloture = this.selectedEntite.date_cloture;
          this.date_lancement = this.selectedEntite.date_lancement;
          this.deletedAt = this.selectedEntite.deletedAt;
          this.dematerialisation = this.selectedEntite.dematerialisation;
          this.description = this.selectedEntite.description;
          this.digital = this.selectedEntite.digital;
          this.hors_feuille_de_route = this.selectedEntite.hors_feuille_de_route;


          console.log('lead:', this.leadd);

          this.projetForm.get('lead_id')?.setValue(this.leadd);
          this.projetForm.get('enjeux_id')?.setValue(this.Enjexx);
        this.projetForm.get('nature_programme_id')?.setValue(this.Nature);
        this.projetForm.get('type_agile_id')?.setValue(this.typeA);
        this.projetForm.get('priorite_id')?.setValue(this.Priorite);
        this.projetForm.get('wave')?.setValue(this.wave);
        this.projetForm.get('ref_sciforma')?.setValue(this.sciforma);
        console.log('Investisement:', this.investisement);
        this.projetForm.get('type_investisement_id')?.setValue(this.investisement);

        this.projetForm.get('copro_1')?.setValue(this.copro1);

              this.projetForm.get('copro_2')?.setValue(this.copro2);
              this.projetForm.get('top_15')?.setValue(this.data);
              this.projetForm.get('sdi')?.setValue(this.sdi);
              this.projetForm.get('transverse')?.setValue(this.transverse);
              this.projetForm.get('type')?.setValue(this.type);

              // Set values for the new fields in your form
              this.projetForm.get('date_cloture')?.setValue(this.date_cloture);
              this.projetForm.get('date_lancement')?.setValue(this.date_lancement);
              this.projetForm.get('deletedAt')?.setValue(this.deletedAt);
              this.projetForm.get('dematerialisation')?.setValue(this.dematerialisation);
              this.projetForm.get('description')?.setValue(this.description);
              this.projetForm.get('digital')?.setValue(this.digital);
              this.projetForm.get('hors_feuille_de_route')?.setValue(this.hors_feuille_de_route);


              // const projetId = selectedEntite.projet_id[0]?.id;
              // if (projetId) {
                this.fetchEntitesForProjet(); // Fetch associated entites
              // }
              // this.fetchCtbByProjectId();

              // this.cdRef.detectChanges();


        }
      );
    }

  }



  fetchEntitesForProjet() {
    this.morassService.getEntitesByProjetId(this.idprojet).subscribe(
      (entites: any) => {
        console.log('Fetched Entites tretete:', entites);
        this.fetchedEntites = entites; // Assign fetched data to the property
        this.calculateEntiteForProjet();
        this.calculateSum();
        this.calculateForfaitSum();
      },

      (error) => {
        console.error('Error fetching entites:', error);
      }

    );


}

totalEntiteForProjet = 0
calculateEntiteForProjet() {

  this.totalEntiteForProjet = 0
  for (const entity of this.fetchedEntites) {
    const externeValue = entity.externe || 0;
    const tjmExterneValue = entity.TJM_externe || 0;
    this.totalEntiteForProjet += externeValue * tjmExterneValue;

    console.log('Entity:', entity.nom);
    console.log('externeValue:', externeValue);
    console.log('tjmExterneValue:', tjmExterneValue);
    console.log('Partial Total:', externeValue * tjmExterneValue);
  }

  console.log('Total EntiteForProjet:', this.totalEntiteForProjet);
}




sum=0

calculateSum() {
  this.sum = 0;
  for (const item of this.fetchedEntites) {

      this.sum  += item.regie * item.TJM_regie;


  }
  console.log("somme regie",this.sum )
}
totalForfaitSum=0
calculateForfaitSum(): void {
  this.totalForfaitSum = 0;

  for (const item of this.fetchedEntites) {

      this.totalForfaitSum += item.forfait;

  }
}



}











