import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { PersonalInterface } from 'src/app/interfaces/personal.interface';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {

  private personalCollection: AngularFirestoreCollection<PersonalInterface>;
  private personalDoc: AngularFirestoreDocument<PersonalInterface>;
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

  // ======================================================
  // Agrega datos sin eliminar los existentes
  // ======================================================
  // Usar el siguiente codigo
  // ======================================================
  // for (const p of prof) {
  //   const f = p.tipo_doc || null;
  //   console.log(f);
  //   p.tipoDoc = f;
  //   delete p.tipo_doc;
  //   this.personalService.addWithMerge(p, p._id)
  //   .then( (data) => console.log('cambio realizado'))
  //   .catch( (error) => console.log(error));
  // }
  // ======================================================
  addWithMerge(datos: object, id: string) {
    return this.afs.collection('profesionales').doc(id).set(
      datos,
      {
        merge: true
      }
    );
  }

  // ======================================================
  // Actualiza el doc con id con los datos enviados
  // los campos no incluidos permanecen sin cambios
  // ======================================================
  update(datos: object, id: string) {
    return this.afs.collection('profesionales').doc(id).update(
      datos
    );
  }

  // ======================================================
  // Crea un paciente
  // ======================================================
  createPersonal(profesional: PersonalInterface) {
    const id = this.afs.createId();
    profesional._id = id;
    console.log(profesional);
    return this.afs.collection('profesionales').doc(id).set(profesional)
    .then( (result) => {
      return id;
    })
    .catch( (error) => {
      console.log(error);
      return null;
    });
  }

  delete(id: string) {
    return this.afs.collection('profesionales').doc(id).delete();
  }

  // ======================================================
  // Actualiza el domicilio con id con los datos enviados
  // los campos no incluidos permanecen sin cambios
  // ======================================================
  updateDomicilio(datos: object, id: string) {
    this.personalDoc = this.afs.doc<PersonalInterface>(`profesionales/${id}`);
    return this.personalDoc.update({domicilio: datos});

  }

  // ======================================================
  // Actualiza la profesion con id con los datos enviados
  // los campos no incluidos permanecen sin cambios
  // ======================================================
  updateProfesion(datos: object[], id: string) {
    this.personalDoc = this.afs.doc<PersonalInterface>(`profesionales/${id}`);
    return this.personalDoc.update({profesion: datos});

  }

}
