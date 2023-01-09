import { Edges } from '@react-three/drei'
import { Vector3 } from '@react-three/fiber'
import React from 'react'
import { Group } from 'three'
import { Constants } from '../constants'
import { Piece as PieceType } from '../store/store.types'
import { Block } from './Block'

export type PieceTwoProps = {
  pieceType: PieceType
  orientation: number[][]
  color?: string
  showGrid?: boolean
  position: Vector3
}

export const Piece = React.forwardRef<Group, PieceTwoProps>(
  ({ color = '#730FC3', orientation, showGrid = false, pieceType: piece, ...props }, ref) => {
    return (
      <group {...props} ref={ref}>
        {orientation.map((row, rowIndex) =>
          row.map(
            (col, colIndex) =>
              col === 1 && (
                <Block
                  position={[colIndex, -rowIndex, 0]}
                  color={color}
                  key={`piece-block-${rowIndex}-${colIndex}`}
                />
              )
          )
        )}
        {showGrid && <PieceGrid />}
      </group>
    )
  }
)

function PieceGrid({ depthTest = true }: { depthTest?: boolean }) {
  const unit = 1 - Constants.blockGap
  let cols = 4
  let rows = 4
  return (
    <group position={[-1, -2, 0]}>
      {Array(cols)
        .fill(null)
        .map((_, col) =>
          Array(rows)
            .fill(null)
            .map((_, row) => (
              <mesh position={[col, row, 0]} key={`piece-box-${row}-${col}`}>
                <meshBasicMaterial opacity={0} transparent />
                <boxGeometry args={[unit, unit, unit]} />
                <Edges visible scale={1} renderOrder={1000}>
                  <meshBasicMaterial transparent color="#333" depthTest={depthTest} />
                </Edges>
              </mesh>
            ))
        )}
    </group>
  )
}
