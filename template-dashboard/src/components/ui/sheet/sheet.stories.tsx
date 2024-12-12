import { Meta, StoryObj } from '@storybook/react';

import { Sheet } from './sheet';

const meta: Meta<typeof Sheet> = {
  component: Sheet,
};

export default meta;

type Story = StoryObj<typeof Sheet>;

export const Default: Story = {
  args: {}
};
