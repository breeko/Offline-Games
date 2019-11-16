import _ from 'lodash'
import React from 'react'
import Board from '../containers/Board'
import Square from './Square'
import { GridContainer } from './style'
import { Word } from '../types'


interface BoardProps {
    board: Board
    solved: Word[]
}

const Crossword: React.FunctionComponent<BoardProps> = (props) => {
    const { board, solved } = props
    const {height, width} = board
    
    const solvedChars = new Set(solved.flatMap(w => w.map(ch => JSON.stringify(ch.point))))
    const GC = GridContainer(width, height)

    const getDisplay = (r: number, c: number) => {
        const ch = props.board.get(r,c)
        const display = ch === null ? ch : solvedChars.has(JSON.stringify({row: r, col: c})) ? ch : ' '
        return display
    }

    return (
        <GC>
        { _.range(0, height).map(r => _.range(0, width).map(c => 
            <Square
                key={`${r}-${c}`}
                value={getDisplay(r,c)}/>)) 
        }    
        </GC>
    )
}

export default Crossword
