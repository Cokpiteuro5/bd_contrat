import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Lead } from 'src/app/models/Lead.model';
import { NatureProgramme } from 'src/app/models/NatureProgramme.model';
import { Priorite } from 'src/app/models/Priorite.model';
import { Programme } from 'src/app/models/Programme.model';
import { TypeAgile } from 'src/app/models/TypeAgile.model';
import { TypeInvestisement } from 'src/app/models/TypeInvestisement.model';
import { Enjeux } from 'src/app/models/enjeux.model';
import { Entite } from 'src/app/models/entite.model';
import { Projet } from 'src/app/models/projet.model';
import { BudgetService } from 'src/app/service/budget.service';
import { MorassService } from 'src/app/service/morass.service';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-mettre-jour',
  templateUrl: './mettre-jour.component.html',
  styleUrls: ['./mettre-jour.component.css']
})


export class MettreJourComponent implements OnInit  {

  receivedData: boolean = false;

  fetchedEntites: any[] = []; // Initialize as an empty array
  updateForm: FormGroup; // Declare the form group

  getone: any;

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




  //////////////
  natureOptions:NatureProgramme[]=[]

  montantOptions: Lead[] = []
  TypeOptions:TypeAgile[]=[]
  enjeuxOptions:Enjeux[]=[]
  PrioriteOptions:Priorite[]=[]
investisementOptions:TypeInvestisement[]=[]
programmetOptions:Programme[]=[]
solitionOptions:Entite[] = [];


  entite:any;
  // projet: any = {}; // Initialize the projet object

  intiveOptions: Projet[] = [];
  // projet: Projet[] = [];

  newone: FormGroup;
  toppings: FormGroup;

  myForm: FormGroup;
  projetForm : FormGroup;
  budgetsOfOneEntite:Entite[] = [];

  budgets:  Entite[]=[];
  selectedLeadId: string | null = null;

  onLeadSelected() {
    if (this.selectedLeadId !== null) {
      console.log('Selected Enjeux ID:', this.selectedLeadId);
      // You can use the selected ID for further actions
    }
  }
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

        this.updateForm = this.formBuilder.group({
          interne: [''],
          externe: [''],
          regie: ['']
        });

        this.newone = this._formBuilder.group({

          interne: '',
          externe: '',
          regie: '',
          forfait :'',

       });

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

  ngOnInit(): void {
    this.onInitiativeSelected();
    this.fetchBudgets();
    this.fetchprogramme();
    // this.fetchProjects();
    this. fetchtype();
    this.fetchenjuex();
    this.fetchnature();
    this.fetchpriorite();
    this.fetchinvestisement();
    this.filterBudgets();
    this.fetchLeads();
    this.fetchnature(); // Call the method to fetch natureOptions


    this.getAllEntiteOFOneProjet()

    this.route.params.subscribe(params => {
      this.idprojet = params['id'];
      console.log("hero projrct_id", this.idprojet);

    });



  }


  fetchBudgets() {
    this.morassService.getTemplateData().subscribe(
      (response: any) => {
        this.budgets = response.entite;
        this.getone = response.entite;
        console.log("jh id" ,response.entite );

      },
      (error: any) => {
        console.error('Error fetching template data:', error);
      }
    );
  }

  filterBudgets() {
    this.morassService.getTemplateData().subscribe(
      (response: any) => {
        this.budgets = response.entite.filter((item: Entite) => item.projet_id === null);
        console.log("Filtered budgets:", this.budgets);
      },
      (error: any) => {
        console.error('Error fetching template data:', error);
      }
    );
  }
  getAllEntiteOFOneProjet(){
    this.route.params.subscribe(params => {
      const idofprojet = params['id'];
      console.log("get a id", idofprojet);
      this.morassService.getAllEntiteofOneProjet(idofprojet).subscribe((data: any) => {
        console.log(data.entite, 'getAllEntiteOFOneProjet');

        this.budgetsOfOneEntite = data.entite;

        this.budgetsOfOneEntite.forEach((budget: any) => {
          const calculatedValue = (budget.TJM_externe * budget.externe) ;

          const calculregievalue = (budget.TJM_regie * budget.regie) ;

          // this.totalValue += calculatedValue;
          // this.totalregievalue+=calculregievalue;
        });

        // console.log("Total calculated value:", this.totalValue);
        // console.log("Total totalregievalue value:", this.totalregievalue);

      });
    });

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
        this.fetchEntitesForProjet();
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


 fetchEntitesForProjet() {
    this.morassService.getEntitesByProjetId(this.idprojet).subscribe(
      (entites: any) => {
        console.log('Fetched Entites tretete:', entites);
        this.fetchedEntites = entites; // Assign fetched data to the property
        this.calculateTotal();
        this.calculateEntiteForProjet();
        this.calculateTotalForfait();
      },

      (error) => {
        console.error('Error fetching entites:', error);
      }

    );




}

deleteEntite(item: any) {
  const entityId = item.id; // Get the ID of the entity to be deleted

  if (entityId) {
    Swal.fire({
      title: 'Delete Entity',
      text: 'Are you sure you want to delete this entity?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('Deleting entity with ID:', entityId); // Log the ID before deletion

        this.morassService.deleteEntityById(entityId).subscribe(
          (response) => {
            // Handle success (e.g., remove the deleted item from the fetchedEntites array)
            const index = this.fetchedEntites.indexOf(item);
            if (index > -1) {
              this.fetchedEntites.splice(index, 1);
            }
            this.router.navigateByUrl('/mettre_jour', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/mettre_jour']);
            });

            this.fetchBudgets();

          },
          (error) => {
            console.error('Error deleting entity:', error);
          }
        );
      }
    });
  }
}


onUpdatepopupadmin() {
  const { interne, externe, regie, forfait } = this.newone.value;

  const {nom, type,TJM_interne,TJM_externe,TJM_regie} = this.getone
  this.receivedData = true;

  if (this.getone?.id) {
    console.log('data entite : ', this.newone.value);
  }

  console.log('data updated is : ', nom, type);

  if (type == 'EI') {
    this.templateApiService
      .saveTemplateData({
        nom: nom,
        externe: 0,
        interne: 0,
        type: 'EI',
        TJM_interne: TJM_interne,
        TJM_externe: TJM_externe,
      })
      .subscribe((data: any) => {
        console.log(data, 'new data after update for EI');
      });
    console.log(type , 'type');

  }
   if (type == 'regie') {
    this.templateApiService
      .saveTemplateData({
        nom: nom,
        regie: 0,
        interne: 0,
        type: 'regie',
        TJM_regie: TJM_regie,
      })
      .subscribe((data: any) => {
        console.log(data, 'new data after update for regie');
      });
    console.log(type , 'type');

  }
  if (type == 'forfait') {
    this.templateApiService
      .saveTemplateData({
        nom: nom,
        forfait: 0,
        type: 'forfait',
      })
      .subscribe((data: any) => {
        console.log(data, 'new data after update for forfait');
      });
    console.log(type , 'type');

  }





  this.morassService
    .updateTemplateDataById(this.getone?.id, {
      interne,
      externe,
      regie,
      forfait,
      projet_id: this.idprojet,
    })
    .subscribe(({ success, entite }: any) => {
      if (success) {
        this.newone = entite;
        console.log('Updated entite with id project', entite);




      }
    });
    this.newone.reset();

    // Refresh the page
    window.location.reload();

  this.fetchBudgets();
}



onSolutionSelect(event: any) {
  const selectedId =  event.target.value;

  console.log('id c :' , JSON.stringify(selectedId, null, 2));

  if (selectedId) {
    this.morassService.getOneEntite(selectedId).subscribe(
      (entite: any) => {
        this.getone = entite.entite[0];
        console.log("get one", entite.entite[0] )
        this.receivedData = true
      },
      error => {
        console.error('Error fetching entite:', error);
      }
    );
  }

}
// idToUpdate: number = 0; // Initialize with the ID of the entity you want to update



toggleEditMode(item: any) {
  item.editMode = true;

  // Initialize the form with current values
  this.updateForm.setValue({
    interne: item.interne,
    externe: item.externe,
    regie: item.regie,


  });
}

cancelEditMode(item: any) {
  item.editMode = false;
  this.updateForm.reset();
}

updateEntite(item: any) {
  const formData = this.updateForm.value;
  // Update the entity properties with form values
  item.interne = formData.interne;
  item.externe = formData.externe;
  item.regie = formData.regie;

  this.morassService.updateEntite(item.id, item).subscribe(
    (response: any) => {
      console.log('Entite updated:', item);
      item.editMode = false;
    },
    (error) => {
      console.error('Error updating entite:', error);
    }
  );
}



clearPopupData() {
  this.newone.reset(); // Reset the form controls
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

totalRegieTJMRegie: number = 0; // Property to store the total

  // Function to calculate the total of regie * TJM_regie
  calculateTotal(): void {
    this.totalRegieTJMRegie = 0;
    for (const item of this.fetchedEntites) {
      if (item.type === 'regie') {
        this.totalRegieTJMRegie += item.regie * item.TJM_regie;
      }
    }
  }
  total:number=0
  calculateTotalForfait() {
    this.total = 0;

    for (const item of this.fetchedEntites) {
      if (item.type === 'forfait') {
        this.total += item.forfait;
      }
    }


  }


// IdEnjeuxselected: any
// onEnjeuxSelected(event: any) {
//   const selectedNomEn = event.target.value;

//   console.log(selectedNomEn, 'selectedNomEn');

//   this.IdEnjeuxselected = selectedNomEn
// }
// Idleadlected:any
// seleted(event: any) {
//   const selectedNomLe = event.target.value;
//   console.log(selectedNomLe, 'selectedNomLe');
//   this.Idleadlected = selectedNomLe;
// }



// selectedEnjeux: any;
// IdELEADselected:any

// updateEnjeux() {
//   const selectedEnjeuxId = this.selectedEnjeux;

//   // Assuming you have a function to update the project's enjeux
//   this.morassService.updateProjectEnjeux(this.idprojet, this.selectedEnjeux).subscribe(response => {
//     console.log('Updated Enjeux ID:', response);
//   });

//   const selectedlead = this.IdELEADselected;
//   this.morassService.updatelead(this.idprojet, this.IdELEADselected).subscribe(response => {
//     console.log('Updated lead ID:', response);
//   });
// }

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



navigateToMettreJour() {
  this.router.navigate(['/mettre_jour']);
}

}
