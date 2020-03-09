import { Injectable } from '@angular/core';
import { UserInterface } from 'src/app/interfaces/user.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { auth } from 'firebase/app';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario: UserInterface;

  constructor(
    private afs: AngularFirestore,
  ) { }

  getUsers() {
    return this.afs.collection('usuarios');
  }

  getUserById(uid: string) {
    return this.afs.doc('usuarios/' + uid).valueChanges();
  }

  createUser(user) {
    return this.afs.doc('usuarios/' + user.uid).set(user);
  }

  editUser(user) {
    return this.afs.doc('usuarios/' + user.uid).set(user);
  }

}
