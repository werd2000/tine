import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PersonalService } from 'src/app/services/services.index';
import { Subscription } from 'rxjs/internal/Subscription';
import { PersonalInterface } from 'src/app/interfaces/personal.interface';
import {
  faEye,
  faEdit,
  faCalendarWeek,
  faTrash
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profesionales',
  templateUrl: './profesionales.component.html',
  styleUrls: ['./profesionales.component.css']
})
export class ProfesionalesComponent implements OnInit, AfterViewInit, OnDestroy {

  dataToShow: string[] = ['apellido', 'nombre', 'nroDoc', 'fechaNac', 'area', 'acciones'];
  loading: boolean;
  sortedData: PersonalInterface[];
  dataSource: MatTableDataSource<any>;
  suscriptor: Subscription[] = [];
  profesionales: PersonalInterface[];
  faEye = faEye;
  faEdit = faEdit;
  faCalendarWeek = faCalendarWeek;
  faTrash = faTrash;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private personalService: PersonalService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.suscriptor.push(
      this.personalService.getPersonal()
      .subscribe( (prof: any) => {
        this.loading = true;
        this.profesionales = prof;
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
      this.personalService.getPersonal()
      .subscribe( (prof) => {
        this.dataSource = new MatTableDataSource(this.profesionales);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      })
    );
  }

  nuevoProfesional() {
    this.router.navigate(['/profesionales', 'nuevo']);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  eliminar(element) {
    console.log(element);
    this.personalService.delete(element._id)
    .then( (data) => console.log('Eliminado', data))
    .catch( (error) => console.log(error));
  }

  matSortChange() {
    console.log('sort');
  }

  ngOnDestroy() {
    this.suscriptor.forEach(element => {
      element.unsubscribe();
    });
  }

}
