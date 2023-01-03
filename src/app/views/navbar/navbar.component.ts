import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Languages} from "../../models/languages";

@Component({
  selector: 'sai-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() webId!: string | null;
  // @Input() languageSelect = Array<Languages>();
  @Input() languageSelect = Languages;
  // @Input() languageSelect = AllLanguages;
  // @Output() selectedLanguage = new EventEmitter<Languages>();

  constructor(
  ) {}

  ngOnInit(): void {}

}
