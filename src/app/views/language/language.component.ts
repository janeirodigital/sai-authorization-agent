import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Languages} from "../../models/languages";

@Component({
  selector: 'sai-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {

  @Input() languages = Languages;
  // @Output() selectedLanguage = new EventEmitter<Languages>();

  constructor() { }

  ngOnInit(): void {
  }

  // public handleSelectLanguage(language: Languages): void {
    //this.selectedLanguage.emit(language);
  // }

  // export const LanguageSelectClose = Template.bind({});
  // LanguageSelectClose.args = {
  //   languages: ['English', 'Español'],
  // };

}
