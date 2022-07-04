import { useLevelStore } from '../store/store'
import { Block } from './Block'

export function Board() {
  let board = useLevelStore((store) => store.board)

  return (
    <group position={[0, 0, 0]}>
      {board.map((row, rowIndex) =>
        row.map(
          (col, colIndex) =>
            col === 1 && (
              <Block
                position={[colIndex, -rowIndex, 0]}
                key={`border-${colIndex}-${rowIndex}`}
                color="lightblue"
              />
            )
        )
      )}
    </group>
  )
}
