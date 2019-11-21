import { cloneDeep, flatMap, range, uniq, uniqWith } from "lodash"
import { CONFIG } from "../config"
import Board from "../containers/Board"
import { Point, Word } from "../types"
import { difference } from "./utils"

export const lay = (board: Board, letters: Word): Board => {
    const updated = board.clone()
    letters.forEach(l => updated.set(l))
    return updated
}

export const wordToString = (word: Word): string => word.map(ch => ch.value).join("")

export const canLay = (board: Board, word: Word): boolean => {
    const updated = lay(board, word)
    const updatedWords = updated.words().map(w => wordToString(w))
    const origWords = board.words().map(w => wordToString(w))
    const newWord = word.map(ch => ch.value).join("")
    const diff = difference(origWords, updatedWords)
    return diff.length === 1 &&
        updatedWords.length - origWords.length === 1 &&
        diff[0] === newWord
}

export const trim = (board: Board): Board => {
    const points = board.getAvailablePoints()
    const startRow = points.reduce((a, b) => a.row < b.row ? a : b).row
    const endRow = points.reduce((a, b) => a.row > b.row ? a : b).row
    const startCol = points.reduce((a, b) => a.col < b.col ? a : b).col
    const endCol = points.reduce((a, b) => a.col > b.col ? a : b).col

    const matrix = range(startRow, endRow + 1).map(r => range(startCol, endCol + 1).map(c => board.get(r, c)))
    return new Board(matrix)
}

export const possibleWords = (board: Board, point: Point, text: string): Word[] => {
    if (point === undefined) { return [] }
    const hCandidates = range(0, text.length).map(idx => text.split("").map((ch, chIdx) =>
        ({value: ch, point: {col: point.col - idx + chIdx, row: point.row}})))
    const vCandidates = range(0, text.length).map(idx => text.split("").map((ch, chIdx) =>
        ({value: ch, point: {col: point.col, row: point.row - idx + chIdx}})))
    const allCandidates = [...hCandidates, ...vCandidates]
    const validCandidates = allCandidates.filter(c => canLay(board, c))
    return validCandidates
}

export const getAllPossibleWords = (board: Board, text: string): Word[][] =>
    board.getAvailablePoints().map(p => possibleWords(board, p, text))

export const getAllPossibleBoards = (board: Board, text: string): Board[] => {
    const possible = getAllPossibleWords(board, text)
    return flatMap(possible, (words => words.map(letters => lay(board, letters))))
}

export const score = (board: Board): number =>
    // how tight a board is (lower is better)
    board.getAvailablePoints().length

export const solveBoard = (texts: string[], maxBoards: number, validBoard: (b: Board) => boolean): Board[] => {
    const memo: Set<string> = new Set()
    let numBoardsSolved = 0
    let idx = 0
    const solveInner = (innerBoard: Board, innerTexts: string[]): Board[] => {
        idx += 1
        if (numBoardsSolved >= maxBoards || idx > CONFIG.max_attempts) { return [] }
        if (innerTexts.length === 0) {
            numBoardsSolved += 1
            return [trim(innerBoard)]
        }

        const queue = cloneDeep(innerTexts)
        const answers: Board[] = []
        const text = queue.pop()

        let candidateBoards: Board[] = []
        if (innerBoard.isEmpty()) {
            // lay horizontally in center of the board
            if (text) {
                const r = Math.floor(innerBoard.height / 2)
                const c = Math.floor(innerBoard.width / 2 - text.length / 2)
                const word = text.split("").map((ch, idx) => ({value: ch, point: {row: r, col: c + idx}}))
                if (canLay(innerBoard, word)) { candidateBoards.push(lay(innerBoard, word)) }
            }
        } else {
            if (text !== undefined) {
                candidateBoards = getAllPossibleBoards(innerBoard, text)
            }
        }

        const uniqueBoards = uniqWith(candidateBoards, (first, second) => first.isEqual(second))
        const textsHash = innerTexts.join(",")
        const newBoards = uniqueBoards
            .filter(b => !memo.has(b.toString() + textsHash))
            .map(b => {
                memo.add(b.toString() + textsHash)
                return b
            })

        flatMap(newBoards,
            b => solveInner(b, queue))
            .forEach(b => { if (validBoard(b)) { answers.push(b)} })
        return uniq(answers)
    }
    const sortedTexts = texts.sort((a, b) => a.length - b.length)
    const size = sortedTexts[sortedTexts.length - 1].length
    const board = Board.newBoard(size * 2 + 1, size * 2 + 1)
    return solveInner(board, sortedTexts)
}
