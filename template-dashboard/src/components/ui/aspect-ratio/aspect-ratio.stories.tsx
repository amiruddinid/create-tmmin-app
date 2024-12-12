import { Meta, StoryObj } from '@storybook/react';

import { AspectRatio } from './aspect-ratio';

const meta: Meta<typeof AspectRatio> = {
  component: AspectRatio,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof AspectRatio>;

export const Default: Story = {
  args: {},
};
