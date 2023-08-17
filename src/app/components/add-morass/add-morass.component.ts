import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Morass } from 'src/app/models/morass';
import { MorassService } from 'src/app/service/morass.service';

@Component({
  selector: 'app-add-morass',
  templateUrl: './add-morass.component.html',
  styleUrls: ['./add-morass.component.css']
})
export class AddMorassComponent implements OnInit {

  morass: Morass[] | undefined=[]
  Form:Morass[]=[]
  constructor(private morasstService: MorassService,private router: Router) {}
  ngOnInit(): void {

}
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

saveMorass() {
  this.morasstService.addMorass(this.morassForm.value).subscribe(() => {
    // Reset the form
    this.morassForm.reset();
    // Display an alert message
    alert('Morass added successfully!');
    // Navigate to another component
    this.router.navigate(['/tables-data']);
  });
}

}
