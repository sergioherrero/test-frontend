import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import Button from '.';

export default {
  title: 'Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  color: 'primary',
  text: 'Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  color: 'secondary',
  text: 'Button',
};

export const Transparent = Template.bind({});
Transparent.args = {
  color: 'transparent',
  text: 'Button',
};

export const Link = Template.bind({});
Link.args = {
  external: true,
  text: 'Button',
  to: 'https://google.com',
};
