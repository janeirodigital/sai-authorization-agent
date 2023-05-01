import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'sai-access-modes-selector',
  templateUrl: './access-modes-selector.component.html',
  styleUrls: ['./access-modes-selector.component.scss']
})
export class AccessModesSelectorComponent {

  @Input() extras: string[] = []
  @Output() modeChange = new EventEmitter<{mode: string}>();

  modeSelected(mode: string): void {
    this.modeChange.emit({ mode })
  }
}
