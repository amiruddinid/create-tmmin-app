import { Meta, StoryObj } from '@storybook/react';

import { Carousel } from './carousel';

const meta: Meta<typeof Carousel> = {
  component: Carousel,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Carousel>;

export const Default: Story = {
  args: {},
};
