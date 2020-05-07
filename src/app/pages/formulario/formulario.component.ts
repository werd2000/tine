import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { FormularioService, LoadFileService } from 'src/app/services/services.index';
import { FormularioInterface } from 'src/app/interfaces/formulario.interface';
import { FormGroup, FormControl } from '@angular/forms';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit, OnDestroy {

  loading: boolean;
  suscriptor: Subscription[] = [];
  formularioSubir: File;
  formularioTemp: any;
  archivoOk: boolean;
  formaFormulario: FormGroup;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  porcentaje: number;

  constructor(
    private formularioService: FormularioService,
    private loadFileService: LoadFileService
  ) {
    this.archivoOk = false;
  }

  ngOnInit(): void {
    this.crearFormulario();
  }

  private crearFormulario() {
    this.formaFormulario = new FormGroup({
      name: new FormControl(),
      descripcion: new FormControl(),
      file: new FormControl(),
    });
  }

  ngOnDestroy() {
    this.suscriptor.forEach(element => {
      element.unsubscribe();
    });
  }

  seleccionArchivo( archivo: File ) {
    if ( !archivo ) {
      this.formularioSubir = null;
      return;
    }
    // console.log(archivo.type);
    if ( archivo.type.indexOf('application/pdf')) {
      console.log('El archivo seleccionado no es valido');
      this.formularioSubir = null;
      this.archivoOk = false;
      return;
    }
    this.archivoOk = true;
    this.formularioSubir = archivo;
  }

  subirArchivo() {
    const formulario: FormularioInterface = {
        nombre: this.formaFormulario.controls.name.value,
        descripcion: this.formaFormulario.controls.descripcion.value,
        file: this.formularioSubir
    };
    const task = this.loadFileService.subirFormulario(formulario, 'formulario');

    this.loadFileService.uploadPercent.subscribe( (porcent) => {
      this.porcentaje = porcent;
    });

    // console.log(task);

  }

  limpiarArchivo() {
    this.formaFormulario.reset();
    this.porcentaje = 0;
  }

}
