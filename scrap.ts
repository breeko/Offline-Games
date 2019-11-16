import fs from 'fs'
import { isSubsetWord } from './src/utils/utils'

const filename = './common_words.csv'
const getCommonWords = (filename: string) => {
    const raw = fs.readFileSync(filename, 'utf8')
    return raw.split('\r\n').slice(1).map(r => {
        const [rank, word, len, partOfSpeech, frequency, dispersion] = r.split(',')
        return {
            rank: Number(rank),
            word, len: Number(len),
            partOfSpeech,
            frequency: Number(frequency),
            dispersion: Number(dispersion)
        }
    })
}

const getAllWords = (filename: string) => {
    const raw = fs.readFileSync(filename, 'utf8')
    return raw.split('\n')
}

// const words = getCommonWords(filename)
const allWords = getAllWords('./data/words')
console.log(allWords[0])
// const allWords = words.map(w => w.word)


const getSubsetWords = (word: string, words: string[]): string[] => 
  words.filter(w => isSubsetWord(w, word))
console.log(getSubsetWords("cameron", allWords).filter(w => w.length > 2))
// const allWords6 = allWords.filter(w => w.length === 6)

// const subsetWords6: [string, string[]][] = allWords6.map(w => [w, getSubsetWords(w, allWords)])

// const best = subsetWords6.reduce((a,b) => (a.length > b.length) ? a : b)
