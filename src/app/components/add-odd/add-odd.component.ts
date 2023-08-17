import { FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Odd } from './../../models/odd';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-odd',
  templateUrl: './add-odd.component.html',
  styleUrls: ['./add-odd.component.css']
})
export class AddOddComponent implements OnInit {

  odd: Odd[] | undefined = []
  constructor() { }

  ngOnInit(): void {
  }



  oddForm = new FormGroup({
    label: new UntypedFormControl('', Validators.required),
    objectif: new UntypedFormControl('', Validators.required),
    etqs: new UntypedFormControl('', Validators.required),

  })

  saveOdd() {
    // this.morasstService.addMorass(this.morassForm.value).subscribe(() => {
    //   // Reset the form
    //   this.morassForm.reset();
    //   // Display an alert message
    //   alert('Morass added successfully!');
    //   // Navigate to another component
    //   this.router.navigate(['/tables-data']);
    // });
  }

}
