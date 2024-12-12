import { Meta, StoryObj } from '@storybook/react';

import { Sonner } from './sonner';

const meta: Meta<typeof Sonner> = {
  component: Sonner,
};

export default meta;

type Story = StoryObj<typeof Sonner>;

export const Default: Story = {
  args: {}
};
