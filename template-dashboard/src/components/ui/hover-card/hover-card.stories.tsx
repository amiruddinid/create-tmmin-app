import { Meta, StoryObj } from '@storybook/react';

import { HoverCard } from './hover-card';

const meta: Meta<typeof HoverCard> = {
  component: HoverCard,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof HoverCard>;

export const Default: Story = {
  args: {},
};
