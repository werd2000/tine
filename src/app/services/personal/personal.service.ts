import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { PersonalInterface } from 'src/app/interfaces/personal.interface';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {

  private personalCollection: AngularFirestoreCollection<PersonalInterface>;
  personal: Observable<PersonalInterface[]>;


  constructor(
    private afs: AngularFirestore
  ) {
    this.personalCollection = afs.collection<PersonalInterface>('profesionales');
  }

  // ======================================================
  // Obtiene la lista de personal
  // ======================================================
  getPersonal() {
    this.personalCollection = this.afs.collection('profesionales', ref => ref.orderBy('apellido'));
    this.personal = this.personalCollection.valueChanges();
    return this.personal;
  }

  // =====================================================================
  // Busca un profesional por un término de búsqueda
  // =====================================================================
  searchPersonal(campo: string, termino: string ) {
    return this.afs.collection<PersonalInterface>(
      'profesionales', ref => ref.where(campo, '==', termino)
    ).valueChanges();
  }

  // =====================================================================
  // Busca un profesional por su id
  // =====================================================================
  getPersonalId(id: string) {
    return this.afs.collection('profesionales').doc(id).valueChanges();
  }
}
