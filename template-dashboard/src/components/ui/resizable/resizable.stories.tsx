import { Meta, StoryObj } from '@storybook/react';

import { ResizablePanel } from './resizable';

const meta: Meta<typeof ResizablePanel> = {
  component: ResizablePanel,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ResizablePanel>;

export const Default: Story = {
  args: {},
};
