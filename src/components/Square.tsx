import React from "react"
import { BlankSquareContainer, SolvedSquareContainer, UnsolvedSquareContainer } from "./style"

interface SquareProps {
    value: string | null
    onClick?: (e: React.SyntheticEvent) => void
    onMouseOver?: (e: React.SyntheticEvent) => void
    solved: boolean
}

const Square: React.FunctionComponent<SquareProps> = (props) => {
    const { value, onClick, onMouseOver } = props
    const SC = value === null ? BlankSquareContainer : props.solved ? SolvedSquareContainer : UnsolvedSquareContainer

    return (
        <SC onMouseOver={onMouseOver} onClick={onClick}> {value || " "}</SC>
    )
}

export default Square
