import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BudgetCtb } from 'src/app/models/BudgetCtb.model';
import { Entite } from 'src/app/models/entite.model';
import { MorassService } from 'src/app/service/morass.service';
import { PopUpService } from '../tables-data/services/pop-up.service';
import { BudgetService } from 'src/app/service/budget.service';

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.css']
})
export class BudgetsComponent implements OnInit {


  calculatedTjmInterneValue: number = 0;
  calculatedTjmExterneValue: number = 0;
 calculatedSum: number = 0;


 updatedCtbValue: string = '';




  userprofil = null ;
  // projetForm: FormGroup ;
  toppings: FormGroup;
  newone: FormGroup;
  yourFormCTB:FormGroup;
  updateFormCTB:FormGroup;
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
         type: false,
        TJM_interne:null,
        TJM_externe:null,
        TJM_regie:null,
        projet_id:null,

       });
        this.newone = this._formBuilder.group({

          interne: '',
          externe: '',
          regie: '',

       });

      }
      {
        this.yourFormCTB = this.formBuilder.group({
          nom: ['', Validators.required],
          sans_interne: [null, Validators.required],
          entite_id:'',


        });
      }
      {
        this.updateFormCTB = this.formBuilder.group({

          sans_interne: '',


        });
      }

    }

  ngOnInit() {

    // this.route.params.subscribe(params => {
    //   const budgetId = +params['id'];
    //  this.newone.patchValue({ projet_id: budgetId });
    //   console.log("hero  projrct_id", budgetId)
    // });

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

    this.fetchBudgets();
    this.fetchctb();
  }






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
        });
    }
    this.toppings.reset();
  }


  totalValue = 0;
  totalregievalue=0;
  getAllEntiteOFOneProjet(){
    this.route.params.subscribe(params => {
      const idofprojet = params['id'];
      console.log("get a id", idofprojet);
      this.morassService.getAllEntiteofOneProjet(idofprojet).subscribe((data: any) => {
        console.log(data.entite, 'getAllEntiteOFOneProjet');

        this.budgetsOfOneEntite = data.entite;

        this.budgetsOfOneEntite.forEach((budget: any) => {
          const calculatedValue = (budget.TJM_externe * budget.externe) ;
          // + (budget.TJM_interne * budget.interne)
          const calculregievalue = (budget.TJM_regie * budget.regie) ;

          this.totalValue += calculatedValue;
          this.totalregievalue+=calculregievalue;
        });

        console.log("Total calculated value:", this.totalValue);
        console.log("Total totalregievalue value:", this.totalregievalue);

      });
    });

  }
  onUpdatepopupadmin() {

    const { interne, externe ,regie  } = this.newone.value

    this.receivedData =true
    if (this.getone?.id) {
      console.log('data entite : ' , this.newone.value);


    }


    console.log('data updated is : ', this.getone?.id);




    this.morassService
      .updateTemplateDataById(this.getone?.id, {
        interne, externe ,regie ,
        projet_id : this.idprojet,

      })
      .subscribe(({ success, entite }: any) => {
        if (success) {
          this.newone = entite;
          console.log('Updated entite with id project', entite);

        }
      });


  }


  fetchBudgets() {
    this.morassService.getTemplateData().subscribe(
      (response: any) => {
        this.budgets = response.entite;
        this.getone = response.entite;
        console.log("jh id" ,response.entite );



        this.saveBudgetsData();

      },
      (error: any) => {
        console.error('Error fetching template data:', error);
      }
    );
  }


  saveBudgetsData() {
    this.updatedCtbValue = '';

    const dataToSave = {
      budgets: this.budgets,
      formDataArray: this.formDataArray,
      getone:this.getone,
      updatedCtbValue: this.updatedCtbValue

    };

    this.morassService.saveBudgetsData(dataToSave).subscribe(
      (response: any) => {
        console.log('Data saved successfully:', response);
      }
    );
  }


  totalSum = 0
  totalSum1=0

  fetchctb() {
    this.morassService.getBudgetCtb().subscribe(
      ({ success, budget_ctb }: any) => {
        console.log('ctb get:', success, budget_ctb);

        if (success && budget_ctb) {
          this.formDataArray = budget_ctb;
          console.log('get ctbbbb', budget_ctb);

          for (const data of budget_ctb) {
            const { nom, sans_interne } = data;

          }

          const interneArray = budget_ctb.map((data: any) => data.sans_interne);
          console.log('Interne Array:', interneArray);

          const sommeinterne = interneArray.reduce((acc: number, sans_interne: number) => acc + sans_interne, 0);
          this.sommeinterne1 = sommeinterne;
          console.log('Somme Interne:', this.sommeinterne1);



          this.totalSum = this.totalValue + this.totalregievalue + this.sommeinterne1;
          this.totalSum1 = this.totalValue + this.sommeinterne1;


          console.log('Somme Interne:', this.sommeinterne1);
          console.log('Total Sum:', this.totalSum);
        }
      }
    );
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

  updatectb(event: any,  id: number){


    console.log('Input value:', event.target.value);
    console.log('Input value:', id);
    this.updatedCtbValue = event.target.value;

    this.morassService.updateBudgetCtb(id, {sans_interne :  this.updatedCtbValue}).subscribe((data:any)=>{
      console.log('ctb updated ');

    })
  }









  clearPopupData() {
    // this.selectedFile = null;
    // this.fileSelected = false;

    // Set the loading flag back to false when clearing the popup data
    // this.loading = false;
  }
  onSaveCTB() {
    const { nom, sans_interne } = this.yourFormCTB.value;

    this.templateApiService.saveBudgetCtb({ nom, sans_interne }).subscribe(
      (response: BudgetCtb) => {
        this.formDataArray = [response];
        console.log('hero69', response);

      },
      (error: any) => {
      }
    );
  }


}
