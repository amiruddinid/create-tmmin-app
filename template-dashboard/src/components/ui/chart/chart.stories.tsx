import { Meta, StoryObj } from '@storybook/react';

import { Chart } from './chart';

const meta: Meta<typeof Chart> = {
  component: Chart,
};

export default meta;

type Story = StoryObj<typeof Chart>;

export const Default: Story = {
  args: {}
};
