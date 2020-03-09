import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AreaInterface } from 'src/app/interfaces/area.interface';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  private areasCollection: AngularFirestoreCollection<AreaInterface>;

  constructor(
    private afs: AngularFirestore
  ) {
    this.areasCollection = afs.collection<AreaInterface>('areas');
  }

  // ======================================================
  // Obtiene la lista de areas
  // ======================================================
  getAreas() {
    return this.areasCollection.valueChanges();
  }
}
