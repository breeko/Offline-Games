import styled from "styled-components"

export const Colors = {
    dark: '#282c34',
    light: 'white',
    grey: 'grey'
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: ${Colors.dark};
`

export const GridContainer = (numCols: number, numRows: number) => styled.div`
    display: grid;
    height: 50vh;
    min-width: 0;
    min-height: 0;
    grid-template-columns: repeat(${numCols}, 1fr);
`

export const SquareContainer = styled.div`
    background-color: ${Colors.light};
    border: 1px solid ${Colors.grey};
    padding: 20px;
    font-size: 20px;
    text-align: center;
`

export const BlankSquareContainer = styled(SquareContainer)`
    background-color: ${Colors.dark};
    border: transparent;
`

export const CircleContainer = styled(SquareContainer)`
    width: 50px;
    height: 50px;
    font-size: 40px;
    border-radius: 50%;
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
