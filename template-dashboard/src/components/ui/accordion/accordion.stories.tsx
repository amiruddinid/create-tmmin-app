import { Meta, StoryObj } from '@storybook/react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './accordion';

const meta: Meta<typeof Accordion> = {
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  args: {},
};
export const AccordionWithOneItem: Story = {
  args: {},
  render: () => (
    <Accordion type="single" collapsible className="w-80">
      <AccordionItem value="item-1">
        <AccordionTrigger>Accordion</AccordionTrigger>
        <AccordionContent data-testid="description">
          A vertically stacked set of interactive headings that each reveal a
          section of content.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
