import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Projet } from 'src/app/models/projet.model';
import { MorassService } from 'src/app/service/morass.service';
// import {projec}


@Injectable({
  providedIn: 'root'
})
export class MettreService {
  private selectedProjectSource = new BehaviorSubject<Projet | null>(null);
  selectedProject$ = this.selectedProjectSource.asObservable();

  constructor(private morassService: MorassService) { }




  onInitiativeSelected(selectedId: number) {
    if (selectedId) {
      this.morassService.getoneproject(selectedId).subscribe(
        (projectData: any) => {
          // Process and prepare the project data as needed
          const selectedEntite = projectData.projet[0]; // Assuming there's only one entity in the array

          console.log(selectedEntite,'selectedEntite');

          // Emit the selected project data through the BehaviorSubject
          this.selectedProjectSource.next(selectedEntite);


        }
      );
    }
  }




}
