import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { FormularioInterface } from 'src/app/interfaces/formulario.interface';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
// import 'firebase/storage';
import * as firebase from 'firebase/app';

@Injectable({
    providedIn: 'root'
  })
export class FormularioService {

    private formulariosCollection: AngularFirestoreCollection<FormularioInterface>;
    private formularioDoc: AngularFirestoreDocument<FormularioInterface>;
    formularios: Observable<FormularioInterface[]>;

    constructor(
        private storage: AngularFireStorage,
        private afs: AngularFirestore
    ) {
        this.formulariosCollection = afs.collection<FormularioInterface>('formularios');
    }

    // ======================================================
    // Obtiene la lista de formularios
    // ======================================================
    getFormularios() {
        this.formulariosCollection = this.afs.collection('formularios');
        this.formularios = this.formulariosCollection.valueChanges();
        return this.formularios;
    }

  // ======================================================
  // Crea un paciente
  // ======================================================
  createFormulario(formulario: FormularioInterface) {
    const id = this.afs.createId();
    formulario.uid = id;
    // console.log(formulario);
    return this.afs.collection('formularios').doc(id).set(formulario)
    .then( (result) => {
      return id;
    })
    .catch( (error) => {
      console.log(error);
      return null;
    });
  }

  deleteFormulario(formulario: FormularioInterface) {
    if (formulario.url) {
      const objet = formulario.url.split('/');
      const obje = objet[7].split('?');
      const obj = obje[0].split('%2F');
      // const ob = obj.join('%2F');
      const ob = obj.join('/');
      console.log(ob);
      // const desertRef = this.storage.ref(`${ob}`);
      const desertRef = this.storage.storage.ref();
      desertRef.child(`${ob}`).delete()
      .then( (r) => console.log(r))
      .catch( (err) => console.log(err));
      // desertRef.delete().subscribe( (r) => console.log(r) );

    }
  }
}
