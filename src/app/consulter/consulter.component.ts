import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
  projet: any = {}; // Initialize the projet object


  myForm: FormGroup;
  projetForm : FormGroup
  budgets:  Entite[]=[];
  intiveOptions:any=[];
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
        type_investisement_id: '',
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
    this.fetchBudgets();
    this.fetchprogramme();


  }

  fetchBudgets() {
    this.morassService.getTemplateData().subscribe(
      (response: any) => {
        // this.budgets = ;
       this.intiveOptions = response.entite;
        console.log("this.intiveOptions conslter" ,this.intiveOptions );





      },

    );
  }

  // fetchProjet(): void {
  //   this.morassService.getProjet().subscribe(
  //     (data : any) => {
  //       this.intiveOptions = data.projet;
  //       console.log("projet her",data.projet)
  //     }
  //   );
  // }

  // fetchprogramme() {
  //   this.morassService.getprogramme().subscribe(
  //     (programmes: any) => {
  //       this.programmes = programmes.programme;
  //       console.log('Fetched programme:', programmes.programme);
  //            this.programmetOptions=programmes.programme
  //     }
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





  // fetchoneentite() {
  // this.route.params.subscribe(params => {
  //   const entiteId = params['entiteId']; // Get the ID from the route parameter
  //   if (entiteId) {
  //     this.morassService.geten(entiteId).subscribe((entite: Entite) => {
  //       this.intiveOptions = entite;

  //       console.log("hahowa",  this.intiveOptions)
  //     });
  //   }
  // });}











  fetchIntiveOptions() {
    this.morassService.getTemplateData().subscribe(
      (entites: Entite[]) => {
        this.intiveOptions = entites;
      }
    );
  }

  idinitiative  = null;



  leadd  = '';
  Enjexx='';
  Nature='';
  typeA='';
  Priorite='';
  anne='';
  wave='';
  sciforma="";
  investisement="";
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

  onInitiativeSelected() {
    const selectedId = this.myForm.get('selectedId')?.value;

    if (selectedId) {
      this.morassService.getentiteById(selectedId).subscribe(
        (entit: any) => {
          this.selectedEntite = entit.entite[0].projet;

          this.leadd = this.selectedEntite.lead.nomLe;
          this.Enjexx = this.selectedEntite.enjeux.nomEn;
          this.Nature = this.selectedEntite.nature_programme?.nomNt;
          this.typeA = this.selectedEntite.type_agile?.nom;
          this.Priorite = this.selectedEntite.priorite?.nomPr;
          // this.anne = this.selectedEntite.an?.nomPr;

          this.copro1 = this.selectedEntite.copro_1;
          this.copro2 = this.selectedEntite.copro_2;
          this.data = this.selectedEntite.top_15;






          this.wave = this.selectedEntite.ref_wave;
          this.sciforma = this.selectedEntite.ref_sciforma;
          this.investisement = this.selectedEntite.type_investisement?.nominvestisement;
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
        this.projetForm.get('type')?.setValue(this.type);

        // Set values for the new fields in your form
        this.projetForm.get('date_cloture')?.setValue(this.date_cloture);
        this.projetForm.get('date_lancement')?.setValue(this.date_lancement);
        this.projetForm.get('deletedAt')?.setValue(this.deletedAt);
        this.projetForm.get('dematerialisation')?.setValue(this.dematerialisation);
        this.projetForm.get('description')?.setValue(this.description);
        this.projetForm.get('digital')?.setValue(this.digital);
        this.projetForm.get('hors_feuille_de_route')?.setValue(this.hors_feuille_de_route);






          console.log('Selected Entite:', this.selectedEntite);

        }
      );
    }
  }






}
