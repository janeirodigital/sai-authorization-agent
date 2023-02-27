import {moduleMetadata, Story} from "@storybook/angular";
import {FilterComponent} from "./filter.component";
import {DemoMaterialModule} from "../../../material-module";
export default {
  title: 'Filter',
  component: FilterComponent,
  decorators: [
    moduleMetadata({
      imports: [DemoMaterialModule]
    })
  ]
}

const Template: Story = (args) => ({props: args});

export const Filter = Template.bind({});
Filter.args = {
  items: [
    {
      title: 'Date',
      id: 1
    },
    {
      title: 'Repository',
      id: 2
    }
  ]
}
