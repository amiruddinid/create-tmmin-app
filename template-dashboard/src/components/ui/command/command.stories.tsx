import { Meta, StoryObj } from '@storybook/react';

import { Command } from './command';

const meta: Meta<typeof Command> = {
  component: Command,
};

export default meta;

type Story = StoryObj<typeof Command>;

export const Default: Story = {
  args: {}
};
