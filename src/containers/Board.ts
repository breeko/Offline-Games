import _ from "lodash"
import { Character, Point, Word } from "../types"

class Board {

    public static newBoard(height: number, width: number) {
        const newBoard: string[][] = []
        _.range(0, height).forEach(() => newBoard.push(new Array(width).fill(null)))
        return new Board(newBoard)
    }
    public height: number
    public width: number
    private board: Array<Array<string | null>>

    constructor(boardInit: Array<Array<string | null>>) {
        const widths = _.uniq(boardInit.map(r => r.length))
        if (widths.length > 1) { throw Error(`invalid board, rows of different length`) }
        if (widths.length === 0) { throw Error(`invalid board, no rows`) }
        this.width = widths[0]
        this.height = boardInit.length
        this.board = _.cloneDeep(boardInit)
    }

    public get = (row: number, col: number): string | null => this.board[row] && this.board[row][col]

    public getAdjacent = (row: number, col: number, horizontal?: boolean): Array<string | null | undefined> => {
        if (horizontal === undefined) {
            const h = this.getAdjacent(row, col, true)
            const v = this.getAdjacent(row, col, false)
            return [...h, ...v]
        }
        return horizontal ?
            [this.get(row, col - 1), this.get(row, col + 1)] :
            [this.get(row - 1, col), this.get(row + 1, col)]
    }

    public set = (letter: Character) => {
        const { row, col } = letter.point
        if (row >= 0 && row < this.height && col >= 0 && col < this.width) {
            this.board[letter.point.row][letter.point.col] = letter.value
        }
    }
    public isEmpty = (): boolean => this.board.every(r => r.every(val => val === null))

    public toString = () => this.board.map(row => row.map(v => v === null ? "-" : v).join(" "))

    public clone = () => new Board(_.cloneDeep(this.board))

    public getAvailablePoints = (): Point[] => {
        const availablePoints: Point[] = []
        _.range(0, this.height).forEach(r => _.range(0, this.width).forEach(c => {
            const cellVal = this.board[r][c]
            if (cellVal !== null) {
                availablePoints.push({row: r, col: c})
            }
        }))
        return availablePoints
    }

    public isEqual = (o: Board): boolean => _.isEqual(this.board, o.board)

    public letters = (): string[] => {
        const longest = this.words().reduce((a, b) => a.length > b.length ? a : b)
        return longest.map(ch => ch.value)
    }

    public findWord = (word: string): Word | undefined =>
        this.words()
            .find(w => w.length === word.length && _.zip(word.split(""), w)
            .every(([a, b]) => a && b && a === b.value))

    public words = (): Word[] => {
        // returns an array of horizontal and vertical words laid on the board
        let inWord: boolean
        let word: Word = []
        const words: Word[] = []
        // horizontal
        _.range(0, this.height).forEach(r => {
            inWord = false
            word = []
            _.range(0, this.width + 1).forEach(c => {
                const cellVal = this.get(r, c)
                if (typeof(cellVal) !== "string") {
                    if (inWord) {
                        if (word.length > 1) { words.push(word) }
                        word = []
                        inWord = false
                    }
                } else {
                    const char: Character = {value: cellVal, point: {row: r, col: c}}
                    word = word.concat(char)
                    inWord = true
                }
            })
        })
        // vertical
        _.range(0, this.width).forEach(c => {
            inWord = false
            word = []
            _.range(0, this.height + 1).forEach(r => {
                const cellVal = this.get(r, c)
                if (typeof(cellVal) !== "string") {
                    if (inWord) {
                        if (word.length > 1) { words.push(word) }
                        word = []
                        inWord = false
                    }
                } else {
                    const char: Character = {value: cellVal, point: {row: r, col: c}}
                    word = word.concat(char)
                    inWord = true
                }
            })
        })
        return words
    }
}

export default Board
