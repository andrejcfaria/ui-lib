import { ElementType } from 'react'
import { ButtonProps } from './Button.types'

let DEFAULT_BUTTON_TAG = 'button' as const

export const Button = <T extends ElementType = typeof DEFAULT_BUTTON_TAG>({
  as,
  ...props
}: ButtonProps<T>) => {
  return <button {...props}></button>
}
