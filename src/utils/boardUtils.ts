import Board from "../containers/Board"
import { Word, Point } from "../types"
import { range, flatMap, uniq, uniqWith, cloneDeep } from "lodash"
import { difference } from "./utils"


export const lay = (board: Board, letters: Word): Board => {
    const updated = board.clone()
    letters.forEach(l => updated.set(l))
    return updated
}

export const wordToString = (word: Word): string => word.map(ch => ch.value).join('')

export const canLay = (board: Board, word: Word): Boolean => {
    const updated = lay(board, word)
    const updatedWords = updated.words().map(w => wordToString(w))
    const origWords = board.words().map(w => wordToString(w))
    const newWord = word.map(ch => ch.value).join('')
    const diff = difference(origWords, updatedWords)
    return  diff.length === 1 && diff[0] === newWord
}

export const trim = (board: Board): Board => {
    
    const points = board.getAvailablePoints()
    const startRow = points.reduce((a,b) => a.row < b.row ? a : b).row
    const endRow = points.reduce((a,b) => a.row > b.row ? a : b).row
    const startCol = points.reduce((a,b) => a.col < b.col ? a : b).col
    const endCol = points.reduce((a,b) => a.col > b.col ? a : b).col

    const matrix = range(startRow, endRow + 1).map(r => range(startCol, endCol + 1).map(c => board.get(r, c)))
    return new Board(matrix)
}


export const possibleWords = (board: Board, point: Point, text: string): Word[] => {
    if (point === undefined) return []
    const hCandidates = range(0, text.length).map(idx => text.split('').map((ch, chIdx) => ({value: ch, point: {col: point.col - idx + chIdx, row: point.row}})))
    const vCandidates = range(0, text.length).map(idx => text.split('').map((ch, chIdx) => ({value: ch, point: {col: point.col, row: point.row - idx + chIdx}})))
    const allCandidates = [...hCandidates, ...vCandidates]
    const validCandidates = allCandidates.filter(c => canLay(board, c))
    return validCandidates
}

export const getAllPossibleWords = (board: Board, text: string): Word[][] =>
    board.getAvailablePoints().map(p => possibleWords(board, p, text))

export const getAllPossibleBoards = (board: Board, text: string): Board[] => {
    const possibleWords = getAllPossibleWords(board, text)
    return flatMap(possibleWords, (words => words.map(letters => lay(board, letters))))
}

export const score = (board: Board): number =>
    // how tight a board is (lower is better)
    board.getAvailablePoints().length

export const solveBoard = (texts: string[], maxBoards: number): Board[] => {
    const memo: Set<string> = new Set()
    let numBoardsSolved = 0

    const solveInner = (board: Board, texts: string[]): Board[] => {
        if (numBoardsSolved >= maxBoards) return []
        
        if (texts.length === 0) {
            numBoardsSolved += 1
            return [trim(board)]
        }
        
        const queue = cloneDeep(texts)
        const answers: Board[] = []
        const text = queue.pop()
        
        let candidateBoards: Board[] = []
        if (board.isEmpty()){
            // lay horizontally in center of the board
            if (text) {
                const r = Math.floor(board.height / 2)
                const c = Math.floor(board.width / 2 - text.length / 2)
                const word = text.split('').map((ch, idx) => ({value: ch, point: {row: r, col: c + idx}}))
                canLay(board, word) && candidateBoards.push(lay(board, word))
            }
        } else {
            if (text !== undefined) {
                candidateBoards = getAllPossibleBoards(board, text)
            }
        }

        const uniqueBoards = uniqWith(candidateBoards, (a ,b) => a.isEqual(b))
        const textsHash = texts.join(',')
        const newBoards = uniqueBoards
            .filter(b => !memo.has(b.toString() + textsHash))
            .map(b => {
                memo.add(b.toString() + textsHash)
                return b
            })
        
        flatMap(newBoards,
            b => solveInner(b, queue))
            .forEach(b => answers.push(b))
        return uniq(answers)
    }
    const sortedTexts = texts.sort((a,b) => a.length - b.length)
    const size = sortedTexts[sortedTexts.length - 1].length
    const board = Board.newBoard(size * 2 + 1, size * 2 + 1)
    return solveInner(board, sortedTexts)
}
