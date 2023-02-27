import {Component, Input} from '@angular/core';
import {ItemList} from "../../item-list";

@Component({
  selector: 'sai-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

  sideNavItems: Array<ItemList> = [
    {
      icon: 'inbox',
      title: 'Inbox'
    },
    {
      icon: 'bookmark',
      title: 'Saved'
    }
  ]

  @Input() items = this.sideNavItems;


}
