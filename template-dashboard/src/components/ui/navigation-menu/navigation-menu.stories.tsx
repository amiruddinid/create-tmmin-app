import { Meta, StoryObj } from '@storybook/react';

import { NavigationMenu } from './navigation-menu';

const meta: Meta<typeof NavigationMenu> = {
  component: NavigationMenu,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof NavigationMenu>;

export const Default: Story = {
  args: {},
};
