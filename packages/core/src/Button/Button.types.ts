import { ElementType, ComponentProps } from "react"

export type ButtonState = {
  active: boolean
  hover: boolean
  autofocus: boolean
  disabled: boolean
}

export type ButtonProps<T extends ElementType = 'button'> = {
  as?: T
  children: React.ReactNode | ((state: ButtonState) => React.ReactNode)
} & ComponentProps<T>



