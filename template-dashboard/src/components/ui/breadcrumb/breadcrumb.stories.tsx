import { Meta, StoryObj } from '@storybook/react';

import { Breadcrumb } from './breadcrumb';

const meta: Meta<typeof Breadcrumb> = {
  component: Breadcrumb,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {
  args: {},
};
