import { LOCALE_ID, Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { TurnosFunctions } from './turnos.functions';
import { UsuarioService, PacienteService, PersonalService, TurnoService, AuthenticationService } from 'src/app/services/services.index';
import { Subscription } from 'rxjs';
import { PersonalInterface } from 'src/app/interfaces/personal.interface';
import {
  faTrashAlt,
  faCheckCircle,
  faAngleDoubleLeft,
  faAngleDoubleRight
} from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { AddTurnoComponent } from './add-turno.component';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { UserInterface } from 'src/app/interfaces/user.interface';
declare var $: any;

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css'],
  providers: [
    // { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    // { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    { provide: LOCALE_ID, useValue: 'es-AR'}
  ]
})
export class TurnosComponent implements OnInit, OnDestroy {

  @Output() actualizar = new EventEmitter();
  loading: boolean;
  widthColumnD: string;
  widthColumnE: string;
  columns = [];
  fecha: moment.Moment;
  turnosFunction: any;
  cantProfesionales: number;
  turnos: any;
  suscriptor: Subscription[] = [];
  idProf: string;
  faTrashAlt = faTrashAlt;
  faCheckCircle = faCheckCircle;
  faAngleDoubleLeft = faAngleDoubleLeft;
  faAngleDoubleRight = faAngleDoubleRight;
  user: UserInterface;


  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService,
    private usuarioService: UsuarioService,
    private pacienteService: PacienteService,
    private personalService: PersonalService,
    public turnosService: TurnoService,
    public dialog: MatDialog,
  ) {
    $('#toast').toast({delay: 900000});
  }

  ngOnInit(): void {
    this.fecha = moment();
    this.turnosFunction = new TurnosFunctions(
      this.usuarioService,
      this.pacienteService,
      this.personalService
    );
    this.suscriptor.push(
      this.authService.getStatus()
      .subscribe( (user) => {
        if (user) {
          this.suscriptor.push(
            this.usuarioService.getUserById(user.uid)
            .subscribe( (usuario: UserInterface) => {
              this.user = usuario;
              this.cargaTurnos();
            })
          );
        }
      })
    );
  }

  cargaTurnos() {
    if (this.user.role === 'ROLE_USER') {
      this.cargarTurnosProf(this.user._id);
    } else {
      this.cargarTurnos();
    }
  }

  marcarRealizado(t: any) {
    console.log(t);
    const turno = {
      _id : t._id,
      actualizado : t.actualizado,
      area : t.area,
      creacion : t.creacion,
      creadoPor : t.creadoPor,
      estado : 'REALIZADO',
      fechaFin : t.fechaFin,
      fechaInicio : t.fechaInicio,
      horaFin : t.horaFin,
      horaInicio : t.horaInicio,
      idPaciente : t.idPaciente,
      idProfesional : t.idProfesional,
      observaciones : t.observaciones,
      repetir : t.repetir,
    };
    console.log(turno);
    this.turnosService.updateTurno(turno, turno._id)
    .then( (result) => console.log('Actualizado'))
    .catch( (error) => console.log(error));
    this.cargaTurnos();
  }

  editarTurno(t: any) {
    const arrayT = [t];
    const dialogRef = this.dialog.open(AddTurnoComponent, {
      width: '50%',
      data: arrayT[0]
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
      if (result) {
        // this.actualizar.emit(true);
        $('#toast').toast('show');
        console.log($('.toast')[0].attributes.class);
        this.cargaTurnos();
      }
    });
  }

  cargarTurnos() {
    this.cantProfesionales = 0;
    this.suscriptor.push(this.personalService.getPersonal()
      .subscribe( (personal: PersonalInterface[]) => {
        this.columns = [];
        this.loading = true;
        personal.forEach(profesional => {
          // console.log(profesional);
          if (profesional.profesion[0].area !== 'ADMINISTRACION') {
            this.cantProfesionales++;
            this.suscriptor.push(
              this.turnosService.getTurnosFechaProfesional(this.fecha.format('YYYY-MM-DD'), profesional._id)
                .subscribe(async (t: any) => {
                  this.turnos = t;
                  this.turnos.sort((a, b) => {
                      const x = a.horaInicio.toLowerCase();
                      const y = b.horaInicio.toLowerCase();
                      if (x < y) {return -1; }
                      if (x > y) {return 1; }
                      return 0;
                  });

                  await this.turnos.forEach(
                    // this.turnosFunction.paraMostrar.bind(this)
                    this.turnosFunction.configuraPaciente.bind(this)
                  );
                  await this.turnos.forEach(
                    // this.turnosFunction.paraMostrar.bind(this)
                    this.turnosFunction.configuraProfesional.bind(this)
                  );
                  await this.turnos.forEach(
                    this.turnosFunction.configuraEstado.bind(this)
                  );
                  await this.turnos.forEach(
                    this.turnosFunction.configuraUsuario.bind(this)
                  );
                  await this.turnos.forEach(
                    this.turnosFunction.calcularDuracion.bind(this)
                  );
                  await this.turnos.forEach(
                    this.turnosFunction.configurarTop.bind(this)
                  );
                  // console.log(this.turnos);

                  this.columns.push({
                      head: profesional,
                      campo: profesional.nombre,
                      id: profesional._id,
                      turnos: this.turnos
                    });
                })
              );
          }
        });

        const elem = document.getElementById('turnos');
        // this.widthColumnE = (elem.offsetWidth / this.cantProfesionales) + 'px';
        this.widthColumnE = (100 / this.cantProfesionales) + '%';
        const elemT = document.getElementById('turnos');
        this.widthColumnD = (elemT.offsetWidth / this.cantProfesionales) - 1 + 'px';
        // this.widthColumnD = elemT.offsetWidth + 'px';
        this.loading = false;

      })
    );
  }

  cargarTurnosProf(idProf: string) {
    this.cantProfesionales = 1;
    // this.suscriptor.push(this.personalService.getPersonalId(idProf)
    this.suscriptor.push(this.personalService.searchPersonal('uidUsuario', idProf)
      .subscribe( (profesional) => {
        this.columns = [];
        this.loading = true;
        this.suscriptor.push(
          this.turnosService.getTurnosFechaProfesional(this.fecha.format('YYYY-MM-DD'), profesional[0]._id)
            .subscribe(async (t: any) => {
              // console.log(t);
              this.turnos = t;
              this.turnos.sort((a, b) => {
                const x = a.horaInicio.toLowerCase();
                const y = b.horaInicio.toLowerCase();
                if (x < y) { return -1; }
                if (x > y) {return 1; }
                return 0;
              });

              await this.turnos.forEach(
                // this.turnosFunction.paraMostrar.bind(this)
                this.turnosFunction.configuraPaciente.bind(this)
              );
              await this.turnos.forEach(
                // this.turnosFunction.paraMostrar.bind(this)
                this.turnosFunction.configuraProfesional.bind(this)
              );
              await this.turnos.forEach(
                this.turnosFunction.configuraEstado.bind(this)
              );
              await this.turnos.forEach(
                this.turnosFunction.configuraUsuario.bind(this)
              );
              await this.turnos.forEach(
                this.turnosFunction.calcularDuracion.bind(this)
              );
              await this.turnos.forEach(
                this.turnosFunction.configurarTop.bind(this)
              );
              // console.log(this.turnos);

              this.columns.push({
                  head: profesional,
                  campo: profesional[0].nombre,
                  id: profesional[0]._id,
                  turnos: this.turnos
                });
              })
        );

        const elem = document.getElementById('turnos');
        this.widthColumnE = (100 / this.cantProfesionales) + '%';
        // const elemT = document.getElementById('turnos');
        this.widthColumnD = (elem.offsetWidth) - 1 + 'px';
        this.loading = false;
      })
    );

  }

  hoy() {
    this.fecha = moment();
    this.cargaTurnos();
  }

  diaAnterior() {
    const diaAnterior = moment(this.fecha).subtract(1, 'days');
    this.fecha = diaAnterior;
    this.cargaTurnos();
  }

  cambiarFecha(event) {
    console.log(event.target.value);
    this.fecha = moment(event.target.value);
    this.cargaTurnos();
  }

  diaSiguiente() {
    const diaSiguiente = moment(this.fecha).add(1, 'days');
    this.fecha = diaSiguiente;
    this.cargaTurnos();
  }

  nuevo(): void {
    const dialogRef = this.dialog.open(AddTurnoComponent, {
      width: '50%',
      data: {fecha: this.fecha.format('YYYY-MM-DD'), nuevo: true}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Nuevo: ', result);
      }
      this.cargaTurnos();
    });
  }

  eliminarTurno(t: any) {
    Swal.fire({
      title: 'Atención, está por borrar datos',
      text: 'Una vez borrados, no se podrán recuperar',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Estoy seguro!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        // console.log(t);
        this.turnosService.deleteTurno(t._id)
        .then ( (res) => {
          Swal.fire(
            'Borrado!',
            `Los datos del turno de ${ t.paciente.apellido } se borraron correctamente`,
            'success'
          );
          this.cargaTurnos();
        })
        .catch( (error) => {
          console.log(error);
        });
      }
    });
  }

  ngOnDestroy() {
    this.suscriptor.forEach(element => {
      element.unsubscribe();
    });
  }

}
