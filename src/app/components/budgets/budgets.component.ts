import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BudgetCtb } from 'src/app/models/BudgetCtb.model';
import { Entite } from 'src/app/models/entite.model';
import { MorassService } from 'src/app/service/morass.service';
import { PopUpService } from '../tables-data/services/pop-up.service';
import { BudgetService } from 'src/app/service/budget.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.css']
})
export class BudgetsComponent implements OnInit {

  selectedBudgetId: number=0;

  calculatedTjmInterneValue: number = 0;
  calculatedTjmExterneValue: number = 0;
 calculatedSum: number = 0;


 updatedCtbValue: string = '';




  userprofil = null ;
  // projetForm: FormGroup ;
  toppings: FormGroup;
  newone: FormGroup;
  // yourFormCTB:FormGroup;
  // updateFormCTB:FormGroup;
  poppupprojetForm!:FormGroup;
  idprojet : any = null;


  total :0 | undefined;
  sommeExternes1= 0;
  sommeregie1= 0;
  sommeinterne1 = 0;





   showCaracteristiquesForm = false;
  formDataArray:any[] = [];
  getonectb:any;
  budgets:Entite[] = [];
  budgetsOfOneEntite:Entite[] = [];
  getone: any;





  //  LES Options


 solitionOptions:Entite[] = [];
 receivedData: boolean = false;

  constructor( private elementRef: ElementRef,
    private morassService: MorassService,
    private router: Router,
    private popupService: PopUpService,
    private route: ActivatedRoute,

    private templateApiService: BudgetService,
    private formBuilder: FormBuilder,
    private _formBuilder: FormBuilder) {



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
        this.newone = this._formBuilder.group({

          interne: '',
          externe: '',
          regie: '',
          forfait :'',

       });

      }
      // {
      //   this.yourFormCTB = this.formBuilder.group({
      //     nom: ['', Validators.required],
      //     sans_interne: [null, Validators.required],
      //     entite_id:'',


      //   });
      // }
      // {
      //   this.updateFormCTB = this.formBuilder.group({

      //     sans_interne: [''], // Ensure that it's properly initialized


      //   });
      // }

    }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.selectedBudgetId = +params['id'];
    });


    this.getAllEntiteOFOneProjet()

    this.route.params.subscribe(params => {
      this.idprojet = params['id'];
      console.log("hero projrct_id", this.idprojet);

    });


    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);

      this.userprofil = user.profil.nom
    }

    // this.fetchctb();
    this.fetchBudgets();
    this.filterBudgets();

  }



  // onSavepopupadmin() {
  //   const {
  //     nom,
  //     interne,
  //     externe,
  //     regie,
  //     type,
  //     projet_id,
  //     TJM_interne,
  //     TJM_externe,
  //     TJM_regie
  //   } = this.toppings.value;

  //   let newType = ''; // Initialize newType variable

  //   if (regie === null) {
  //     if (type == 'EI' || type == 'forfait') {
  //       newType = 'EI'; // Set newType to 'EI' for 'EI' or 'forfait'
  //     } else {
  //       newType = 'forfait'; // Set newType to 'forfait' for other cases
  //     }
  //   } else {
  //     newType = 'regie'; // Set newType to 'regie' when regie is not null
  //   }

  //   const dataToSave = {
  //     nom,
  //     interne,
  //     externe,
  //     regie,
  //     type: newType, // Use the calculated newType value
  //     projet_id,
  //     TJM_interne,
  //     TJM_externe,
  //     TJM_regie
  //   };

  //   this.templateApiService.saveTemplateData(dataToSave)
  //     .subscribe(({ success, entite }: any) => {
  //       if (success) {
  //         this.budgets = entite;
  //         console.log('hahowa entite', entite);
  //       }
  //     });

  //   this.toppings.reset();
  // }


  // onSavepopupadmin() {
  //   const {
  //     nom,
  //     interne,
  //     externe,
  //     regie,
  //     type,
  //     Frofait,

  //     montant_id,
  //     projet_id,
  //     TJM_interne,
  //     TJM_externe,
  //     TJM_regie
  //   } = this.toppings.value;

  //   if (regie == null) {
  //     const newtype = type === true; // corrected logic here
  //     console.log('regie null', newtype);
  //     console.log('GEThj', {
  //       nom,
  //       interne,
  //       externe,
  //       regie,
  //       type,


  //       projet_id,
  //       TJM_interne,
  //       TJM_externe,
  //       TJM_regie
  //     });

  //     this.templateApiService
  //       .saveTemplateData({
  //         nom,
  //         interne,
  //         externe,
  //         regie,
  //         type: newtype,
  //         montant_id,
  //         projet_id,
  //         TJM_interne,
  //         TJM_externe,
  //         TJM_regie
  //       })
  //       .subscribe(({ success, entite }: any) => {
  //         if (success) {
  //           this.budgets = entite;
  //           console.log('true entite with id project', entite);
  //         }
  //       });
  //   } else {
  //     console.log('false');
  //     const newtype = type === false; // corrected logic here

  //     console.log('regie not null', newtype);
  //     this.templateApiService
  //       .saveTemplateData({
  //         nom,
  //         interne,
  //         externe,
  //         regie,
  //         type: newtype,
  //         projet_id,
  //         TJM_interne,
  //         TJM_externe,
  //         TJM_regie
  //       })
  //       .subscribe(({ success, entite }: any) => {
  //       });
  //   }
  //   this.toppings.reset();
  // }

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

  getAllEntiteOFOneProjet(){
    this.route.params.subscribe(params => {
      const idofprojet = params['id'];
      console.log("get a id", idofprojet);
      this.morassService.getAllEntiteofOneProjet(idofprojet).subscribe((data: any) => {
        console.log(data.entite, 'getAllEntiteOFOneProjet');

        this.budgetsOfOneEntite = data.entite;



        this.calculateEntiteForProjet()

      });

    });

  }
  totalExterneTJMExterne=0
  calculateEntiteForProjet() {

    this.totalExterneTJMExterne = 0;
    for (const item of this.budgetsOfOneEntite) {
      const externe = item.externe ?? 0; // Use 0 as the default value if externe is undefined
      const TJM_externe = item.TJM_externe ?? 0; // Use 0 as the default value if TJM_externe is undefined
      const result = externe * TJM_externe;
      this.totalExterneTJMExterne += result;
      console.log(`Item: ${item.nom}, Externe: ${externe}, TJM_externe: ${TJM_externe}, Result: ${result}`);

    }
  }

  onUpdatepopupadmin() {

    const { interne, externe ,regie ,forfait } = this.newone.value

    this.receivedData =true
    if (this.getone?.id) {
      console.log('data entite : ' , this.newone.value);


    }


    console.log('data updated is : ', this.getone?.id);




    this.morassService
      .updateTemplateDataById(this.getone?.id, {
        interne, externe ,regie ,forfait,
        projet_id : this.idprojet,

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




updateBudgetCtb(ctbId: number, updatedData: any) {
  this.morassService.updateBudgetCtb(ctbId, updatedData).subscribe(
    (data: any) => {
      console.log(`CTB with ID ${ctbId} updated:`, data);
    },
    (error) => {
      console.error(`Error updating CTB with ID ${ctbId}:`, error);
    }
  );
}


  // totalSum = 0
  // totalSum1=0

  // fetchctb() {
  //   this.morassService.getBudgetCtb().subscribe(
  //     ({ success, budget_ctb }: any) => {
  //       console.log('ctb get:', success, budget_ctb);

  //       if (success && budget_ctb) {
  //         this.formDataArray = budget_ctb;
  //         console.log('get ctbbbb', budget_ctb);

  //         for (const data of budget_ctb) {
  //           const { nom, sans_interne } = data;


  //         }
  //         this.formDataArray = budget_ctb.filter((data: any) => data.projet_id === null);
  //         console.log('Filtered CTB:', this.formDataArray);

  //         const interneArray = budget_ctb.map((data: any) => data.sans_interne);
  //         console.log('Interne Array:', interneArray);

  //         const sommeinterne = interneArray.reduce((acc: number, sans_interne: number) => acc + sans_interne, 0);
  //         this.sommeinterne1 = sommeinterne;
  //         console.log('Somme Interne:', this.sommeinterne1);



  //         // this.totalSum = this.totalValue + this.totalregievalue + this.sommeinterne1;
  //         // this.totalSum1 = this.totalValue + this.sommeinterne1;


  //         console.log('Somme Interne:', this.sommeinterne1);
  //         console.log('Total Sum:', this.totalSum);
  //       }
  //     }
  //   );
  // }






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

  // updatectb(event: any,  id: number){


  //   console.log('Input value:', event.target.value);
  //   console.log('Input value:', id);
  //   this.updatedCtbValue = event.target.value;

  //   this.morassService.updateBudgetCtb(id, {sans_interne :  this.updatedCtbValue}).subscribe((data:any)=>{
  //     console.log('ctb updated ');

  //   })
  // }

  // updatectb(event: any) {
  //   console.log('Input value:', event.target.value);
  //   console.log('ID:', this.selectedBudgetId); // Use the stored id

  //   this.updatedCtbValue = event.target.value;

  //   this.morassService.updateBudgetCtb(this.selectedBudgetId, { sans_interne: this.updatedCtbValue }).subscribe((data: any) => {
  //     console.log('ctb hnaaa',  this.updatedCtbValue);
  //   });
  // }
  // updatedSansInterneValues: { id: number; value: any }[] = [];

  // updatectb(event: any, budgetctb: any) {
  //   const updatedValue = event.target.value; // Retrieve the value from the input element
  //   console.log('Input value:', updatedValue);
  //   console.log('ID:', budgetctb.id); // Assuming id is present in budgetctb

  //   // Update the formDataArray with the new sans_interne value
  //   budgetctb.sans_interne = updatedValue;

  //   // Update the value in updatedSansInterneValues array if it exists
  //   const existingValueEntry = this.updatedSansInterneValues.find(entry => entry.id === budgetctb.id);
  //   if (existingValueEntry) {
  //     existingValueEntry.value = budgetctb.sans_interne;
  //   } else {
  //     this.updatedSansInterneValues.push({ id: budgetctb.id, value: budgetctb.sans_interne });
  //   }

  //   this.morassService.updateBudgetCtb(budgetctb.id, { sans_interne: budgetctb.sans_interne })
  //     .subscribe((data: any) => {
  //       console.log('ctb updated', data);
  //     });
  // }













  clearPopupData() {
    // this.selectedFile = null;
    // this.fileSelected = false;

    // Set the loading flag back to false when clearing the popup data
    // this.loading = false;
  }
  // onSaveCTB() {
  //   const { nom, sans_interne } = this.yourFormCTB.value;

  //   this.templateApiService.saveBudgetCtb({ nom, sans_interne }).subscribe(
  //     (response: BudgetCtb) => {
  //       this.formDataArray = [response];
  //       console.log('hero69', response);

  //     },
  //     (error: any) => {
  //     }
  //   );
  // }



  saveBudgetsData() {
    console.log(this.toppings);
    console.log('id', this.idprojet);

    // Update formDataArray with idprojet and updated sans_interne values
    this.budgetsOfOneEntite.forEach((item: any) => {
      console.log(item,'item');
      if (item.type== 'EI') {
        this.templateApiService.saveTemplateData({nom:item.nom ,externe: 0, interne:0, type:'EI',TJM_interne:item.TJM_interne,TJM_externe:item.TJM_externe}).subscribe((data:any)=>{
          console.log(data,'new data after update ');

        });

      }
      if (item.type== 'regie') {
        this.templateApiService.saveTemplateData({nom:item.nom ,regie: 0, interne:0, type:'regie',TJM_regie:item.TJM_regie}).subscribe((data:any)=>{
          console.log(data,'new data after update ');

        });

      }
      if (item.type== 'forfait') {
        this.templateApiService.saveTemplateData({nom:item.nom ,forfait: 0,  type:'forfait'}).subscribe((data:any)=>{
          console.log(data,'new data after update ');

        });

      }

    });

 // Show a success SweetAlert after the updates
 Swal.fire({
  title: 'Success!',
  text: 'Budget data has been updated successfully.',
  icon: 'success',
  confirmButtonText: 'OK'
}).then(() => {
  this.router.navigate(['/tables-data']); // Replace 'tables-data' with the desired route
});

  }


  // saveBudgetsData() {
  //   console.log(this.formDataArray);
  //   console.log('id', this.idprojet);

  //   // Update formDataArray with idprojet and updated sans_interne values
  //   this.formDataArray.forEach((item: any) => {
  //     item.idprojet = this.idprojet;

  //     // Find the matching updated value in updatedSansInterneValues array
  //     const updatedValueEntry = this.updatedSansInterneValues.find(entry => entry.id === item.id);
  //     if (updatedValueEntry) {
  //       item.sans_interne = updatedValueEntry.value;
  //     }
  //   });

  //   // Update budgetctb array and update sans_interne property
  //   this.formDataArray.forEach((item: any) => {
  //     // Call the updateBudgetCtb method for each updated object
  //     this.morassService.updateBudgetCtb(item.id, { projet_id: this.idprojet, sans_interne: item.sans_interne })
  //       .subscribe((data: any) => {
  //         console.log('ctb updated', data);
  //       });
  //   });

  //   // Now both formDataArray and budgetctb arrays have 'idprojet' and 'sans_interne' updated
  //   console.log(this.formDataArray, "formDataArray");
  // }
   // Calculate the totalEntiteForProjet based on fetched data
  //  totalEntiteForProjet=0;
  //  calculateEntiteForProjet() {
  //   this.totalEntiteForProjet = 0;

  //   for (const entity of this.budgetsOfOneEntite) {
  //     // Make sure the properties are numbers, if not, convert them
  //     const externeValue = Number(entity.externe) || 0;
  //     const tjmExterneValue = Number(entity.TJM_externe) || 0;

  //     this.totalEntiteForProjet += externeValue * tjmExterneValue;

  //     // Debug output
  //     console.log('Entity:', entity.nom);
  //     console.log('externeValue:', externeValue);
  //     console.log('tjmExterneValue:', tjmExterneValue);
  //     console.log('Partial Total:', externeValue * tjmExterneValue);
  //   }

  //   // Debug output for the total
  //   console.log('Total EntiteForProjet:', this.totalEntiteForProjet);
  // }







// totalForfaitSum=0
// calculateForfaitSum(){
//   this.totalForfaitSum = 0;

//   for (const item of this.budgetsOfOneEntite) {

//       this.totalForfaitSum += item.forfait;

//   }
// }
calculateRegieTJMRegie(budgetItem: any): number {
  if (budgetItem && budgetItem.type === 'regie') {
    const result = budgetItem.regie * budgetItem.TJM_regie;
    console.log(`Item: ${budgetItem.nom}, Regie: ${budgetItem.regie}, TJM_regie: ${budgetItem.TJM_regie}, Result: ${result}`);
    return result;
  }
  return 0; // Return 0 if budgetItem is not defined or its type is not 'regie'
}

calculateTotalValue(): number {
  let totalValue = this.totalExterneTJMExterne;

  for (const budgetItem of this.budgetsOfOneEntite) {
    if (budgetItem.type === 'regie') {
      totalValue += this.calculateRegieTJMRegie(budgetItem);
    }
    if (budgetItem.type === 'forfait') {
      totalValue += budgetItem.forfait ?? 0; // Use 0 as the default value if budgetItem.forfait is undefined
    }
  }

  return totalValue;
}
calculateTotal1(): number {
  let totalValue = this.totalExterneTJMExterne;

  for (const budgetItem of this.budgetsOfOneEntite) {
   
    if (budgetItem.type === 'forfait') {
      totalValue += budgetItem.forfait ?? 0; // Use 0 as the default value if budgetItem.forfait is undefined
    }

  }

  return totalValue;
}

}
