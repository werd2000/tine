import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EstadosPaciente } from 'src/app/globals/estadosPaciente.enum';
import { PacienteInterface } from 'src/app/interfaces/paciente.interface';
import {
  TipoDocService, SexoService, PacienteService, PaisService,
  ProvinciasArgentinasService, AuthenticationService, UsuarioService
} from 'src/app/services/services.index';
import { Countries } from 'src/app/globals/countries.enum';
import { Location } from '@angular/common';
import { ERRORES } from 'src/app/config/config';
import { Subscription } from 'rxjs';
import { UserInterface } from 'src/app/interfaces/user.interface';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paciente-principal',
  templateUrl: './paciente-principal.component.html',
  styleUrls: ['./paciente-principal.component.css']
})
export class PacientePrincipalComponent implements OnInit {

  forma: FormGroup;
  error = ERRORES;
  @Input() paciente: PacienteInterface;
  listaTipoDoc: string[];
  listaSexos: string[];
  listaNacionalidad: object[];
  suscriptor: Subscription[] = [];
  actualizadoPor: UserInterface;
  listaEstadosPacientes = Object.keys(EstadosPaciente).map(
    key => (EstadosPaciente[key]));

  constructor(
    private tipoDocService: TipoDocService,
    private sexoService: SexoService,
    private pacienteService: PacienteService,
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
  }

  crearFormulario() {
    this.forma = new FormGroup({
      nombre: new FormControl( this.paciente.nombre, Validators.required),
      apellido: new FormControl( this.paciente.apellido, Validators.required),
      tipoDoc: new FormControl( this.paciente.tipoDoc ),
      nroDoc: new FormControl( this.paciente.nroDoc, Validators.required),
      sexo: new FormControl( this.paciente.sexo),
      nacionalidad: new FormControl( this.paciente.nacionalidad ),
      fechaNac: new FormControl( this.paciente.fechaNac ) || null,
      fechaAlta: new FormControl( this.paciente.fechaAlta ),
      fechaBaja: new FormControl( this.paciente.fechaBaja ),
      estado: new FormControl( this.paciente.estado ),
      observaciones: new FormControl( this.paciente.observaciones || null )
    });
  }

  guardar() {
    if (this.paciente._id === undefined) {
      this.crearPaciente();
    } else {
      this.editarPaciente();
    }
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

  editarPaciente() {
    if (this.forma.valid) {
      this.pacienteService.update(this.forma.value, this.paciente._id)
      .then( (result) => console.log('Actualizado') )
      .catch( (error) => console.log(error));
    }
  }

  crearPaciente() {
    this.suscriptor.push(
      this.authService.getStatus().subscribe( (user) => {
        this.usuarioService.getUserById(user.uid).subscribe( (usuario: UserInterface) => {
          this.actualizadoPor = usuario;
          this.paciente = {
            apellido: this.forma.controls.apellido.value,
            nombre: this.forma.controls.nombre.value,
            tipoDoc: this.forma.controls.tipoDoc.value,
            nroDoc: this.forma.controls.nroDoc.value,
            nacionalidad: this.forma.controls.nacionalidad.value,
            sexo: this.forma.controls.sexo.value,
            fechaNac: this.forma.controls.fechaNac.value,
            estado: this.forma.controls.estado.value,
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
          this.pacienteService.createPaciente(this.paciente)
          .then( (result) => {
            console.log('Creado', result);
            this.router.navigate(['/pacientes', result]);
          })
          .catch( (error) => console.log(error));
        });
      })
    );
  }

}
