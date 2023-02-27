import {Component, Input} from '@angular/core';
import {ItemList} from "../../item-list";

@Component({
  selector: 'sai-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent {

  allComplete = false;
  itemList: Array<ItemList> = [
    {
      title: 'Item title',
      description: 'item description',
      content: 'extra content line',
      icon: 'inbox',
      selected: false
    },
    {
      title: 'Item title 2',
      description: 'item description 2',
      icon: 'drafts',
      selected: false
    }
  ]

  @Input() items = this.itemList;



  updateAllComplete() {
    this.allComplete = this.items != null && this.items.every(t => t.selected);
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.items == null) {
      return;
    }
    this.items.forEach(t => (t.selected = completed));
  }


}
