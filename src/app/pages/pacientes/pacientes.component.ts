import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { PacienteService } from 'src/app/services/services.index';
import { PacienteInterface } from 'src/app/interfaces/paciente.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import {
  faEye,
  faEdit,
  faCalendarWeek,
  faTrash
} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit, AfterViewInit, OnDestroy {

  dataToShow: string[] = ['apellido', 'nombre', 'nroDoc', 'fechaNac', 'estado', 'acciones'];
  pacientes: PacienteInterface[];
  dataSource: MatTableDataSource<any>;
  loading = true;
  sortedData: PacienteInterface[];
  suscriptor: Subscription[] = [];
  faEye = faEye;
  faEdit = faEdit;
  faCalendarWeek = faCalendarWeek;
  faTrash = faTrash;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private pacienteService: PacienteService,
    private router: Router
  ) {  }

  ngOnInit(): void {
    this.suscriptor.push(
      this.pacienteService.getPacientes()
      .subscribe( (pacs) => {
        this.loading = true;
        this.pacientes = pacs;
        this.loading = false;
      })
    );
  }

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {
    this.suscriptor.push(
      this.pacienteService.getPacientes()
      .subscribe( (pacs) => {
        this.dataSource = new MatTableDataSource(this.pacientes);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      })
    );
  }

  eliminar(element) {
    // console.log(element);
    this.pacienteService.delete(element._id)
    .then( (data) => console.log('Eliminado', data))
    .catch( (error) => console.log(error));
  }

  matSortChange() {
    console.log('sort');
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    this.suscriptor.forEach(element => {
      element.unsubscribe();
    });
  }

  nuevoPaciente(): void {
    this.router.navigate(['/pacientes', 'nuevo']);
  }

}
