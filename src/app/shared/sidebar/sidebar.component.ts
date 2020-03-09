import { Component, OnInit } from '@angular/core';
import {
  faDesktop,
  faUserInjured,
  faUserTie,
  faCalendarAlt,
  faFileMedical,
  faFileContract,
  faCalendarWeek,
  faCalendar,
  faUsers,
  faBriefcase,
  faPhoneSquare,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  faDescktop = faDesktop;
  faUserInjured = faUserInjured;
  faUserTie = faUserTie;
  faCalendarAlt = faCalendarAlt;
  faFileMedical = faFileMedical;
  faFileContract = faFileContract;
  faCalendarWeek = faCalendarWeek;
  faCalendar = faCalendar;
  faUsers = faUsers;
  faBriefcase = faBriefcase;
  faPhoneSquare = faPhoneSquare;
  faSignOutAlt = faSignOutAlt;

  constructor() { }

  ngOnInit(): void { }

}
