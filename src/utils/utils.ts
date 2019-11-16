export const choose = <T>(choices: T[]): T => {
    const index = Math.floor(Math.random() * choices.length)
    return choices[index]
}

export const counter = (chars: string[]): Map<string, number> => {
    const ct = new Map<string,number>()
    chars.forEach(ch => ct.set(ch, (ct.get(ch) || 0) + 1))
    return ct
}

const isSubsetWord = (word1: string, word2: string): boolean => {
    // returns whether one word is a subset of another
    // e.g. isSubsetWord(me, team) => true
    const ct1 = counter(word1.split(''))
    const ct2 = counter(word2.split(''))
    return Array.from(ct1).every(([k,v]) => (ct2.get(k) || 0) >= v)
}

export const getSubsetWords = (word: string, words: string[]): string[] => 
  words.filter(w => isSubsetWord(w, word))

export const difference = (a: string[], b: string[]): string[] => {
    const ct1 = counter(a)
    const ct2 = counter(b)
    const ct2Missing = Array.from(ct1).filter(([k,v]) => (ct2.get(k) || 0) < v).map(([k,_]) => k)
    const ct1Missing = Array.from(ct2).filter(([k,v]) => (ct1.get(k) || 0) < v).map(([k,_]) => k)
    return [...ct1Missing, ...ct2Missing]
}
