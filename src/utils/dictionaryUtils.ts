var fs = require('fs');

const COMMON_WORDS_PATH = '../data/common_words.csv'
const ALL_WORDS_PATH = '../data/words'

const parseCommonWords = (filename: string): string[] => {
    const raw = fs.readFileSync(filename, 'utf8')
    return raw.split('\r\n').slice(1).map((r: any) => {
        const [rank, word, len, partOfSpeech, frequency, dispersion] = r.split(',')
        return word
    })
}

const parseAllWords = (filename: string) => {
    const raw = fs.readFileSync(filename, 'utf8')
    return raw.split('\n')
}

export const commonWords = () => parseCommonWords(COMMON_WORDS_PATH)

export const allWords = () => parseAllWords(ALL_WORDS_PATH)
