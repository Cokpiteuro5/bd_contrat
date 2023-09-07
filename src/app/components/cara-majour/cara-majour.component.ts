import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Lead } from 'src/app/models/Lead.model';
import { NatureProgramme } from 'src/app/models/NatureProgramme.model';
import { Priorite } from 'src/app/models/Priorite.model';
import { TypeAgile } from 'src/app/models/TypeAgile.model';
import { TypeInvestisement } from 'src/app/models/TypeInvestisement.model';
import { Enjeux } from 'src/app/models/enjeux.model';
import { Projet } from 'src/app/models/projet.model';
import { BudgetService } from 'src/app/service/budget.service';
import { MorassService } from 'src/app/service/morass.service';
import { MettreService } from 'src/app/components/tables-data/services/mettre.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-cara-majour',
  templateUrl: './cara-majour.component.html',
  styleUrls: ['./cara-majour.component.css']
})
export class CaraMajourComponent implements OnInit {
  leads: Lead[] = [];
  Enjeuxs:Enjeux[]=[];
  natureOptions:NatureProgramme[]=[]
  Typeagiles:TypeAgile[]=[];
  Priorites:Priorite[]=[];
  investisementOptions:TypeInvestisement[]=[];
  natures:NatureProgramme[]=[];
  selectedEntite: any = []; // Declare the property
  intiveOptions: Projet[] = [];

  projetForm : FormGroup;
  myForm: FormGroup;


  constructor(
    private MettreService:MettreService,
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
      lead_id: [''], // Initialize with selectedProject?.lead_id
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
   }
   selectedProject: Projet | null = null; // Initialize with null

  ngOnInit() {
    this.MettreService.selectedProject$.subscribe((project) => {
      this.selectedProject = project;

      console.log(this.selectedProject, 'this.selectedProject');

      // Use optional chaining to safely access lead_id
      const leadId = this.selectedProject?.lead_id;
      this.projetForm.get('lead_id')?.setValue(leadId);

      console.log('Lead ID:', leadId);
               
    });
    this.fetchLeads() ;
    this.fetchenjuex();
    this.fetchnature() ;
    this.fetchpriorite();
    this.fetchtype();
    this.fetchinvestisement();

  }

  fetchLeads() {
    this.morassService.getlead().subscribe(
    (leads: any) => {
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
          //  this.enjeuxOptions=Enjeuxs.enjeux
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
    }
    );
    }

    fetchtype() {
    this.morassService.gettypeAgile().subscribe(
    (Typeagiles: any) => {
      this.Typeagiles = Typeagiles.type_agile;
      console.log('Fetched Typeagiles:', Typeagiles.type_agile);
    }
    );
    }


    fetchinvestisement() {
    this.morassService.getinvestisement().subscribe(
    (investisementOptions: any) => {
      this.investisementOptions = investisementOptions.type_investisement;
      console.log('Fetched investisements:', investisementOptions.type_investisement);
          //  this.investisementOptions=investisements.type_investisement
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

  idprojet : any

  idprogramme:any
  onInitiativeSelected() {
    const selectedId = this.myForm.get('selectedId')?.value;

    this.idprojet = selectedId


    if (selectedId) {

      console.log(this.selectedEntite, 'this.selectedEntite');

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
    }




  }

  modifiercarac(){
    console.log(this.projetForm.value);
    console.log(this.idprojet);

    const data = {

    }


  }


  IdEnjeuxselected: any; // Declare IdEnjeuxselected here
  selectedEnjeux: any;   // Declare selectedEnjeux here

  onEnjeuxSelected(event: any) {
    const selectedNomEn = event.target.value;

    console.log(selectedNomEn, 'selectedNomEn');

    this.IdEnjeuxselected = selectedNomEn;
  }
  Idselectlead:any;
  Idleadselected:any;
  selected(event: any) {
    const selectedNomLe = event.target.value;
    console.log(selectedNomLe, 'selectedNomLe');
    this.Idselectlead = selectedNomLe; // Use the consistent variable name
  }
  natureSelected(event: any) {
    const selectedNomnt = event.target.value;
    console.log(selectedNomnt, 'selectedNomNt');
    this.Idselectlead = selectedNomnt; // Use the consistent variable name
  }
  Idnatureselected:any
  updateEnjeux() {
    const selectedEnjeuxId = this.selectedEnjeux;

    // Assuming you have a function to update the project's enjeux
    this.morassService.updateProjectEnjeux(this.idprojet, this.selectedEnjeux).subscribe(response => {
      console.log('Updated Enjeux ID:', response);
    });

    const selectedlead = this.Idleadselected; // Assuming you meant to use IdEnjeuxselected
    this.morassService.updatelead(this.idprojet, this.Idleadselected).subscribe(response => {
      console.log('Updated lead ID:', response);
    });

    const selectednature = this.Idnatureselected; // Assuming you meant to use IdEnjeuxselected
    this.morassService.updatelead(this.idprojet, this.Idnatureselected).subscribe(response => {
      console.log('Updated nature ID:', response);
    });

    Swal.fire({
      title: 'Success!',
      text: 'Budget data has been updated successfully.',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }



}
