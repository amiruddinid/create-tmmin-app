import { Meta, StoryObj } from '@storybook/react';

import { ToggleGroup } from './toggle-group';

const meta: Meta<typeof ToggleGroup> = {
  component: ToggleGroup,
};

export default meta;

type Story = StoryObj<typeof ToggleGroup>;

export const Default: Story = {
  args: {}
};
