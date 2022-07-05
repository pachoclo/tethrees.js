import { useLevelStore } from '../store/store'

export function MobileControls() {
  let levelState = useLevelStore((store) => store.levelState)

  let setLevelState = useLevelStore((store) => store.setLevelState)
  let rotatePiece = useLevelStore((store) => store.rotate)
  let dropPiece = useLevelStore((store) => store.dropAllTheWay)
  let movePieceLeft = useLevelStore((store) => store.moveLeft)
  let movePieceRight = useLevelStore((store) => store.moveRight)

  let controls =
    levelState === 'PLAYING' ? (
      <>
        <div className="mobile-controls mobile-controls-left">
          <button onClick={() => movePieceLeft()}>Left</button>
          <button onClick={() => rotatePiece()}>Rotate</button>
        </div>
        <div className="mobile-controls">
          <button onClick={() => movePieceRight()}>Right</button>
          <button onClick={() => dropPiece()}>Drop</button>
        </div>
      </>
    ) : (
      <>
        <div className="mobile-controls">
          <button onClick={() => setLevelState('PLAYING')}>PLAY</button>
        </div>
      </>
    )

  return <>{controls}</>
}
