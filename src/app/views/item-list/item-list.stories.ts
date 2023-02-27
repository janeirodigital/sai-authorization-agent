import {moduleMetadata, Story} from "@storybook/angular";
import {ItemListComponent} from "./item-list.component";
import {DemoMaterialModule} from "../../../material-module";

export default {
  title: 'Item List',
  component: ItemListComponent,
  decorators: [
    moduleMetadata({
      imports: [DemoMaterialModule]
    })
  ]
}

const Template: Story = (args) => ({props: args});

export const ItemList = Template.bind({});
ItemList.args = {
  items: [
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
}
