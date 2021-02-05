import React from "react";

import { ExampleComponent } from "../src/index";

export default {
  title: "DCF/DCFSheet",
  component: ExampleComponent,
};

const Template = (args) => <ExampleComponent {...args} />;

export const DCFSheet = Template.bind({});
