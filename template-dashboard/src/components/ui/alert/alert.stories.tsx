import { Meta, StoryObj } from '@storybook/react';

import { Alert } from './alert';

const meta: Meta<typeof Alert> = {
  component: Alert,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: {},
};
