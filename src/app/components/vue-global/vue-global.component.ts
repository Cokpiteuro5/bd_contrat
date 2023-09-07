import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Programme } from 'src/app/models/Programme.model';
import { Entite } from 'src/app/models/entite.model';
import { BudgetService } from 'src/app/service/budget.service';
import { MorassService } from 'src/app/service/morass.service';

@Component({
  selector: 'app-vue-global',
  templateUrl: './vue-global.component.html',
  styleUrls: ['./vue-global.component.css']
})
export class VueGlobalComponent implements OnInit {
  showCaracteristiquesForm = false;
  myForm:FormGroup
  programmes: Programme[] = [];
  constructor( private cdRef: ChangeDetectorRef,
    private morassService: MorassService,
    private router: Router,
    private route: ActivatedRoute,

    private templateApiService: BudgetService,
    private formBuilder: FormBuilder,
    private _formBuilder: FormBuilder) {
      this.myForm = this.formBuilder.group({
        selectedId: [''] // Use a different form control for the selected ID
      });
    }

  ngOnInit(){
   this.fetchprogramme();
  }



  fetchprogramme() {
    this.morassService.getprogramme().subscribe(
      (prog: any) => {
        this.programmes = prog.programme
        console.log('Fetched programme11:', this.programmes);


      }
    );
  }
  programs: any[] = []; // Assuming you have an array of programs
  selectedProgram: number | null = null; // Initialize with null
  projects: any[] = [];
  numberOfProjects: number = 0;
  p1Sum: number = 0;
  p2Sum:number = 0;
  p3Sum:number = 0;
  // fetchProjectsByProgramId(selectedProgramId: number) {
  //   console.log(selectedProgramId);

  //   this.morassService.getProjetbyidprogramme(selectedProgramId).subscribe((projects: any) => {
  //     this.projects = projects.projet.filter((data: any) => {
  //       // Use a return statement and double equals (==) for comparison
  //       return data.programme_id == selectedProgramId;
  //     });

  //     console.log('Filtered projects:', this.projects);
  //     const numberOfProjects = this.projects.length;
  //     console.log('Number of projects:', numberOfProjects);
  //     this.p1Sum = this.projects.filter((project: any) => project.priorite && project.priorite.nomPr.trim().toLowerCase() === 'p1').length;
  //     console.log('p1Sum:', this.p1Sum);
  //     this.p2Sum = this.projects.filter((project: any) => project.priorite && project.priorite.nomPr.trim().toLowerCase() === 'p2').length;
  //     console.log('p2Sum:', this.p2Sum);
  //     this.p3Sum = this.projects.filter((project: any) => project.priorite && project.priorite.nomPr.trim().toLowerCase() === 'p3').length;
  //     console.log('p3Sum:', this.p3Sum);



  //     this.numberOfProjects = numberOfProjects;

  //     this.projects.forEach((project: any) => {
  //       this.morassService.getEntitesByProjetId(project.id).subscribe((entities: Entite[]) => {
  //         // Do something with the fetched entities, such as storing them in a property
  //         project.entities = entities;
  //         console.log('Entities for project', project.nom, ':', entities);
  //       });
  //     });

  //   });

  // }


  // Function to handle program selection change
  totalSum :number= 0;
  totalregie:number= 0;
  totalforfait:number= 0;
  totalSumAll:number= 0;
  fetchProjectsByProgramId(selectedProgramId: number) {
    console.log(selectedProgramId);

    this.morassService.getProjetbyidprogramme(selectedProgramId).subscribe((projects: any) => {
      this.projects = projects.projet.filter((data: any) => {
        // Use a return statement and double equals (==) for comparison
        return data.programme_id == selectedProgramId;
      });

      console.log('Filtered projects:', this.projects);
      const numberOfProjects = this.projects.length;
      console.log('Number of projects:', numberOfProjects);
      this.p1Sum = this.projects.filter((project: any) => project.priorite && project.priorite.nomPr.trim().toLowerCase() === 'p1').length;
      console.log('p1Sum:', this.p1Sum);
      this.p2Sum = this.projects.filter((project: any) => project.priorite && project.priorite.nomPr.trim().toLowerCase() === 'p2').length;
      console.log('p2Sum:', this.p2Sum);
      this.p3Sum = this.projects.filter((project: any) => project.priorite && project.priorite.nomPr.trim().toLowerCase() === 'p3').length;
      console.log('p3Sum:', this.p3Sum);

      this.numberOfProjects = numberOfProjects;

      // Calculate the sum of tjm_externe * externe for all entities across all projects
// Iterate through projects and fetch entities
this.projects.forEach((project: any) => {
  this.morassService.getEntitesByProjetId(project.id).subscribe((entities: Entite[]) => {
    // Do something with the fetched entities, such as storing them in a property
    project.entities = entities;
    console.log('Entities for project', project.nom, ':', entities);

    // Calculate the sum for the current project's entities and add it to the total sum
    if (entities && entities.length > 0) {
      const projectSum = entities.reduce((sum: number, entity: Entite) => {
        // Check if entity.TJM_externe and entity.externe are defined before performing the multiplication
        if (entity.TJM_externe !== undefined && entity.externe !== undefined) {
          return sum + (entity.TJM_externe * entity.externe);
        } else {
          // Handle the case where either property is undefined (e.g., set it to 0 or handle it as needed)
          return sum;
        }
      }, 0);
      const regieTjmRegieSum = entities.reduce((sum: number, entity: Entite) => {
        if (entity.regie !== undefined && entity.TJM_regie !== undefined) {
          return sum + (entity.regie * entity.TJM_regie);
        } else {
          return sum;
        }
      }, 0);
      const forfaitSum = entities.reduce((sum: number, entity: Entite) => {
        if (entity.forfait !== undefined) {
          return sum + entity.forfait;
        } else {
          return sum;
        }
      }, 0);



     this.totalSum += projectSum;
     this.totalregie+=regieTjmRegieSum;
     this.totalforfait+=forfaitSum;

    this.totalSumAll =this.totalregie +this.totalforfait + this.totalSum;

    }

    // You can log the total sum here if needed
    console.log('Total Sum:', this.totalSum);
    console.log('Total regie:', this.totalregie);
    console.log('Total forfait:', this.totalforfait);
    console.log('Total totalSumAll:', this.totalSumAll);


  });
});

    });
  }







  onProgrammeChange(event: any) {
    const selectedProgramId = event.target.value;
    if (selectedProgramId) {
      this.fetchProjectsByProgramId(selectedProgramId);
    }
  }

}
