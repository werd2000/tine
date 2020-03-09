import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { ERRORES, MY_FORMATS } from 'src/app/config/config';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AreaInterface } from 'src/app/interfaces/area.interface';
import { Observable } from 'rxjs';
import { PacienteInterface } from 'src/app/interfaces/paciente.interface';
import {
  PacienteService,
  AreaService,
  PersonalService,
  TurnoService,
  UsuarioService,
  AuthenticationService
} from 'src/app/services/services.index';
import { PersonalInterface } from 'src/app/interfaces/personal.interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TurnoInterface } from 'src/app/interfaces/turno.interface';
import { startWith, map } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-add-turno',
  templateUrl: './add-turno.component.html',
  styleUrls: ['./add-turno.component.css']
})
export class AddTurnoComponent implements OnInit {

  @Output() guardado;
  diaSemana: any;
  mostrarRepetirTurno = false;
  error = ERRORES;
  forma: FormGroup;
  // estados =
  //   ['PROGRAMADO', 'RE PROGRAMADO', 'PACIENTE ESPERANDO',
  // 'DEMORADO', 'CANCELADO POR PACIENTE', 'CANCELADO POR PROFESIONAL', 'REALIZADO'];
  estados =
    ['PROGRAMADO', 'RE PROGRAMADO', 'CANCELADO POR PACIENTE',
    'CANCELADO POR PROFESIONAL', 'REALIZADO', 'NO DISPONIBLE'];
  profesionales: PersonalInterface[];
  areas: AreaInterface[];
  horario = { inicio: '08:00', fin: '20:00', paso: 300 };
  pacientesConFiltro: Observable<any[]>;
  loading: boolean;
  pacientes: PacienteInterface[];
  turno: TurnoInterface;
  creadoPor: string;

  constructor(
    public dialogRef: MatDialogRef<AddTurnoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private pacientesService: PacienteService,
    private areasService: AreaService,
    private profesionalesService: PersonalService,
    private turnosService: TurnoService,
    private usuarioService: UsuarioService,
    private authService: AuthenticationService
  ) {
    this.guardado = new EventEmitter();
  }

  ngOnInit(): void {
    this.cargarPacientes();
    this.cargarAreas();
    this.cargarProfesionales();
    this.authService.getStatus()
    .subscribe( r => this.creadoPor = r.uid);

    // console.log(this.data);
    // if (!this.data || typeof this.data === 'string') {
    if (this.data.nuevo) {
      // const fechaHoy = this.data.fecha;
      // console.log(fechaHoy);
      // console.log(this.data.nuevo);
      this.turno = {
        area: '',
        idProfesional: '',
        idPaciente: '',
        fechaInicio: this.data.fecha,
        fechaFin: this.data.fecha,
        horaInicio: null,
        horaFin: null,
        duracion: '',
        creacion: this.data.fecha,
        creadoPor: this.creadoPor,
        actualizado: this.data.fecha,
        estado: '',
        _id: ''
      };
    } else {
      this.turno = this.data;
      // console.log(this.turno);
    }

    this.forma = new FormGroup({
      idPaciente: new FormControl(this.data.paciente, Validators.required),
      fechaInicio: new FormControl(this.turno.fechaInicio, Validators.required),
      horaInicio: new FormControl(this.turno.horaInicio, Validators.required),
      fechaFin: new FormControl(this.turno.fechaFin),
      horaFin: new FormControl(this.turno.horaFin, Validators.required),
      area: new FormControl(this.turno.area),
      idProfesional: new FormControl(this.turno.idProfesional, Validators.required),
      estado:  new FormControl(this.turno.estado),
      observaciones: new FormControl(this.turno.observaciones),
      repetir: new FormControl(false)
    });

    this.pacientesConFiltro = this.forma.controls.idPaciente.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): PacienteInterface[] {
    if (typeof value === 'string') {
      const filterValue = value.toUpperCase();
      if (this.pacientes) {
        return this.pacientes.filter(
          pacs => pacs.apellido.toUpperCase().includes(filterValue) || pacs.nombre.toUpperCase().includes(filterValue) );
      }
    }
  }

  cerrarModal() {
    // Env'ip false para que no haga nada
    this.dialogRef.close(false);
  }

  actualizarHoraFin() {
    if (this.forma.controls.horaInicio.invalid) {
      return;
    }
    const arrayHora = this.forma.controls.horaInicio.value.split(':');
    const hora = parseInt(arrayHora[0], 10);
    const min = parseInt(arrayHora[1], 10);
    let nuevoMin = min + 40;
    let nuevaHora = hora;
    if (nuevoMin >= 60) {
      nuevoMin = nuevoMin - 60;
      nuevaHora += 1;
    }
    if (nuevaHora >= 24) {
      nuevaHora = 0;
    }
    let strNuevoMin = nuevoMin + '';
    if (nuevoMin < 10) {
      strNuevoMin = '0' + nuevoMin;
    }
    let strNuevaHora = nuevaHora + '';
    if (nuevaHora <= 9 ) {
      strNuevaHora = '0' + nuevaHora;
    }
    const strHoraFin = strNuevaHora + ':' + strNuevoMin;

    this.forma.controls.horaFin.setValue(strHoraFin);

    this.mostrarRepetirTurno = true;
    this.diaSemana = moment(this.forma.controls.fechaInicio.value).format('dddd') +
      ' a las ' + this.forma.controls.horaInicio.value + 'hs';
  }

  mostrarNombrePaciente(paciente?: PacienteInterface): string | undefined {
    return paciente ? paciente.apellido + ' ' + paciente.nombre : undefined;
  }

  guardarTurno() {
    if (this.forma.invalid) {
      Object.values(this.forma.controls).forEach( control => {
        control.markAsTouched();
      });
      return;
    }
    const turno = this.forma.value;
    turno.creacion = moment().format('YYYY-MM-DD');
    turno.actualizado = moment().format('YYYY-MM-DD');
    turno.creadoPor = this.creadoPor;
    const paciente = this.forma.controls.idPaciente;
    turno.idPaciente = this.forma.controls.idPaciente.value._id;
    if (this.turno._id) {
      turno._id = this.turno._id;
      // console.log(turno);
      this.turnosService.updateTurno(turno, this.turno._id)
      .then( (result) => console.log(result))
      .catch( (error) => console.log(error));
    } else {
      if (paciente.value.apellido === 'NO' && paciente.value.nombre === 'DISPONIBLE') {
        turno.estado = 'NO DISPONIBLE';
      } else {
        turno.estado = 'PROGRAMADO';
      }
      // console.log(this.forma.value);
      // primero guardo el turno
      this.turnosService.createTurno(turno)
        .then( (result) => console.log('Guardado'))
        .catch( (error) => console.log(error));
      this.repetirTurnos(turno);
    }
    // this.guardado.emit(true);
    this.dialogRef.close(turno);
  }

  cargarPacientes() {
    this.pacientesService.getPacientes()
      .subscribe( (pacs: PacienteInterface[]) => {
        this.pacientes = pacs;
      });
  }

  cargarProfesionales() {
    this.profesionalesService.getPersonal()
      .subscribe( (prof: PersonalInterface[]) => {
        this.profesionales = prof;
      });
  }

  cargarAreas() {
    this.areasService.getAreas()
      .subscribe( areas => {
        this.areas = areas;
      });
  }

  repetirTurnos(turno: TurnoInterface) {
    // console.log (this.forma.controls.repetir.value);
    if (this.forma.controls.repetir.value) {
      for (let i = 0; i < 4; i++) {
        turno.fechaInicio = moment(turno.fechaInicio).add(7, 'days').format('YYYY-MM-DD');
        turno.fechaFin = moment(turno.fechaFin).add(7, 'days').format('YYYY-MM-DD');
        // console.log('inicio', turno.fechaInicio);
        // console.log('fin', turno.fechaFin);
        this.turnosService.createTurno(turno)
        .then( (result) => console.log('resultado', result))
        .catch( (error) => console.log(error));
      }
    }
  }

  get horaInicioValida() {
    return this.forma.controls.horaInicio.invalid && this.forma.controls.horaInicio.touched;
  }
  get horaFinValida() {
    return this.forma.controls.horaFin.invalid && this.forma.controls.horaFin.touched;
  }
  get fechaInicioValida() {
    return this.forma.controls.fechaInicio.invalid && this.forma.controls.fechaInicio.touched;
  }
  get fechaFinValida() {
    return this.forma.controls.fechaFin.invalid && this.forma.controls.fechaFin.touched;
  }

}
