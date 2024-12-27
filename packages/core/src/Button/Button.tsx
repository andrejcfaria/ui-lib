import { ElementType, MouseEvent, useCallback, useMemo, useState } from 'react'
import { ButtonProps, ButtonState } from './Button.types'

let DEFAULT_BUTTON_TAG = 'button' as const

const useHover = (isDisabled: boolean) => {
  const [isHovered, setIsHovered] = useState(false)

  const handeMouseEnter = (ev: MouseEvent) => {
    console.log(ev)
    if (!isDisabled) {
      setIsHovered(true)
    }
  }
  const handeMouseLeave = (ev: MouseEvent) => {
    console.log(ev)
    if (!isDisabled) {
      setIsHovered(false)
    }
  }

  return {
    isHover: isHovered,
    hoverProps: {
      onMouseEnter: handeMouseEnter,
      onMouseLeave: handeMouseLeave,
    },
  }
}

const usePress = (disabled: boolean) => {
  const [isPressed, setIsPressed] = useState(false)

  const handleDown = () => !disabled && setIsPressed(true)
  const handleUp = () => !disabled && setIsPressed(false)

  return {
    isPressed,
    pressProps: {
      onMouseDown: handleDown,
      onMouseUp: handleUp,
    },
  }
}

const useFocus = () => {
  const [isFocused, setIsFocused] = useState(false)

  const handleFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  const handleBlur = useCallback(() => {
    setIsFocused(false)
  }, [])

  return {
    isFocused,
    focusProps: {
      onFocus: () => {
        handleFocus()
      },
      onBlur: () => {
        handleBlur()
      },
    },
  }
}

export const Button = <T extends ElementType = typeof DEFAULT_BUTTON_TAG>({
  as,
  ...props
}: ButtonProps<T>) => {
  const { disabled = false, autofocus, type, children } = props
  const { isFocused, focusProps } = useFocus()
  const { isPressed, pressProps } = usePress(disabled)
  const { isHover, hoverProps } = useHover(disabled)

  const buttonState: ButtonState = useMemo(
    () => ({
      active: isPressed,
      hover: isHover,
      disabled: disabled,
      autofocus: autofocus,
    }),
    [isPressed, isHover, disabled],
  )

  const allprops = {
    ...props,
    ...hoverProps,
    ...pressProps,
    ...focusProps,
    type: type ?? 'button',
    'data-active': isPressed ? true : undefined,
    'data-hover': isHover ? true : undefined,
    'data-disabled': disabled ? true : undefined,
    'data-autofocus': isFocused ? true : undefined,
    'data-uilib-state':
      `${isPressed ? 'active' : ''} ${isHover ? 'hover' : ''} ${isFocused ? 'focus' : ''} `.trim(),
  }

  const Component = as ?? 'button'

  return (
    <Component {...allprops}>
      {typeof children === 'function' ? children(buttonState) : children}
    </Component>
  )
}
