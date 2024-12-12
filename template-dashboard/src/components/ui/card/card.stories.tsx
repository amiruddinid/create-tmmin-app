import { Meta, StoryObj } from '@storybook/react';

import { Card } from './card';

const meta: Meta<typeof Card> = {
  component: Card,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {},
};
