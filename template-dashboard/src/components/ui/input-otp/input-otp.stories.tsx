import { Meta, StoryObj } from '@storybook/react';

import { InputOtp } from './input-otp';

const meta: Meta<typeof InputOtp> = {
  component: InputOtp,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof InputOtp>;

export const Default: Story = {
  args: {},
};
