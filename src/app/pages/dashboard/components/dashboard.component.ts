import { Component, OnInit, OnDestroy } from '@angular/core';
import { PacienteService, PersonalService, AreaService, TurnoService, AuthenticationService } from 'src/app/services/services.index';
import * as moment from 'moment';
import { Subscription } from 'rxjs/internal/Subscription';
import { Observable } from 'rxjs';
import { PacienteInterface } from 'src/app/interfaces/paciente.interface';
import { PersonalInterface } from 'src/app/interfaces/personal.interface';
import { AreaInterface } from 'src/app/interfaces/area.interface';
import { TurnoInterface } from 'src/app/interfaces/turno.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  cantPacTrat: number;
  cantPacEval: number;
  fecha: moment.Moment;
  areas: Observable<AreaInterface[]>;
  turnos: Observable<TurnoInterface[]>;
  pacientes: Observable<PacienteInterface[]>;
  personal: Observable<PersonalInterface[]>;
  suscriptor: Subscription[] = [];

  constructor(
    private pacienteService: PacienteService,
    private personalService: PersonalService,
    private areaService: AreaService,
    private turnoService: TurnoService,
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.getStatus().subscribe( (user) => {
      if (!user) {
        this.router.navigate(['/login']);
      }
    }
    );
    this.fecha = moment();
    this.pacientes = this.pacienteService.getPacientes();
    this.suscriptor.push(
      this.pacienteService.getPacientes('estado')
      .subscribe( (pac) => {
        // this.cantPacientes = pac.length;
        this.cantPacTrat = pac.filter(this.filtrarPorEstadoTratamiento).length;
        this.cantPacEval = pac.filter(this.filtrarPorEstadoEvaluacion).length;
      })
    );
    this.personal = this.personalService.getPersonal();
    this.areas = this.areaService.getAreas();
    this.turnos = this.turnoService.searchTurnos('fechaInicio', this.fecha.format('YYYY-MM-DD'));
  }

  ngOnDestroy() {
    this.suscriptor.forEach(element => {
      element.unsubscribe();
    });
  }

  filtrarPorEstadoTratamiento(obj) {
    if ('estado' in obj && typeof(obj.estado) === 'string' && obj.estado === 'TRATAMIENTO') {
      return true;
    } else {
      return false;
    }
  }

  filtrarPorEstadoEvaluacion(obj) {
    if ('estado' in obj && typeof(obj.estado) === 'string' && obj.estado === 'EVALUACION') {
      return true;
    } else {
      return false;
    }
  }

}
