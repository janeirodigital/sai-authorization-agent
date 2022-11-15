import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

interface Languages {
  value: string;
}

@Component({
  selector: 'sai-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {

  @Input() languageSelector = Array<Languages>;
  @Output() selectedLanguage = new EventEmitter<Languages>();

  constructor() { }

  ngOnInit(): void {
  }

  public handleSelectLanguage(language: Languages): void {
    this.selectedLanguage.emit(language);
  }

}
