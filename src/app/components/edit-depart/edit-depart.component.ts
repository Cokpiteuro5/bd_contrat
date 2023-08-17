import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Departement } from 'src/app/models/departement';
import { DepartementService } from 'src/app/service/departement.service';
import { Location } from '@angular/common'
@Component({
  selector: 'app-edit-depart',
  templateUrl: './edit-depart.component.html',
  styleUrls: ['./edit-depart.component.css']
})
export class EditDepartComponent implements OnInit {

  departement: Departement [] | undefined = []
  Form: Departement[]=[]
  id: any;

  constructor(private departementService: DepartementService,private router: Router,private route: ActivatedRoute,private location: Location) { }
  departForm = new FormGroup({
    codeDprt: new UntypedFormControl('', Validators.required),
    nomDprt: new UntypedFormControl('', Validators.required),
    crdPersonnel: new UntypedFormControl('', Validators.required),
    crdMateriel: new UntypedFormControl('', Validators.required),
    crdPaiement: new UntypedFormControl('', Validators.required),
    crdEngagement: new UntypedFormControl('', Validators.required),
  })

  ngOnInit(): void {
    // this.getCategories()
    this.route.params.subscribe((params: any) => {
      this.departementService.getOneDepart(params.id).subscribe(res => {
        this.id = params.id
        this.departForm.patchValue(res.departement)
      })
  })
  }
  updateDepart() {
    this.departementService.editDepart(this.id, this.departForm.value).subscribe(res =>

      {
      if(res.success) {
       this.location.back()
      }
    },
    err => console.error(err)
    )
  }
}
