import {moduleMetadata, Story} from "@storybook/angular";
import {SidenavComponent} from "./sidenav.component";
import {DemoMaterialModule} from "../../../material-module";

export default {
  title: 'Sidenav',
  component: SidenavComponent,
  decorators: [
    moduleMetadata({
      imports: [DemoMaterialModule]
    })
  ]
}

const Template: Story = (args) => ({props: args});

export const Sidenav = Template.bind({});
Sidenav.args = {
  items: [
    {
      icon: 'inbox',
      label: 'Inbox'
    },
    {
      icon: 'bookmark',
      label: 'Saved'
    }
  ]
}
