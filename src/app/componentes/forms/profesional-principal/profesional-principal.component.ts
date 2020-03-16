import { Component, OnInit, Input } from '@angular/core';
import { PersonalInterface } from 'src/app/interfaces/personal.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  TipoDocService, SexoService, PacienteService, PaisService,
  ProvinciasArgentinasService, AuthenticationService, UsuarioService, PersonalService
} from 'src/app/services/services.index';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { ERRORES } from 'src/app/config/config';
import { Location } from '@angular/common';
import { UserInterface } from 'src/app/interfaces/user.interface';
import * as moment from 'moment';

@Component({
  selector: 'app-profesional-principal',
  templateUrl: './profesional-principal.component.html',
  styleUrls: ['./profesional-principal.component.css']
})
export class ProfesionalPrincipalComponent implements OnInit {

  @Input() profesional: PersonalInterface;
  @Input() action: string;
  forma: FormGroup;
  error = ERRORES;
  listaTipoDoc: string[];
  listaSexos: string[];
  listaNacionalidad: object[];
  suscriptor: Subscription[] = [];
  actualizadoPor: UserInterface;

  constructor(
    private tipoDocService: TipoDocService,
    private sexoService: SexoService,
    private personalService: PersonalService,
    private location: Location,
    private paisService: PaisService,
    private authService: AuthenticationService,
    private usuarioService: UsuarioService,
    private router: Router,
    // private provinciasArgentinas: ProvinciasArgentinasService
  ) { }

  ngOnInit(): void {
    this.listaNacionalidad = this.paisService.getPaises();
    // this.provinciasArgentinas.getProvincias()
    //   .subscribe( p => console.log(p));
    this.listaTipoDoc = this.tipoDocService.tipoDoc;
    this.listaSexos = this.sexoService.sexos;
    this.crearFormulario();
    if (this.action && this.action.toLowerCase() === 'view') {
      this.forma.disable();
    }
  }

  crearFormulario() {
    this.forma = new FormGroup({
      nombre: new FormControl( this.profesional.nombre, Validators.required),
      apellido: new FormControl( this.profesional.apellido, Validators.required),
      tipoDoc: new FormControl( this.profesional.tipoDoc ),
      nroDoc: new FormControl( this.profesional.nroDoc, Validators.required),
      sexo: new FormControl( this.profesional.sexo),
      nacionalidad: new FormControl( this.profesional.nacionalidad ),
      fechaNac: new FormControl( this.profesional.fechaNac ) || null,
      fechaAlta: new FormControl( this.profesional.fechaAlta ),
      fechaBaja: new FormControl( this.profesional.fechaBaja ),
      observaciones: new FormControl( this.profesional.observaciones || null )
    });
  }

  guardar() {
    if (this.profesional._id === undefined) {
      this.crearProfesional();
    } else {
      this.editarProfesional();
    }
  }

  editarProfesional() {
    if (this.forma.valid) {
      console.log(this.forma.value);
      this.personalService.update(this.forma.value, this.profesional._id)
      .then( (result) => console.log('Actualizado') )
      .catch( (error) => console.log(error));
    }
  }

  crearProfesional() {
    this.suscriptor.push(
      this.authService.getStatus().subscribe( (user) => {
        this.usuarioService.getUserById(user.uid).subscribe( (usuario: UserInterface) => {
          this.actualizadoPor = usuario;
          this.profesional = {
            apellido: this.forma.controls.apellido.value.toUpperCase(),
            nombre: this.forma.controls.nombre.value.toUpperCase(),
            tipoDoc: this.forma.controls.tipoDoc.value,
            nroDoc: this.forma.controls.nroDoc.value,
            nacionalidad: this.forma.controls.nacionalidad.value,
            sexo: this.forma.controls.sexo.value,
            fechaNac: this.forma.controls.fechaNac.value,
            fechaAlta: this.forma.controls.fechaAlta.value,
            fechaBaja: this.forma.controls.fechaBaja.value,
            borrado: false,
            domicilio: {},
            contactos: null,
            ssocial: null,
            familiares: null,
            img: '',
            observaciones: this.forma.controls.observaciones.value,
            actualizadoEl: moment().format('YYYY-MM-DD'),
            actualizadoPor: this.actualizadoPor._id
          };
          // console.log(this.paciente);
          this.personalService.createPersonal(this.profesional)
          .then( (result) => {
            console.log('Creado', result);
            this.router.navigate(['/profesionales', result]);
          })
          .catch( (error) => console.log(error));
        });
      })
    );
  }

  cancelar() {
    this.location.back();
  }

  get nombreValido() {
    return this.forma.controls.nombre.invalid && this.forma.controls.nombre.touched;
  }

  get apellidoValido() {
    return this.forma.controls.apellido.invalid && this.forma.controls.apellido.touched;
  }

  get numeroDocValido() {
    return this.forma.controls.nroDoc.invalid && this.forma.controls.nroDoc.touched;
  }

}
