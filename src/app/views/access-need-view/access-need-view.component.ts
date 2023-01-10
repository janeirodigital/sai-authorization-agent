import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IRI} from "@janeirodigital/sai-api-messages";
import {AccessNeed, ShapeTree} from "../../state/models/index";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";

@Component({
  selector: 'sai-access-need-view',
  templateUrl: './access-need-view.component.html',
  styleUrls: ['./access-need-view.component.scss']
})
export class AccessNeedViewComponent implements OnInit {

  @Input() need!: AccessNeed;
  @Input() shapetree!: ShapeTree;
  @Input() registryIds!: string[]
  // Toggling the full need means removing all the access
  @Output() changed = new EventEmitter<{id: IRI, access: Array<IRI>}>();

  checkedAccess: IRI[] = [];
  constructor() { }

  ngOnInit(): void {
    this.checkedAccess = this.need.access;
  }

  toggleNeed(change: MatSlideToggleChange): void {
    this.checkedAccess = change.checked ? this.need.access : [];
    this.emitUpdate();
  }

  removeAccess(access: IRI): void {
    this.checkedAccess = this.checkedAccess.filter(v => v != access);
    this.emitUpdate();
  }

  private emitUpdate(): void {
    this.changed.emit({id: this.need.id, access: this.checkedAccess})
  }

  public save(): void {

  }

  public cancel(): void {

  }

}
