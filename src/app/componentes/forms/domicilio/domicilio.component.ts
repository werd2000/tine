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
    if (this.modo === 'view') {
      this.ver = true;
    }
    this.listaPaises = this.paisService.getPaises();
    this.crearFormulario();
  }

  crearFormulario() {
    this.formaDomicilio = new FormGroup({
      calle: new FormControl({
        value: this.domicilio.calle || null,
        disabled: this.ver
      }),
      casa: new FormControl({
        value: this.domicilio.casa || null,
        disabled: this.ver
      }),
      barrio: new FormControl({
        value: this.domicilio.barrio || null,
        disabled: this.ver
      }),
      ciudad: new FormControl({
        value: this.domicilio.ciudad || null,
        disabled: this.ver
      }),
      cp: new FormControl({
        value: this.domicilio.cp || null,
        disabled: this.ver
      }),
      provincia: new FormControl({
        value: this.domicilio.provincia || null,
        disabled: this.ver
      }),
      pais: new FormControl({
        value: this.domicilio.pais || null,
        disabled: this.ver
      })
    });
  }

  guardar() {
    if (!this.idPersona) {
      return;
    }
    console.log(this.formaDomicilio.value);
    console.log(this.tipo);
    this.domicilioService.guardarDomicilio(this.idPersona, this.tipo, this.formaDomicilio.value)
      .then( (result) => console.log('Domicilio guardado', result))
      .catch( (error) => console.log(error));
  }

}
