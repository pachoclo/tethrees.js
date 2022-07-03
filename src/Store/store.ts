import create from 'zustand'
import {
  allPieces,
  bigBoard,
  cameras,
  initialX,
  initialY,
  stateTransitions,
} from '../constants'
import { LevelState, LevelStore, Orientation } from './store.types'

export const useLevelStore = create<LevelStore>()((set, get) => ({
  levelState: 'READY',
  board: bigBoard,
  piece: getRandomPiece(),
  orientation: Orientation.up,
  x: initialX,
  y: initialY,
  rowsCleared: 0,
  camera: cameras.one,
  help: true,

  moveLeft() {
    set((state) => {
      let newState = { ...state, x: state.x - 1 }
      if (state.levelState === 'PLAYING' && !isThereBlockOverlap(newState)) {
        return newState
      }
      return state
    })
  },

  moveRight() {
    set((state) => {
      let newState = { ...state, x: state.x + 1 }
      if (state.levelState === 'PLAYING' && !isThereBlockOverlap(newState)) {
        return newState
      }
      return state
    })
  },

  rotate() {
    set((state) => {
      let orientations = Object.keys(Orientation) as Orientation[]
      let currentOrientationIdx = orientations.findIndex(
        (orientation) => orientation === state.orientation
      )
      let orientationIdx = (currentOrientationIdx + 1) % orientations.length
      let newOrientation = orientations[orientationIdx]

      let newState = { ...state, orientation: newOrientation }
      if (state.levelState === 'PLAYING' && !isThereBlockOverlap(newState)) {
        return newState
      }
      return state
    })
  },

  drop() {
    if (get().levelState === 'PLAYING') {
      set((state) => {
        let afterDropState = { ...state, y: state.y + 1 }

        if (isThereBlockOverlap(afterDropState)) {
          // the board "absorbs" the piece
          let newBoard = copyPieceToBoard(state)

          // change piece to new random one
          let newPiece = getRandomPiece()

          return {
            ...state,
            levelState: 'NEW_PIECE',
            board: newBoard,
            piece: newPiece,
            x: initialX,
            y: initialY,
          }
        }

        return afterDropState
      })
    }
  },

  dropAllTheWay() {
    if (get().levelState === 'PLAYING') {
      set((state) => {
        // move piece +1 on the y-axis until there's overlap

        let afterDropState
        let currentY = state.y

        do {
          currentY += 1
          afterDropState = { ...state, y: currentY }
        } while (!isThereBlockOverlap(afterDropState))

        // the board "absorbs" the piece
        let newBoard = copyPieceToBoard({ ...state, y: currentY - 1 })

        // change piece to new random one
        let newPiece = getRandomPiece()

        // build new state with new board and new piece
        // check if there is block overlap -> game over

        return {
          ...state,
          levelState: 'NEW_PIECE',
          board: newBoard,
          piece: newPiece,
          orientation: Orientation.up,
          x: initialX,
          y: initialY,
        }
      })
    }
  },

  clearRows() {
    set((state) => {
      let rowsRemoved = 0

      // get a new board without completed rows
      let newBoard = state.board
        .map((row, rowIndex) => {
          // if not the last row and the row has no zeros -> row is full -> remove row
          if (rowIndex !== state.board.length - 1 && !row.includes(0)) {
            // mark the row for removal
            rowsRemoved++
            return
          } else {
            return row.map((cell) => cell)
          }
        })
        .filter((row) => row !== undefined) as number[][]

      // duplicate the first row x rowsRemoved
      let firstRowCopies = Array(rowsRemoved).fill([...newBoard[0]])

      // prepend rows to top of the board (to replace the removed ones)
      newBoard = [...firstRowCopies, ...newBoard]

      return {
        ...state,
        board: newBoard,
        rowsCleared: state.rowsCleared + rowsRemoved,
      }
    })
  },

  setLevelState(newLevelState: LevelState) {
    let isValid = isValidStateTransition(get().levelState, newLevelState)
    if (isValid) {
      console.log('level state: ', newLevelState)
      set((_) => ({ levelState: newLevelState }))
    }
  },

  isGameOver() {
    let state = get()
    let nextState = { ...state, y: state.y + 1 }
    if (state.y === initialY && isThereBlockOverlap(nextState)) {
      state.setLevelState('GAME_OVER')
    }
  },

  toggleHelp() {
    set((state) => ({
      help: !state.help,
    }))
  },
}))

/**
 * Two blocks overlap if they both have a non-zero value.
 *
 * The board's blocks include the ones that make up its frame and those
 * blocks from pieces that have already dropped.
 */
function isThereBlockOverlap({ board, piece, x, y, orientation }: LevelStore) {
  let boardMaxY = y + 4
  let boardMaxX = x + 4

  let pieceMatrix = piece.orientations[orientation]

  for (let pieceY = 0, boardY = y; pieceY < 4 && boardY < boardMaxY; pieceY++, boardY++) {
    for (let pieceX = 0, boardX = x; pieceX < 4 && boardX < boardMaxX; pieceX++, boardX++) {
      let currentBlockBoard = board[boardY] ? board[boardY][boardX] : 0
      let currentBlockPiece = pieceMatrix[pieceY] ? pieceMatrix[pieceY][pieceX] : 0

      if (currentBlockBoard + currentBlockPiece > 1) {
        return true
      }
    }
  }

  return false
}

function copyPieceToBoard({ board, piece, x, y, orientation }: LevelStore) {
  let newBoard = board.map((row) => row.map((value) => value))

  for (
    let pieceY = 0, boardY = y;
    pieceY < piece.orientations[orientation].length;
    pieceY++, boardY++
  ) {
    for (
      let pieceX = 0, boardX = x;
      pieceX < piece.orientations[orientation][pieceY].length;
      pieceX++, boardX++
    ) {
      let currentBlockPiece = piece.orientations[orientation][pieceY]
        ? piece.orientations[orientation][pieceY][pieceX]
        : 0
      if (currentBlockPiece === 1) {
        newBoard[boardY][boardX] = currentBlockPiece
      }
    }
  }

  return newBoard
}

function isValidStateTransition(fromState: LevelState, toState: LevelState) {
  let validNextStates = getValidNextStates(fromState)
  return validNextStates.some((validState) => toState === validState)
}

function getValidNextStates(fromState: LevelState) {
  return stateTransitions[fromState]
}

function getRandomPiece() {
  return allPieces[Math.floor(Math.random() * allPieces.length)]
}
