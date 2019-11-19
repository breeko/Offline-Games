import _ from "lodash"
import React, { useEffect, useState } from "react"
import "./App.css"
import Crossword from "./components/Crossword"
import Letters from "./components/Letters"
import { Body, Button, Header, Text } from "./components/style"
import { CONFIG } from "./config"
import Board from "./containers/Board"
import { commonWords } from "./data/commonWords"
import { Word } from "./types"
import { solveBoard, wordToString } from "./utils/boardUtils"
import { choose, getSubsetWords } from "./utils/utils"

const App: React.FunctionComponent = () => {
  const [board, setBoard] = useState<Board>()
  const [solvedWords, setSolvedWords] = useState<Word[]>([])
  const [unsolvedWords, setUnsolvedWords] = useState<Word[]>([])
  const [letters, setLetters] = useState<string[]>()

  const createBoard = (): Board => {
    const allWords = commonWords.filter(w => w.length >= CONFIG.min_word_len)
    const longWord = choose(allWords.filter(w => w.length === CONFIG.max_word_len))
    const words = getSubsetWords(longWord, allWords)

    if (words.length < CONFIG.min_num_words || words.length > CONFIG.max_num_words) {
      // board not adequate, try again
      return createBoard()
    }

    const boards = solveBoard(words, 1, (b: Board) => b.width >= CONFIG.min_height && b.height <= CONFIG.max_height)

    return boards.length === 0 ? createBoard() : boards[0]
  }

  useEffect(() => {
    const b = createBoard()
    setBoard(b)
  }, [])

  useEffect(() => {
    if (board) {
      setUnsolvedWords(board.words())
      setSolvedWords([])
      setLetters(_.shuffle(board.letters()))
    }
  }, [board])

  const handleSolveWord = (word: string) => {
    const solvedWord: Word | undefined = unsolvedWords.find(w => wordToString(w) === word)

    if (solvedWord) {
      const updatedUnsolvedWords = unsolvedWords.filter(w => wordToString(w) !== word)
      const updatedSolvedWords = solvedWords.concat([solvedWord])
      setSolvedWords(updatedSolvedWords)
      setUnsolvedWords(updatedUnsolvedWords)
    }
  }

  console.log(unsolvedWords.map(w => wordToString(w)))

  return (
    <div className="App">
      <Header className="App-header">
        <Text>{board && unsolvedWords.length > 0 ? "Word Search Crossword" : "Winner!"}</Text>
      </Header>
      <Body>
          <br/>
          {board &&
              <Crossword board={board} solved={solvedWords}/>
          }
          <br/>
            {board && letters && <Letters onSolveWord={handleSolveWord} letters={letters}/>}
            <div>
              <Button onClick={() => setBoard(createBoard())}>Create</Button>
              <Button onClick={() => setLetters(_.shuffle(letters || []))}>Shuffle</Button>
            </div>
      </Body>
    </div>
  )
}

export default App
