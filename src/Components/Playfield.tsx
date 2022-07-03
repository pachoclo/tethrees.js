import { Constants } from '../constants'

export type PlayfieldProps = {
  rows?: number
  cols?: number
  children?: React.ReactNode
}

export function Playfield({ rows = 16, cols = 10, children }: PlayfieldProps) {
  const unit = 1 - Constants.blockGap
  return (
    <group position={[0, 0, 0]}>
      {Array(cols)
        .fill(null)
        .map((_, col) =>
          Array(rows)
            .fill(null)
            .map(
              (_, row) =>
                (col === 0 || row === rows - 1 || col === cols - 1) && (
                  <mesh position={[col, -row, 0]} key={`playfield-box-${row}-${col}`}>
                    <boxGeometry args={[unit, unit, unit]} />
                    <meshStandardMaterial color="lightblue" />
                  </mesh>
                )
            )
        )}
      {children}
    </group>
  )
}
