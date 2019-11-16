import React, { useState } from "react"
import Board from "../containers/Board"
import { DropdownChoice } from "../types"
import { score, solveBoard } from "../utils/boardUtils"
import "./App.css"
import Dropdown from "./Dropdown"
import { Body } from "./style"

const CrosswordMaker: React.FunctionComponent = () => {
  const [wordsText, setWordsText] = useState<string>("")
  const [boards, setBoards] = useState<Board[]>()
  const [selectedBoard, setSelectedBoard] = useState<number>()
  const [boardOptions, setBoardOptions] = useState<DropdownChoice[]>()

  const handleChangeWords = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setWordsText(event.target.value)
  }

  const handleCreate = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const words = wordsText.split("\n").filter(w => w.length > 0)
    const bs = solveBoard(words, 1).sort((a, b) => score(b) - score(a))

    const options = bs.map((b, idx) => {
      const group = `Size: ${b.width}-${b.height}`
      return {
        group,
        label: `${idx}`,
        value: idx,
      }
    })

    setBoardOptions(options)
    setBoards(boards)
    setSelectedBoard(0)
  }

  return (
    <div className="App">
      <Body className="App-header">
        <label>
          Words:
        </label>
        <textarea rows={5} cols={20} name="wordsText" value={wordsText} onChange={handleChangeWords} />
        <button onClick={handleCreate} disabled={wordsText.length === 0}>Create</button>
        {boards &&
          boards.length === 0 &&
          <div className="text">{boards.length === 0 ? "No completed boards found" : null}</div>
        }
        {boards && boards.length > 0 &&
            <div>
                <Dropdown choices={boardOptions || []} selectChoice={setSelectedBoard}/>
                <br/>
                {/* <Crossword board={boards[Number(selectedBoard)]}/> */}
                <br/>
            </div>
        }
      </Body>
    </div>
  )
}

export default CrosswordMaker
