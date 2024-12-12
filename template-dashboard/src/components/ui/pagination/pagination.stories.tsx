import { Meta, StoryObj } from '@storybook/react';

import { Pagination } from './pagination';

const meta: Meta<typeof Pagination> = {
  component: Pagination,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  args: {},
};
