import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Entite } from 'src/app/models/entite.model';
import { BudgetService } from 'src/app/service/budget.service';
import { MorassService } from 'src/app/service/morass.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-budgets-majour',
  templateUrl: './budgets-majour.component.html',
  styleUrls: ['./budgets-majour.component.css']
})
export class BudgetsMajourComponent implements OnInit {
  getone: any;
  idprojet : any

  receivedData: boolean = false;
  budgetsOfOneEntite:Entite[] = [];

  budgets:  Entite[]=[];
  fetchedEntites: any[] = []; // Initialize as an empty array
  newone: FormGroup;
  toppings:FormGroup;
  updateForm:FormGroup



  constructor(
    private cdRef: ChangeDetectorRef,
    private morassService: MorassService,
    private router: Router,
    private route: ActivatedRoute,

    private templateApiService: BudgetService,
    private formBuilder: FormBuilder,
    private _formBuilder: FormBuilder
  ) {
    this.newone = this._formBuilder.group({

      interne: '',
      externe: '',
      regie: '',
      forfait :'',

   });
   this.updateForm = this.formBuilder.group({
    interne: [''],
    externe: [''],
    regie: ['']
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
}
