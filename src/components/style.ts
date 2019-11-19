import styled from "styled-components"

export const Colors = {
    dark: "#282c34",
    grey: "grey",
    light: "white",
}

export const Text = styled.div`
    color: ${Colors.light};
`

export const Header = styled.div`
  background-color: ${Colors.dark};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 10vh;
  font-size: calc(10px + 2vmin);
  color: ${Colors.dark};
`
export const Body = styled.div`
  background-color: ${Colors.dark};
  min-height: 90vh;
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: ${Colors.dark};
`

export const GridContainer = (numCols: number, numRows: number) => styled.div`
    display: grid;
    height: 50vh;
    /* min-width: 0;
    min-height: 0; */
    grid-template-columns: repeat(${numCols}, auto);
`

export const SquareContainer = styled.div`
    background-color: ${Colors.light};
    border: 1px solid ${Colors.grey};
    padding: 20px;
    font-size: 20px;
    pointer-events: none;
    text-align: center;
    &::selection { background: none};
`

export const BlankSquareContainer = styled(SquareContainer)`
    background-color: ${Colors.dark};
    border: transparent;
`

export const UnsolvedSquareContainer = styled(SquareContainer)`
    color: transparent;
`

export const SolvedSquareContainer = styled(SquareContainer)`
    color: ${Colors.dark};
`

export const SvgCircle = styled.circle`
    fill: green;
    stroke: blue;
    /* stroke-width: 4px; */
`

export const ConnectingLine = styled.line`
    stroke-width: 10px;
    stroke: white;
`

export const LetterText = styled.text`
    font-size: 20px;
    fill: white;
    pointer-events: none;
    &::selection { background: none};
`
