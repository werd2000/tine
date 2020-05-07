import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { faEye, faEdit, faCalendarWeek, faTrash } from '@fortawesome/free-solid-svg-icons';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { FormularioService } from 'src/app/services/services.index';
import { FormularioInterface } from 'src/app/interfaces/formulario.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formularios',
  templateUrl: './formularios.component.html',
  styleUrls: ['./formularios.component.css']
})
export class FormulariosComponent implements OnInit, AfterViewInit, OnDestroy {

  loading: boolean;
  dataToShow: string[] = ['nombre', 'descripcion', 'acciones'];
  faEye = faEye;
  faEdit = faEdit;
  faCalendarWeek = faCalendarWeek;
  faTrash = faTrash;
  dataSource: MatTableDataSource<any>;
  suscriptor: Subscription[] = [];
  listaFormularios: FormularioInterface[];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(
    private formularioService: FormularioService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.suscriptor.push(
      this.formularioService.getFormularios()
      .subscribe( (forms) => {
        this.loading = true;
        this.listaFormularios = forms;
        // console.log(this.listaFormularios);
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
      this.formularioService.getFormularios()
      .subscribe( (forms) => {
        this.dataSource = new MatTableDataSource(this.listaFormularios);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      })
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  nuevoFormulario() {
    this.router.navigate(['/formularios', 'nuevo']);
  }

  eliminar(element) {
    this.formularioService.deleteFormulario(element);
  }

  ngOnDestroy() {
    this.suscriptor.forEach(element => {
      element.unsubscribe();
    });
  }

  matSortChange() {
    console.log('sort');
  }

}
