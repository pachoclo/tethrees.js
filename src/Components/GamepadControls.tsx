import Gamepad from 'react-gamepad'
import { useLevelStore } from '../store/store'

export default function GamepadControls() {
  let moveLeft = useLevelStore((store) => store.moveLeft)
  let moveRight = useLevelStore((store) => store.moveRight)
  let dropAllTheWay = useLevelStore((store) => store.dropAllTheWay)
  let rotate = useLevelStore((store) => store.rotate)
  let pause = useLevelStore((store) => store.pause)
  let setLevelState = useLevelStore((store) => store.setLevelState)

  return (
    <Gamepad
      onButtonChange={(buttonName, down) => {
        if (down) {
          switch (buttonName) {
            case 'Start':
              setLevelState('PLAYING')
              break
            case 'Back':
              pause()
              break
            case 'X':
            case 'RT':
              rotate()
              break
            case 'DPadLeft':
            case 'LB':
              moveLeft()
              break
            case 'DPadRight':
            case 'RB':
              moveRight()
              break
            case 'A':
              dropAllTheWay()
              break
            default:
              break
          }
        }
      }}
    >
      <>{/* Needed because of bug: https://github.com/SBRK/react-gamepad/issues/3 */}</>
    </Gamepad>
  )
}
