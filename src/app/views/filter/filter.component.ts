import {Component, Input} from '@angular/core';
import {ItemList} from "../../item-list";

@Component({
  selector: 'sai-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {

  groupItems: Array<ItemList> = [
    {
      title: 'Date',
      id: 1
    },
    {
      title: 'Repository',
      id: 2
    }
  ];

  @Input() items = this.groupItems;

}
