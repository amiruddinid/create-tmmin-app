import { Meta, StoryObj } from '@storybook/react';

import { Label } from './label';

const meta: Meta<typeof Label> = {
  component: Label,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {},
};
