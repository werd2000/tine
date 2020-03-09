import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EstadosPaciente } from 'src/app/globals/estadosPaciente.enum';
import { PacienteInterface } from 'src/app/interfaces/paciente.interface';
import { TipoDocService, SexoService, PacienteService, PaisService, ProvinciasArgentinasService } from 'src/app/services/services.index';
import { Countries } from 'src/app/globals/countries.enum';
import { Location } from '@angular/common';
import { ERRORES } from 'src/app/config/config';

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
  listaEstadosPacientes = Object.keys(EstadosPaciente).map(
    key => (EstadosPaciente[key]));

  constructor(
    private tipoDocService: TipoDocService,
    private sexoService: SexoService,
    private pacienteService: PacienteService,
    private location: Location,
    private paisService: PaisService,
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
    console.log(this.forma.value);
    this.pacienteService.update(this.forma.value, this.paciente._id)
    .then( (result) => console.log('Actualizado') )
    .catch( (error) => console.log(error));
  }

  cancelar() {
    this.location.back();
  }

  get nombreValido() {
    return this.forma.controls.nombre.invalid && this.forma.controls.nombre.touched;
  }

}
