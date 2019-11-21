import styled from "styled-components"

export const Colors = {
    dark: "#27304A",
    grey: "grey",
    light: "#E2E7F8",
    purple: "#b3cde0",
}

export const Text = styled.div`
    color: ${Colors.light};
`

export const Header = styled.div`
  background-color: ${Colors.dark};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 5vh;
  font-size: calc(10px + 2vmin);
  padding: 10px;
`
export const Body = styled.div`
  background-color: ${Colors.dark};
  height: 95vh;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: ${Colors.dark};
`

export const Button = styled.button`
    height: 25px;
    width: 50px;
    margin: 10px;
    background-color: ${Colors.light};
    border-radius: 5px;
`

export const GridContainer = (numCols: number, numRows: number) => styled.div`
    display: grid;
    /* flex-grow: 1; */
    align-content: middle;
    justify-content: middle;
    grid-template-columns: repeat(${numCols}, auto);
`

export const SquareContainer = styled.div`
    display: flex;
    background-color: ${Colors.light};
    border: 1px solid ${Colors.grey};
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    font-size: 20px;
    pointer-events: none;
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
    fill: #e7eff6;
    stroke: blue;
    /* stroke-width: 4px; */
`

export const ConnectingLine = styled.line`
    stroke-width: 10px;
    stroke: white;
`

export const LetterText = styled.text`
    font-size: 25px;
    fill: #2a4d69;
    pointer-events: none;
    &::selection { background: none};
`
