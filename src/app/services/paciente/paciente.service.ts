import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestoreDocument, AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { PacienteInterface } from 'src/app/interfaces/paciente.interface';
import { Observable } from 'rxjs';
import 'firebase/firestore';
import { map } from 'rxjs/operators';
// Si necesito usar el deleteField necesito este import
// import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private pacientesCollection: AngularFirestoreCollection<PacienteInterface>;
  private pacienteDoc: AngularFirestoreDocument<PacienteInterface>;
  pacientes: Observable<PacienteInterface[]>;

  constructor(
    private afs: AngularFirestore
    ) {
    this.pacientesCollection = afs.collection<PacienteInterface>('pacientes');
    // this.pacienteDoc = afs.doc<PacienteInterface>('pacientes');
  }

  // ======================================================
  // Obtiene la lista de pacientes ordenados por apellido
  // ======================================================
  getPacientes(order: string = 'apellido') {
    this.pacientesCollection = this.afs.collection('pacientes', ref => ref.orderBy(order));
    this.pacientes = this.pacientesCollection.valueChanges();
    return this.pacientes;
  }

  // ======================================================
  // Obtiene la lista de pacientes filtrado por un campo
  // ======================================================
  getPacientesQuery(campo: string, valor: string) {
    this.pacientesCollection = this.afs.collection('pacientes', ref => ref.where(campo, '==', valor).orderBy('apellido'));
    this.pacientes = this.pacientesCollection.valueChanges();
    return this.pacientes;
  }

  // ======================================================
  // Obtiene un paciente por su id
  // ======================================================
  getPacienteById(id: string) {
    return this.afs.collection('pacientes').doc(id).valueChanges()
      .pipe( map ( (res: PacienteInterface) => res ) );
  }

  // ======================================================
  // Actualiza el doc con id con los datos enviados
  // los campos no incluidos permanecen sin cambios
  // ======================================================
  update(datos: object, id: string) {
    return this.afs.collection('pacientes').doc(id).update(
      datos
    );
  }

  // ======================================================
  // Actualiza el doc con id con los datos enviados
  // los campos no incluidos permanecen sin cambios
  // ======================================================
  updateDomicilio(datos: object, id: string) {
    this.pacienteDoc = this.afs.doc<PacienteInterface>(`pacientes/${id}`);
    return this.pacienteDoc.update({domicilio: datos});

  }

  // ======================================================
  // Actualiza los contactos con id con los datos enviados
  // los campos no incluidos permanecen sin cambios
  // ======================================================
  updateContactos(datos: object[], id: string) {
    this.pacienteDoc = this.afs.doc<PacienteInterface>(`pacientes/${id}`);
    return this.pacienteDoc.update({contactos: datos});
  }

  // ======================================================
  // Actualiza los datos de familia con id con los datos enviados
  // los campos no incluidos permanecen sin cambios
  // ======================================================
  updateFamilia(datos: object[], id: string) {
    this.pacienteDoc = this.afs.doc<PacienteInterface>(`pacientes/${id}`);
    return this.pacienteDoc.update({familiares: datos});
  }

  // ======================================================
  // Agrega datos sin eliminar los existentes
  // ======================================================
  // Usar el siguiente codigo
  // ======================================================
  // for (const p of pac) {
  //   const f = p.fecha_baja || null;
  //   this.pacienteService.addWithMerge(f, p._id)
  //   .then( (data) => console.log('cambio realizado'))
  //   .catch( (error) => console.log(error));
  // }
  // ======================================================
  addWithMerge(datos: object, id: string) {
    return this.afs.collection('pacientes').doc(id).set(
      datos,
      {
        merge: true
      }
    );
  }
  // ======================================================
  // Elimina un campo
  // ======================================================
  // deleteFields(campo: string, id: string) {
  //   return this.afs.collection('pacientes').doc(id).update(
  //     { campo: firebase.firestore.FieldValue.delete() }
  //   );
  // }

  delete(id: string) {
    return this.afs.collection('pacientes').doc(id).delete();
  }

  // ======================================================
  // Crea un paciente
  // ======================================================
  createPaciente(paciente: PacienteInterface) {
    const id = this.afs.createId();
    paciente._id = id;
    console.log(paciente);
    return this.afs.collection('pacientes').doc(id).set(paciente)
    .then( (result) => {
      return id;
    })
    .catch( (error) => {
      console.log(error);
      return null;
    });
  }
}
