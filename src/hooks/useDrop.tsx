import { useFrame } from '@react-three/fiber'
import { useState } from 'react'

export const useDrop = (pieceRef: any) => {
  const [lastDropTime, setLastDropTime] = useState(0)
  const dropInterval = 1 // in seconds

  useFrame(({ clock }) => {
    if (clock.elapsedTime - lastDropTime > dropInterval) {
      let positionY = pieceRef.current!.position.y
      pieceRef.current!.position.y = positionY - 1
      setLastDropTime(clock.elapsedTime)
    }
  })
}
