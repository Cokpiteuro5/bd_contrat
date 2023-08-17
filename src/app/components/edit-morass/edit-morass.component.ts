import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormControl, Validators } from '@angular/forms';


import { MorassService } from 'src/app/service/morass.service';
import { Location } from '@angular/common'
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-edit-morass',
  templateUrl: './edit-morass.component.html',
  styleUrls: ['./edit-morass.component.css']
})
export class EditMorassComponent implements OnInit {
  id=""
  // morass: Morass[] | undefined=[]
  // Form:Morass[]=[]
  constructor(private morassService:MorassService,private router: Router,private route: ActivatedRoute,private location: Location) { }
  morassForm = new FormGroup({
    codeFonc: new UntypedFormControl('', Validators.required),
    codeEco: new UntypedFormControl('', Validators.required),
    prog: new UntypedFormControl('', Validators.required),
    reg: new UntypedFormControl('', Validators.required),
    proj: new UntypedFormControl('', Validators.required),
    rubriques: new UntypedFormControl('', Validators.required),
    creditsDePaiemant:new UntypedFormControl('', Validators.required),
    pays: new UntypedFormControl('', Validators.required),
    type: new UntypedFormControl('', Validators.required),
    lig: new UntypedFormControl('', Validators.required),
    annee: new UntypedFormControl('', Validators.required),
  })
  ngOnInit(): void {
    // this.getCategories()
    this.route.params.subscribe((params: any) => {
      this.morassService.getOneMorass(params.id).subscribe(res => {
        this.id = params.id
        this.morassForm.patchValue(res.budgetaire)
      })
  })
  }
  updateMorass() {
    this.morassService.editmorass(this.id, this.morassForm.value).subscribe(res =>

      {
      if(res.success) {
       this.location.back()
      }
    },
    err => console.error(err)
    )
  }
}
