import { useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'
import { Group, Vector3 } from 'three'
import { useKeyboardControls } from '../hooks/useKeyboardControls'
import { useLevelStore } from '../store/store'
import { Board } from './Board'
import { Piece } from './Piece'

export function Level() {
  const pieceRef = useRef<Group>(null)

  // get state
  let levelState = useLevelStore((store) => store.levelState)
  let piece = useLevelStore((store) => store.piece)
  let x = useLevelStore((store) => store.x)
  let y = useLevelStore((store) => store.y)
  let orientation = useLevelStore((store) => store.orientation)

  // get actions
  let setLevelState = useLevelStore((store) => store.setLevelState)
  let isGameOver = useLevelStore((store) => store.isGameOver)
  let clearRows = useLevelStore((store) => store.clearRows)
  let dropPiece = useLevelStore((store) => store.drop)

  // register actions as event handlers to key down
  useKeyboardControls()

  // === start game loop
  let [lastDropTime, setLastDropTime] = useState(0)
  let dropInterval = 1 // in seconds

  useFrame(({ clock }) => {
    if (levelState === 'GAME_OVER') {
      return
    }

    isGameOver()

    if (levelState === 'PLAYING') {
      if (clock.elapsedTime - lastDropTime > dropInterval) {
        dropPiece()
        setLastDropTime(clock.elapsedTime)
      }
      clearRows()
    }
  })
  // === end game loop

  return (
    <group position={[-5, 6, 0]}>
      <Board />
      <Piece
        ref={pieceRef}
        pieceType={piece}
        orientation={piece.orientations[orientation]}
        position={new Vector3(x, -y, 0)}
      />
    </group>
  )
}
