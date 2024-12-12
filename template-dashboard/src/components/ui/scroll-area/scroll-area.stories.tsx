import { Meta, StoryObj } from '@storybook/react';

import { ScrollArea } from './scroll-area';

const meta: Meta<typeof ScrollArea> = {
  component: ScrollArea,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ScrollArea>;

export const Default: Story = {
  args: {},
};
