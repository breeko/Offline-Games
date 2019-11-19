import _ from "lodash"
import React, { useEffect, useState, Fragment } from "react"
import { Coordinates } from "../types"
import { ConnectingLine, LetterText, SvgCircle } from "./style"

interface LettersProps {
    letters: string[]
    onSolveWord: (w: string) => void
}

const Letters: React.FunctionComponent<LettersProps> = (props) => {

    const [selected, setSelected] = useState<number[]>([])

    const [startMouse, setStartMouse] = useState<Coordinates>()
    const [endMouse, setEndMouse] = useState<Coordinates>()

    const [point, setPoint] = useState<DOMPoint>()
    const svgRef = React.createRef<SVGSVGElement>()

    useEffect(() => {
        const pt = svgRef.current && svgRef.current.createSVGPoint()
        if (pt) {
            setPoint(pt)
        }
    }, [])

    const numLetters = props.letters.length
    const width = 300
    const height = 300
    const numRows = 7
    const numCols = 7
    const horizontalStep = width / numRows
    const verticalStep = height / numCols
    const radius = width / numRows / 1.2

    // grid is 7x7
    const layout: Array<[number, number]> =
        numLetters === 3 ? [[1, 3], [5, 1], [5, 5]] :
        numLetters === 4 ? [[1, 1], [1, 5], [5, 1], [5, 5]] :
        numLetters === 5 ? [[1, 3], [3, 1], [3, 5], [6, 2], [6, 4]] :
        numLetters === 6 ? [[1, 3], [2, 1], [2, 5], [4, 1], [4, 5], [5, 3]] :
        numLetters === 7 ? [[0, 3], [2, 1], [2, 5], [4, 1], [4, 5], [6, 2], [6, 4]] :
        numLetters === 8 ? [[0, 2], [0, 4], [2, 1], [2, 5], [4, 1], [4, 5], [6, 2], [6, 4]] : []
    // tslint:disable-next-line: max-line-length
    // const layout = [[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[1,0],[1,1],[1,2],[1,3],[1,4],[1,5],[1,6],[2,0],[2,1],[2,2],[2,3],[2,4],[2,5],[2,6],[3,0],[3,1],[3,2],[3,3],[3,4],[3,5],[3,6],[4,0],[4,1],[4,2],[4,3],[4,4],[4,5],[4,6],[5,0],[5,1],[5,2],[5,3],[5,4],[5,5],[5,6],[6,0],[6,1],[6,2],[6,3],[6,4],[6,5],[6,6]]

    const circlesCoordinates = layout.map(([r, c]) => ({x: horizontalStep * c + radius, y: verticalStep * r + radius}))
    const circles = circlesCoordinates.map((coords, idx) =>
        <React.Fragment key={`${JSON.stringify(coords)}`}>
            <SvgCircle
                key={`${coords.x}-${coords.y}`}
                cx={coords.x}
                cy={coords.y}
                r={radius}
                onPointerDown={(event) => handleOnPointerDown(idx, event)}
                onPointerOver={(event) => handleOnPointerOver(idx, event)}
            />
            <LetterText x={coords.x - 5} y={coords.y + 5}>{props.letters[idx]}</LetterText>
        </React.Fragment>,
    )

    const getSelectedCoordinates = (idx: number) => circlesCoordinates[selected[idx]]

    const getMouseLocation = (event: React.MouseEvent) => {
        if (point && svgRef.current) {
            point.x = event.clientX
            point.y = event.clientY
            const screenCtm = svgRef.current.getScreenCTM()
            if (screenCtm !== null) {
                const cursorpt =  point.matrixTransform((screenCtm).inverse())
                return {x: cursorpt.x, y: cursorpt.y}
            }
        }

    }
    const handleOnPointerDown = (idx: number, event: React.PointerEvent<SVGCircleElement>) => {
        const loc = getMouseLocation(event)
        if (loc !== null) {
            setSelected(selected.concat(idx))
            setStartMouse(circlesCoordinates[idx])
        }
    }

    const handleOnPointerOver = (idx: number, event: React.PointerEvent<SVGCircleElement>) => {
        if (selected.length > 0 && !selected.includes(idx)) {
            setSelected(selected.concat(idx))
            setStartMouse(circlesCoordinates[idx])
        }
    }
    const handleOnPointerUp = () => {
        const selection = document.getSelection() // so i don't try to move the highlighted letters
        if (selection) {
            selection.empty()
        }
        const word = selected.map(s => props.letters[s]).join("")

        props.onSolveWord(word)
        setStartMouse(undefined)
        setEndMouse(undefined)
        setSelected([])
    }
    const handleOnPointerMove = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        const loc = getMouseLocation(event)
        if (loc) {
            setEndMouse(loc)
        }
    }

    return (
        <Fragment>
            <svg
                ref={svgRef}
                width={width}
                height={height}
                onPointerMove={handleOnPointerMove}
                onPointerUp={handleOnPointerUp}
                onPointerLeave={handleOnPointerUp}
            >
                {selected.length > 1 && _.range(selected.length - 1).map(idx => {
                    const start = getSelectedCoordinates(idx)
                    const end = getSelectedCoordinates(idx + 1)
                    return <ConnectingLine
                        key={`${JSON.stringify(start)}${JSON.stringify(end)}`}
                        x1={start.x}
                        y1={start.y}
                        x2={end.x}
                        y2={end.y}
                    />
                })}
                {startMouse &&
                    endMouse &&
                    <ConnectingLine x1={startMouse.x} y1={startMouse.y} x2={endMouse.x} y2={endMouse.y}/>}
                {circles}
            </svg>
        </Fragment>
    )
}

export default Letters
