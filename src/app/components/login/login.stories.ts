import {moduleMetadata, Story} from "@storybook/angular";
import {LoginComponent} from "./login.component";
import {DemoMaterialModule} from "../../../material-module";

export default {
  title: 'Components/Log In',
  component: LoginComponent,
  decorators: [
    moduleMetadata({
      imports: [DemoMaterialModule],
    })
  ]
}

const Template: Story = (args) => ({props: args});

export const Default = Template.bind({});
Default.args = {}
