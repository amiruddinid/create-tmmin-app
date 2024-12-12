import { Meta, StoryObj } from '@storybook/react';

import { Slider } from './slider';

const meta: Meta<typeof Slider> = {
  component: Slider,
};

export default meta;

type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  args: {}
};
