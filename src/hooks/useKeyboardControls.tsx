import React, { useEffect } from 'react'
import { useLevelStore } from '../store/store'

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
export function useKeyboardControls() {
  let moveLeft = useLevelStore((store) => store.moveLeft)
  let moveRight = useLevelStore((store) => store.moveRight)
  let rotate = useLevelStore((store) => store.rotate)
  let setLevelState = useLevelStore((store) => store.setLevelState)
  let dropAllTheWay = useLevelStore((store) => store.dropAllTheWay)
  let clearRows = useLevelStore((store) => store.clearRows)
  let toggleHelp = useLevelStore((store) => store.toggleHelp)
  let togglePause = useLevelStore((store) => store.pause)

  // why am I doing this?
  let handlers: Handlers = {
    left: moveLeft,
    right: moveRight,
    up: rotate,
    down: dropAllTheWay,
    space: clearRows,
    enter: () => setLevelState('PLAYING'),
    p: togglePause,
    h: toggleHelp,
  }

  const handleKeyDown = React.useMemo(
    () => (e: KeyboardEvent) => {
      let { up, down, left, right, space, enter, p, h } = handlers
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
    },
    [handlers]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  return
}
