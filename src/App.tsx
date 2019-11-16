import React, { useState, useEffect } from 'react';
import './App.css';
import Crossword from './components/Crossword';
import { Body, Header, Text } from './components/style';
import Board from './containers/Board';
import { solveBoard, wordToString } from './utils/boardUtils';
import { CONFIG } from './config';
import { choose, getSubsetWords } from './utils/utils';
import { commonWords } from './data/commonWords';
import Letters from './components/Letters';
import { Word } from './types';


const App: React.FunctionComponent = () => {
  const [board, setBoard] = useState<Board>()
  const [solvedWords, setSolvedWords] = useState<Word[]>([])
  const [unsolvedWords, setUnsolvedWords] = useState<Word[]>([])
  
  const createBoard = (): Board => {
    console.log('trying...')
    const allWords = commonWords.filter(w => w.length >= CONFIG.min_word_len)
    const longWord = choose(allWords.filter(w => w.length === CONFIG.max_word_len))
    const words = getSubsetWords(longWord, allWords)

    if (words.length < CONFIG.min_num_words || words.length > CONFIG.max_num_words )
      // board not adequate, try again
      return createBoard()
    
    const boards = solveBoard(words, 1)

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
        <Text>Word Search Crossword</Text>
        <button onClick={() => setBoard(createBoard())}>Create</button>
      </Header>
      <Body>
          
          <br/>
          {board &&
              <Crossword board={board} solved={solvedWords}/>
          }
          <br/>
              {board && <Letters onSolveWord={handleSolveWord} letters={board.letters()}/>}

      </Body>
    </div>
  );
}

export default App;
