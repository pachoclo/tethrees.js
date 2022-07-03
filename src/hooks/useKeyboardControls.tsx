import { useEffect } from 'react'

type Handlers = {
  up: () => void
  down: () => void
  left: () => void
  right: () => void
  space: () => void
  enter: () => void
  p: () => void
  h: () => void
}

/**
 * Treat this as an event handler registration table
 */
export function useKeyboardControls(handlers: Handlers) {
  let { up, down, left, right, space, enter, p, h } = handlers

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowUp':
        up()
        break
      case 'ArrowDown':
        down()
        break
      case 'ArrowLeft':
        left()
        break
      case 'ArrowRight':
        right()
        break
      case ' ':
        space()
        break
      case 'Enter':
        enter()
        break
      case 'p':
        p()
        break
      case 'h':
        h()
        break
      default:
        break
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  return
}
