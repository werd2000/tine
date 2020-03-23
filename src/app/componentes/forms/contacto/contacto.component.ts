import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { ContactoInterface } from 'src/app/interfaces/contacto.interface';
import { TipoContactoService, ContactoService } from 'src/app/services/services.index';
import { Subscription } from 'rxjs';
import { tipoContactoInterface } from 'src/app/interfaces/tipoContacto.interface';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit, OnDestroy {

  @Input() idPersona: string;
  @Input() contactosPersona: ContactoInterface[];
  @Input() tipo: string;
  @Input() modo: string;
  loading: boolean;
  formaContacto: FormGroup;
  listaContactos: ContactoInterface[] = [];
  listaTipoContactos: tipoContactoInterface[];
  cantContactos: number;
  suscriptor: Subscription[] = [];
  faTrash = faTrash;

  constructor(
    private tipoContactoService: TipoContactoService,
    private contactosService: ContactoService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.suscriptor.push(
      this.tipoContactoService.getTiposContactos()
      .subscribe( (res: tipoContactoInterface[]) => {
        this.listaTipoContactos = res;
        if (this.contactosPersona === undefined || this.contactosPersona === null || this.contactosPersona.length === undefined) {
          this.listaContactos.push(
            {
              tipo: '',
              valor: '',
              observaciones: ''
            }
          );
          this.cantContactos = 0;
        } else {
          this.listaContactos = this.contactosPersona;
          this.cantContactos = this.contactosPersona.length;
        }
        // console.log(this.listaContactos);
        this.crearFormulario();
        this.loading = false;
      })
    );
  }

  crearFormulario() {
    this.formaContacto = new FormGroup({
      contactos: new FormArray([])
    });
    for (const contacto of this.listaContactos) {
      // console.log(contacto);
      this.agregarContacto(contacto);
    }
  }

  agregarContacto(contacto: ContactoInterface = null) {
    // console.log(contacto);
    if (!contacto) {
      contacto = {
        tipo: '',
        valor: '',
        observaciones: ''
      };
    }
    (this.formaContacto.controls.contactos as FormArray).push(
      new FormGroup({
        tipo: new FormControl( contacto.tipo ),
        valor: new FormControl( contacto.valor ),
        observaciones: new FormControl(contacto.observaciones)
      })
    );
    // this.cantContactos = this.formaContacto.controls.contactos.value.length;
  }

  guardar() {
    // console.log(this.tipo);
    if (!this.idPersona) {
      return;
    }
    this.contactosService.guardarContacto(this.idPersona, this.tipo, this.formaContacto.value.contactos)
      .then( (result) => console.log('Contacto guardado', result))
      .catch( (error) => console.log(error));

  }

  ngOnDestroy() {
    this.suscriptor.forEach(sus => {
      sus.unsubscribe();
    });
  }

  get contactos(): FormArray {
    return this.formaContacto.get('contactos') as FormArray;
  }

  eliminar(i) {
    console.log(i);
    const control = this.formaContacto.controls.contactos as FormArray;
    control.removeAt(i);
  }

}
