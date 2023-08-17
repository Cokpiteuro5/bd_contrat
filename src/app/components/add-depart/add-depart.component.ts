import { DepartementService } from 'src/app/service/departement.service';
import { Departement } from './../../models/departement';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, UntypedFormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-depart',
  templateUrl: './add-depart.component.html',
  styleUrls: ['./add-depart.component.css']
})
export class AddDepartComponent implements OnInit {
  departement: Departement [] | undefined = []
  Form: Departement[]=[]

  constructor(private departementService: DepartementService, private router: Router) { }
  departForm = new FormGroup({
    codeDprt: new UntypedFormControl('', Validators.required),
    nomDprt: new UntypedFormControl('', Validators.required),
    crdPersonnel: new UntypedFormControl('', Validators.required),
    crdMateriel: new UntypedFormControl('', Validators.required),
    crdPaiement: new UntypedFormControl('', Validators.required),
    crdEngagement: new UntypedFormControl('', Validators.required),
  })

  saveDepart() {
    this.departementService.addDepart(this.departForm.value).subscribe(() => {
      // Reset the form
      console.log(this.departForm);

      this.departForm.reset();
      // Display an alert message
      alert('Morass added successfully!');
      // Navigate to another component
      this.router.navigate(['/tables-general']);
    });
  }

  ngOnInit(): void {

  }


}
