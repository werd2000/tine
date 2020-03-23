import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { tipoContactoInterface } from 'src/app/interfaces/tipoContacto.interface';

@Injectable({
  providedIn: 'root'
})
export class TipoContactoService {

  private tiposContactosCollection: AngularFirestoreCollection<tipoContactoInterface>;

  constructor(
    private afs: AngularFirestore,
    public router: Router
  ) {
    this.tiposContactosCollection = afs.collection<tipoContactoInterface>('tipo-contacto');
  }

  deleteTipoContacto(tipo: tipoContactoInterface) {
    this.afs.collection('tipo-contacto').doc(tipo._id).delete();
  }

  // =====================================================================
  // Crea un Tipo de Contacto
  // =====================================================================
  createTipo( tipo: tipoContactoInterface ) {
    const id = this.afs.createId();
    tipo._id = id;
    this.afs.collection('tipo-contacto').doc(id).set(tipo);
  }

  // ======================================================
  // Obtiene la lista de Tipos de Contactos
  // ======================================================
  getTiposContactos() {
    return this.tiposContactosCollection.valueChanges();
  }

  // =====================================================================
  // Obtiene un tipo de contacto por su id
  // =====================================================================
  getTipoContactoId(id: string) {
    return this.afs.collection('tipo-contacto').doc(id).valueChanges();
  }

  // =====================================================================
  // Actualiza un Tipo de Contacto por Id
  // =====================================================================
  updateTipoContacto( tipo: tipoContactoInterface ) {
    this.afs.collection('tipo-contacto').doc(tipo._id).set(tipo);
  }
}
