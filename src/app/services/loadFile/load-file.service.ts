import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FileItemInterface } from '../../interfaces/file-items.interface';
import 'firebase/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FormularioInterface } from 'src/app/interfaces/formulario.interface';
import { FormularioService } from '../formulario/formulario.service';

@Injectable({
  providedIn: 'root'
})
export class LoadFileService {

  private FOLDER_FORMULARIOS = 'formularios';
  public uploadPercent: Observable<number>;
  public downloadURL: Observable<string>;

  constructor(
    private storage: AngularFireStorage,
    private formularioService: FormularioService
    // private afs: AngularFirestore
  ) { }

  subirFormulario( formulario: FormularioInterface , tipo: string ) {
    const ref = this.storage.ref(`/${this.FOLDER_FORMULARIOS}/${formulario.file.name}`);
    const task = ref.put(formulario.file);
    this.uploadPercent = task.percentageChanges();
    // // get notified when the download URL is available
    return task.snapshotChanges().pipe(
        finalize(() => {
          // obtengo url
          ref.getDownloadURL()
            .subscribe( (u) => {
              // console.log(u);
              delete formulario.file;
              formulario.url = u;
              this.formularioService.createFormulario(formulario);
            });
        })
     )
    .subscribe();
    // return task;

  }
}
