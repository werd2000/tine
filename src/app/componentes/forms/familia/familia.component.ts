import { Component, OnInit, Input } from '@angular/core';
import { FamiliaInterface } from 'src/app/interfaces/familia.interface';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FamiliaService } from 'src/app/services/services.index';
import { RELACIONES } from 'src/app/config/config';

@Component({
  selector: 'app-familia',
  templateUrl: './familia.component.html',
  styleUrls: ['./familia.component.css']
})
export class FamiliaComponent implements OnInit {

  @Input() idPersona: string;
  @Input() familiaPersona: FamiliaInterface[];
  @Input() tipo: string;
  @Input() modo: string;
  loading: boolean;
  formaFamilia: FormGroup;
  suscriptor: Subscription[] = [];
  faTrash = faTrash;
  listaFamilia: FamiliaInterface[] = [];
  cantFamiliares: number;
  relaciones = RELACIONES;


  constructor(
    private familiaService: FamiliaService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    if (this.familiaPersona === undefined || this.familiaPersona === null || this.familiaPersona.length === undefined) {
      this.listaFamilia.push(
        {
          relacion: '',
          apellido: '',
          nombre: '',
          nroDoc: '',
          observaciones: ''
        }
      );
      this.cantFamiliares = 0;
    } else {
      this.listaFamilia = this.familiaPersona;
      this.cantFamiliares = this.familiaPersona.length;
    }
    this.crearFormulario();
    this.loading = false;
  }

  crearFormulario() {
    this.formaFamilia = new FormGroup({
      familiares: new FormArray([])
    });
    for (const fami of this.listaFamilia) {
      // console.log(contacto);
      this.agregarFamilia(fami);
    }
  }

  agregarFamilia(familia: FamiliaInterface = null) {
    if (!familia) {
      familia = {
        relacion: '',
        apellido: '',
        nombre: '',
        nroDoc: '',
        observaciones: ''
      };
    }
    (this.formaFamilia.controls.familiares as FormArray).push(
      new FormGroup({
        relacion: new FormControl( familia.relacion ),
        apellido: new FormControl( familia.apellido ),
        nombre: new FormControl( familia.nombre ),
        nroDoc: new FormControl( familia.nroDoc),
        observaciones: new FormControl( familia.observaciones )
      })
    );
  }

  guardar() {
    // console.log(this.tipo);
    if (!this.idPersona) {
      return;
    }
    this.familiaService.guardarFamilia(this.idPersona, this.tipo, this.formaFamilia.value.familiares)
      .then( (result) => console.log('Familia guardado', result))
      .catch( (error) => console.log(error));
  }

  get familiares(): FormArray {
    return this.formaFamilia.get('familiares') as FormArray;
  }

  eliminar(i) {
    console.log(i);
    const control = this.formaFamilia.controls.familiares as FormArray;
    control.removeAt(i);
    this.guardar();
  }


}
