import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Router} from "@angular/router";
import {Languages} from "../../languages";
import { faHome, faBell } from "@fortawesome/free-solid-svg-icons";
import {log} from "util";

@Component({
  selector: 'sai-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  faHome = faHome;
  faBell = faBell;

  @Input() webId!: string | null;
  @Input() isLoggedIn  = false;
  @Input() withNotificationsAction = true;
  @Input() languageSelect = Languages;

  @Output() notifications = new EventEmitter();

  public routes = [
    { path: '/dashboard', label: 'APP.HOME' },
    { path: '/applications', label: 'APP.NAV-APPS' },
    { path: '/social-agents', label: 'APP.NAV-PEERS' },
    { path: '/data', label: 'APP.NAV-DATA' },
  ]

  constructor(
    public router: Router,
  ) {}

  protected readonly log = log;
}
