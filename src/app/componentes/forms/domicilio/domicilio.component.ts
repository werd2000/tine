import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PaisService, PacienteService, DomicilioService } from 'src/app/services/services.index';

@Component({
  selector: 'app-domicilio',
  templateUrl: './domicilio.component.html',
  styleUrls: ['./domicilio.component.css']
})
export class DomicilioComponent implements OnInit {

  @Input() domicilio: any;
  @Input() tipo: string;
  @Input() modo: string;
  @Input() idPersona: string;
  ver: boolean;
  formaDomicilio: FormGroup;
  listaPaises: object[];


  constructor(
    private paisService: PaisService,
    private pacienteService: PacienteService,
    private domicilioService: DomicilioService
  ) { }

  ngOnInit(): void {
    if (this.modo === 'ver') {
      this.ver = true;
    }
    this.listaPaises = this.paisService.getPaises();
    this.crearFormulario();
  }

  crearFormulario() {
    this.formaDomicilio = new FormGroup({
      calle: new FormControl({
        value: this.domicilio.calle,
        disabled: this.ver
      }),
      casa: new FormControl({
        value: this.domicilio.casa,
        disabled: this.ver
      }),
      barrio: new FormControl({
        value: this.domicilio.barrio,
        disabled: this.ver
      }),
      ciudad: new FormControl({
        value: this.domicilio.ciudad,
        disabled: this.ver
      }),
      cp: new FormControl({
        value: this.domicilio.cp,
        disabled: this.ver
      }),
      provincia: new FormControl({
        value: this.domicilio.provincia,
        disabled: this.ver
      }),
      pais: new FormControl({
        value: this.domicilio.pais,
        disabled: this.ver
      })
    });
  }

  guardar() {
    if (!this.idPersona) {
      return;
    }
    this.domicilioService.guardarDomicilio(this.idPersona, this.tipo, this.formaDomicilio.value)
      .then( (result) => console.log('Domicilio guardado', result))
      .catch( (error) => console.log(error));
    // if (this.tipo.toLowerCase() === 'paciente') {
    //   this.pacienteService.updateDomicilio(this.formaDomicilio.value, this.idPersona)
    //     .then( (result) => console.log('Domicilio guardado', result))
    //     .catch( (error) => console.log(error)
    //     );
    // }
  }

}
