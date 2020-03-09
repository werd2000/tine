import { Component, OnInit, OnDestroy } from '@angular/core';
import { PacienteService, UsuarioService } from 'src/app/services/services.index';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { PacienteInterface } from 'src/app/interfaces/paciente.interface';
import { UserInterface } from 'src/app/interfaces/user.interface';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit, OnDestroy {

  loading: boolean;
  suscriptor: Subscription[] = [];
  modo: string;
  paramId: string;
  // tabActual: Observable<number>;
  nombrePaciente: string;
  paciente: PacienteInterface;
  actualizadoPor: UserInterface;

  constructor(
    private pacienteService: PacienteService,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private usuarioService: UsuarioService,
  ) {
    this.loading = false;
  }

  ngOnInit(): void {
    this.suscriptor.push(
      this.activatedRoute.queryParams.subscribe( query => {
        this.modo = query.action;
      })
    );
    this.paramId = this.activatedRoute.snapshot.params.id;
    if (this.paramId !== 'nuevo') {
      this.cargarPaciente(this.paramId);
    }
  }

  cargarPaciente(id) {
    this.loading = true;
    this.suscriptor.push(
      this.pacienteService.getPacienteById(id)
      .subscribe( (pac: any) => {
        if (pac === undefined) {
          // sweetAlert('Error', 'No se encuentra un paciente con esa identificación', 'warning');
          this.route.navigate(['pacientes']);
        } else {
          this.nombrePaciente = pac.apellido + ', ' + pac.nombre;
          this.inicializarPaciente(pac);
        }
        if (this.paciente.actualizadoPor) {
          this.suscriptor.push(
            this.usuarioService.getUserById(this.paciente.actualizadoPor)
              .subscribe( (usuario: UserInterface) => {
                this.loading = true;
                this.actualizadoPor = usuario;
                this.loading = false;
              }));
        }
      })
    );
  }

  inicializarPaciente(pac: PacienteInterface) {
    this.paciente = {
      apellido: pac.apellido,
      nombre: pac.nombre,
      tipoDoc: pac.tipoDoc,
      nroDoc: pac.nroDoc,
      nacionalidad: pac.nacionalidad,
      sexo: pac.sexo,
      fechaNac: pac.fechaNac,
      estado: pac.estado,
      fechaAlta: pac.fechaAlta,
      fechaBaja: pac.fechaBaja,
      borrado: pac.borrado,
      domicilio: pac.domicilio,
      contactos: pac.contactos,
      ssocial: pac.ssocial,
      familiares: pac.familiares,
      img: pac.img,
      observaciones: pac.observaciones,
      actualizadoEl: pac.actualizadoEl,
      actualizadoPor: pac.actualizadoPor,
      _id: pac._id
    };
  }

  ngOnDestroy() {
    this.suscriptor.forEach(element => {
      element.unsubscribe();
    });
  }

}
