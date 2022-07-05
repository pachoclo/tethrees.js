import { GroupProps, useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'
import { useKeyboardControls } from '../hooks/useKeyboardControls'
import { useLevelStore } from '../store/store'
import { Board } from './Board'
import { Piece } from './Piece'

export function Level() {
  const pieceRef = useRef<GroupProps>()

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

  // register actions as event handlers to key ˝
  useKeyboardControls()

  // === start game loop
  let [lastDropTime, setLastDropTime] = useState(0)
  let dropInterval = 1 // in seconds

  useFrame(({ clock }) => {
    if (levelState === 'NEW_PIECE') {
      isGameOver()
      setLevelState('PLAYING')
    }

    if (levelState === 'PLAYING') {
      if (clock.elapsedTime - lastDropTime > dropInterval) {
        isGameOver()
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
        piece={piece}
        orientation={piece.orientations[orientation]}
        position={[x, -y, 0]}
      />
    </group>
  )
}
