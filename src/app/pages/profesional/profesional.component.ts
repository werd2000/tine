import { Component, OnInit, OnDestroy } from '@angular/core';
import { PersonalInterface } from 'src/app/interfaces/personal.interface';
import { Subscription } from 'rxjs';
import { UserInterface } from 'src/app/interfaces/user.interface';
import { PersonalService, UsuarioService, AuthenticationService } from 'src/app/services/services.index';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-profesional',
  templateUrl: './profesional.component.html',
  styleUrls: ['./profesional.component.css']
})
export class ProfesionalComponent implements OnInit, OnDestroy {

  loading: boolean;
  suscriptor: Subscription[] = [];
  modo: string;
  paramId: string;
  // tabActual: Observable<number>;
  nombreProfesional: string;
  profesional: PersonalInterface;
  actualizadoPor: UserInterface;

  constructor(
    private profesionalService: PersonalService,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private usuarioService: UsuarioService,
    private authService: AuthenticationService
  ) {
    this.loading = false;
  }

  ngOnInit(): void {
    this.suscriptor.push(
      this.activatedRoute.queryParams.subscribe( query => {
        this.modo = query.action;
      })
    );
    this.suscriptor.push(
      this.activatedRoute.params.subscribe(
        (param) => {
          this.paramId = param.id;
          if (this.paramId !== 'nuevo') {
            // console.log(this.paramId);
            this.cargarProfesional(this.paramId);
          } else {
            this.crearProfesional();
          }
        }
      )
    );
  }

  crearProfesional() {
    this.nombreProfesional = 'Profesional nuevo';
    this.profesional = {
      apellido: '',
      nombre: '',
      tipoDoc: 'DNI',
      nroDoc: '',
      nacionalidad: null,
      sexo: '',
      fechaNac: '',
      fechaAlta: moment().format('YYYY-MM-DD'),
      fechaBaja: '',
      borrado: false,
      domicilio: {},
      contactos: null,
      ssocial: null,
      familiares: null,
      img: '',
      observaciones: '',
      actualizadoEl: moment().format('YYYY-MM-DD'),
      actualizadoPor: ''
    };
  }

  cargarProfesional(id) {
    this.loading = true;
    this.suscriptor.push(
      this.profesionalService.getPersonalId(id)
      .subscribe( (prof: any) => {
        // console.log(prof);
        if (prof === undefined) {
          this.route.navigate(['profesionales']);
        } else {
          this.nombreProfesional = prof.apellido + ', ' + prof.nombre;
          this.inicializarProfesional(prof);
        }
        if (this.profesional.actualizadoPor) {
          this.suscriptor.push(
            this.usuarioService.getUserById(this.profesional.actualizadoPor)
              .subscribe( (usuario: UserInterface) => {
                this.loading = true;
                this.actualizadoPor = usuario;
                this.loading = false;
              })
          );
        }
      })
    );
  }

  inicializarProfesional(prof: PersonalInterface) {
    this.profesional = {
      apellido: prof.apellido,
      nombre: prof.nombre,
      tipoDoc: prof.tipoDoc,
      nroDoc: prof.nroDoc,
      nacionalidad: prof.nacionalidad,
      sexo: prof.sexo,
      fechaNac: prof.fechaNac,
      fechaBaja: prof.fechaNac,
      fechaAlta: prof.fechaNac,
      borrado: prof.borrado,
      domicilio: prof.domicilio,
      contactos: prof.contactos,
      ssocial: prof.ssocial,
      familiares: prof.familiares,
      profesion: prof.profesion,
      img: prof.img,
      observaciones: prof.observaciones,
      actualizadoPor: prof.actualizadoPor,
      actualizadoEl: prof.actualizadoEl,
      _id: prof._id
    };
  }

  ngOnDestroy() {
    this.suscriptor.forEach(element => {
      element.unsubscribe();
    });
  }

}
