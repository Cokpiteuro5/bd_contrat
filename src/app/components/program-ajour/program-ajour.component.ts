import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Programme } from 'src/app/models/Programme.model';
import { Projet } from 'src/app/models/projet.model';
import { BudgetService } from 'src/app/service/budget.service';
import { MorassService } from 'src/app/service/morass.service';
import { MettreService } from 'src/app/components/tables-data/services/mettre.service';


@Component({
  selector: 'app-program-ajour',
  templateUrl: './program-ajour.component.html',
  styleUrls: ['./program-ajour.component.css']
})
export class ProgramAjourComponent implements OnInit {
  myForm: FormGroup; // Declare the myForm property

  programmes: Programme[] = [];
  intiveOptions: Projet[] = [];
  projetForm : FormGroup;



  constructor(private MettreService: MettreService,
    private morassService: MorassService,
    private router: Router,
    private route: ActivatedRoute,

    private templateApiService: BudgetService,
    private formBuilder: FormBuilder,
    private _formBuilder: FormBuilder) {
      this.projetForm = this._formBuilder.group({


        programme_id: '',
        ref_wave_id: '',
        lead_id: [],
        annee_id: '',
        enjeux_id: [],
        phase_id: '',
        type_investisement_id: '',
        priorite_id: '',
        nature_programme_id: [''], // This line should match your form control
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

      this.myForm = this.formBuilder.group({
        selectedId: [''] // Use a different form control for the selected ID
      });
    }

  ngOnInit() {
    this.fetchprogramme();
  }







  onProgrammeSelected(event: any) {
    const selectedProgramId = event.target.value;
    console.log('Selected Program ID:', selectedProgramId);

    this.fetchProjects(selectedProgramId)
    console.log('Filtered Options:', this.intiveOptions);
  }


  fetchProjects(id : number): void {
    this.morassService.getAllProjects().subscribe(
      (projects: any) => {
        this.intiveOptions = projects.projet.filter((option: any) => option.programme_id == id);
        console.log('Fetched Projects:', this.intiveOptions);
      }
    );
  }


  nomprog : Programme[] = []
    fetchprogramme() {
    this.morassService.getprogramme().subscribe(
      (prog: any) => {
        this.programmes = prog.programme
        console.log('Fetched programme11:', this.programmes);


      }
    );
  }


  idinitiative  = null;




  leadd  = [];
  Enjexx= [];
  Nature=[];
  typeA=[];
  Priorite=[];
  anne='';
  wave='';
  sciforma="";
  investisement=[];
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
  // type="";

  selectedEntite: any = []; // Declare the property
  idprojet : any

  idprogramme:any
  onInitiativeSelected() {
    const selectedId = this.myForm.get('selectedId')?.value;

    this.idprojet = selectedId


    if (selectedId) {
      this.morassService.getoneproject(selectedId).subscribe(
        (projectData: any) => {
          console.log('Received Project Data:', projectData);

          this.idprogramme = projectData.projet.programme_id

          const selectedEntite = projectData.projet[0]; // Assuming there's only one entity in the array

          this.leadd = selectedEntite.lead?.id  ;

          this.Enjexx = selectedEntite.enjeux?.id ;
          this.Nature = selectedEntite.nature_programme?.id ;
          this.typeA = selectedEntite.type_agile?.id ;
          this.Priorite = selectedEntite.priorite?.id ;

          this.copro1 = selectedEntite.copro_1 || '';
          this.copro2 = selectedEntite.copro_2 || '';
          this.data = selectedEntite.top_15;

          this.wave = this.selectedEntite.ref_wave;
          this.sciforma = this.selectedEntite.ref_sciforma;
          this.investisement = selectedEntite.type_investisement?.id ;

          this.sdi = this.selectedEntite.sdi;
        this.transverse = this.selectedEntite.transverse;
        // this.type = this.selectedEntite.type;

        // Assign values from your new data
        this.date_cloture = this.selectedEntite.date_cloture;
        this.date_lancement = this.selectedEntite.date_lancement;
        this.deletedAt = this.selectedEntite.deletedAt;
        this.dematerialisation = this.selectedEntite.dematerialisation;
        this.description = this.selectedEntite.description;
        this.digital = this.selectedEntite.digital;
        this.hors_feuille_de_route = this.selectedEntite.hors_feuille_de_route;




        this.projetForm.get('lead_id')?.setValue(this.leadd);
        this.projetForm.get('enjeux_id')?.setValue(this.Enjexx);
        this.projetForm.get('nature_programme_id')?.setValue(this.Nature);
        this.projetForm.get('type_agile_id')?.setValue(this.typeA);
        this.projetForm.get('priorite_id')?.setValue(this.Priorite);
        this.projetForm.get('wave')?.setValue(this.wave);
        this.projetForm.get('ref_sciforma')?.setValue(this.sciforma);
        this.projetForm.get('type_investisement_id')?.setValue(this.investisement);

        this.projetForm.get('copro_1')?.setValue(this.copro1);

        this.projetForm.get('copro_2')?.setValue(this.copro2);
        this.projetForm.get('top_15')?.setValue(this.data);
        this.projetForm.get('sdi')?.setValue(this.sdi);
        this.projetForm.get('transverse')?.setValue(this.transverse);
        // this.projetForm.get('type')?.setValue(this.type);

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
          // this.fetchEntitesForProjet();
          // this.fetchCtbByProjectId();

        console.log(this.leadd ,'lleeeqqdd');



        }
      );
      this.MettreService.onInitiativeSelected(selectedId);


    }




  }
//   fetchEntitesForProjet() {
//     this.morassService.getEntitesByProjetId(this.idprojet).subscribe(
//       (entites: any) => {
//         console.log('Fetched Entites tretete:', entites);
//         this.fetchedEntites = entites; // Assign fetched data to the property
//         this.calculateTotal();
//         this.calculateEntiteForProjet();
//         this.calculateTotalForfait();
//       },

//       (error) => {
//         console.error('Error fetching entites:', error);
//       }

//     );




// }

}
