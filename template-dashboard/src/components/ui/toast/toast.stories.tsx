import { Meta, StoryObj } from '@storybook/react';

import { Toast } from './toast';

const meta: Meta<typeof Toast> = {
  component: Toast,
};

export default meta;

type Story = StoryObj<typeof Toast>;

export const Default: Story = {
  args: {}
};
