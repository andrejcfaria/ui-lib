import type { Meta, StoryObj } from '@storybook/react'

import { Button } from './Button'

export default {
  title: 'Components/Button',
  component: Button,
} satisfies Meta<typeof Button>

type Story = StoryObj<typeof Button>

export const Default: Story = {}
