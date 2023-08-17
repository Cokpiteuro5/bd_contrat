import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {


  private selectedProgrammeId = new BehaviorSubject<number>(0);
  selectedProgrammeId$ = this.selectedProgrammeId.asObservable();


  setSelectedProgrammeId(id: number) {
    this.selectedProgrammeId.next(id);
  }


  private libelleInitiativeSubject = new BehaviorSubject<string>('');
  libelleInitiative$ = this.libelleInitiativeSubject.asObservable();

  setLibelleInitiative(libelle: string) {
    this.libelleInitiativeSubject.next(libelle);
  }
}
