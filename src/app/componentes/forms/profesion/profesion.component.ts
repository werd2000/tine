import { Component, OnInit, Input } from '@angular/core';
import { PersonalInterface } from 'src/app/interfaces/personal.interface';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { ProfesionInterface } from 'src/app/interfaces/profesion.interface';
import { Router } from '@angular/router';
import { AreaService, ProfesionService } from 'src/app/services/services.index';
import { AreaInterface } from 'src/app/interfaces/area.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profesion',
  templateUrl: './profesion.component.html',
  styleUrls: ['./profesion.component.css']
})
export class ProfesionComponent implements OnInit {

  @Input() idPersona: string;
  @Input() profesion: any[];
  @Input() tipo: string;
  @Input() modo: string;
  formaProfesion: FormGroup;
  // profesion: ProfesionInterface;
  loading: boolean;
  listaAreas: AreaInterface[];
  listaProfesiones: ProfesionInterface[] = [];
  cantProfesion: number;
  suscriptor: Subscription[] = [];

  constructor(
    public router: Router,
    public areaService: AreaService,
    public profesionService: ProfesionService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.suscriptor.push(
      this.areaService.getAreas()
        .subscribe( resp => {
          // console.log(resp);
          this.listaAreas = resp;
          if (this.profesion === undefined || this.profesion === null || this.profesion.length === undefined) {
            this.listaProfesiones.push(
              {
                area: '',
                fecha: '',
                institucion: '',
                matProf: '',
                titulo: ''
              }
            );
            this.cantProfesion = 0;
          } else {
            this.listaProfesiones = this.profesion;
            this.cantProfesion = this.listaProfesiones.length;
          }
          this.crearFormulario();
          this.loading = false;
        })
    );
  }

  crearFormulario() {
    // console.log(this.listaProfesiones);
    this.formaProfesion = new FormGroup({
      profesiones: new FormArray([])
    });
    for (const profesion of this.listaProfesiones) {
      // console.log(profesion);
      this.agregarProfesion(profesion);
    }
    // for (let i = 0; i < this.listaProfesiones.length; i++) {
    // }
  }

  agregarProfesion(profesion: ProfesionInterface = null) {
    // console.log(profesion);
    if (!profesion) {
      profesion = {
        area: '',
        fecha: '',
        institucion: '',
        matProf: '',
        titulo: ''
      };
    }
    (this.formaProfesion.controls.profesiones as FormArray).push(
        new FormGroup({
          area: new FormControl( profesion.area),
          titulo: new FormControl(profesion.titulo),
          institucion: new FormControl(profesion.institucion),
          fecha: new FormControl(profesion.fecha),
          matProf: new FormControl(profesion.matProf),
        })
      );
    // this.cantProfesion = this.formaProfesion.controls.profesiones.value.length;
    // console.log(this.cantProfesion);
  }

  guardar() {
    // console.log(this.formaProfesion.value);
    if (!this.idPersona) {
      return;
    }
    // console.log(this.formaProfesion.value.profesiones);
    // console.log(this.tipo);
    this.profesionService.guardarProfesion(this.idPersona, this.tipo, this.formaProfesion.value.profesiones)
      .then( (result) => console.log('Profesion guardada', result))
      .catch( (error) => console.log(error));

    // if (!this.persona._id) {
    //   return;
    // } else {
    //   // console.log(this.formaContacto.value);
    //   this.persona.profesion = this.formaProfesion.value.profesiones;
    //   const persona = JSON.stringify(this.persona);
    //   this.profesionService.guardarProfesion(JSON.parse(persona), this.tipo);
    // }
  }

  quitarProfesion(i) {
    console.log(i);
  }

  editarProfesion() {
    // this.router.navigate(['/' + this.tipo + '/editar/' + this.persona._id + '/5']);
  }

  get profesiones(): FormArray {
    return this.formaProfesion.get('profesiones') as FormArray;
  }

}
