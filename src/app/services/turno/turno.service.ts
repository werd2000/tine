import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { TurnoInterface } from 'src/app/interfaces/turno.interface';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  private turnosCollection: AngularFirestoreCollection<TurnoInterface>;
  constructor(
    private afs: AngularFirestore
  ) {
    this.turnosCollection = afs.collection<TurnoInterface>('turnos');
  }

  // =====================================================================
  // Busca turnos por un término de búsqueda
  // =====================================================================
  searchTurnos(campo: string, termino: string ) {
    return this.afs.collection<TurnoInterface>(
      'turnos', ref => ref.where(campo, '==', termino)
    ).valueChanges();
  }

  // =====================================================================
  // Busca turnos por fecha y idProfesional
  // =====================================================================
  getTurnosFechaProfesional(fecha: string, idProfesional: string ) {
    return this.afs.collection<TurnoInterface>(
      'turnos', ref => ref.where('fechaInicio', '==', fecha).where('idProfesional', '==', idProfesional)
    ).valueChanges();
  }

  // ======================================================
  // Crea un turno
  // ======================================================
  createTurno(turno) {
    const id = this.afs.createId();
    turno._id = id;
    return this.afs.collection('turnos').doc(id).set(turno);
  }

  updateTurno(datos, id: string) {
    return this.afs.collection('turnos').doc(id).update(
      datos
    );
  }

  // =====================================================================
  // Borra un turno por id
  // =====================================================================
  deleteTurno(id: string) {
    return this.afs.collection('turnos').doc(id).delete();
  }
}
