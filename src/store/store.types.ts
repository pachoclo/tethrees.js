import { Camera } from '@react-three/fiber'

export enum Orientation {
  'up' = 'up',
  'right' = 'right',
  'down' = 'down',
  'left' = 'left',
}

export type Piece = {
  type: 'T' | 'L' | 'J' | 'O' | 'I' | 'S' | 'Z'
  orientations: {
    [key in Orientation]: number[][]
  }
}

export type LevelState = 'READY' | 'PLAYING' | 'PAUSED' | 'GAME_OVER' | 'WIN'

export interface LevelStore {
  levelState: LevelState
  board: number[][]
  piece: Piece
  x: number
  y: number
  orientation: Orientation
  rowsCleared: number
  help: boolean

  moveLeft: () => void
  moveRight: () => void
  rotate: () => void
  drop: () => void
  dropAllTheWay: () => void
  clearRows: () => void
  setLevelState: (newLevelState: LevelState) => void
  isGameOver: () => void
  toggleHelp: () => void
  pause: () => void
  restart: () => void
}
