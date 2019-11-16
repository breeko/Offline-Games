import React from 'react'

import { SquareContainer, BlankSquareContainer, CircleContainer } from './style'

interface SquareProps {
    value: string | null
    round?: boolean
    onClick?: (e: React.SyntheticEvent) => void
    onMouseOver?: (e: React.SyntheticEvent) => void

}

const Square: React.FunctionComponent<SquareProps> = (props) => {
    const { value, onClick, onMouseOver } = props
    const SC = value === null ? BlankSquareContainer : props.round ? CircleContainer : SquareContainer

    return (
        <SC onMouseOver={onMouseOver} onClick={onClick}> {value || ''}</SC>
    )
}

export default Square
