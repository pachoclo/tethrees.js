import { useLevelStore } from '../store/store'

export function ScoreCard() {
  let levelState = useLevelStore((state) => state.levelState)
  let rowsCleared = useLevelStore((state) => state.rowsCleared)

  let stateHeader

  switch (levelState) {
    case 'READY':
      stateHeader = 'READY - Press Enter'
      break
    case 'PLAYING':
      stateHeader = '▶ Playing'
      break
    case 'PAUSED':
      stateHeader = '◼︎ Paused'
      break
    default:
      stateHeader = levelState
  }

  return (
    <div className="score-card">
      <p>{stateHeader}</p>
      <p>
        <span>{rowsCleared}</span>row{rowsCleared === 1 ? '' : 's'} cleared
      </p>
    </div>
  )
}
