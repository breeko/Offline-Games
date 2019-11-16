import { score, solveBoard } from './src/utils/boardUtils'
import Board from './src/containers/Board'
import { Point, Word } from './src/types'
import _ from 'lodash'
import { difference } from './src/utils/utils'

const b = new Board([
    [null,null,'e' ,null ,null,null],
    ['a' ,'b' ,'c' ,'d' ,null,'p'],
    [null,null,'f' ,null,null,'o'],
    [null,null,'g' ,'h' ,'j', 'j'],
    [null,null,'k' ,null,null,null],
    ['n','m' ,'l' ,'n' ,'n', 'z'],
])

// console.log(b.toString())


// console.log(b.get(0,2))
// console.log(['a'] === ['a'])
// console.log(getWord(b, {col:2,row:0}))

const x = _.groupBy([{a: 1, b: 'b'}, {a: 1, b: 'c'}, {a: 2, b: 'd'}], (a) => a.a)

console.log(Object.keys(x).map(k => x[k]))
// console.log(solve([ 'its', 'lot', 'sit', 'stop', 'oil', 'top', 'list', 'spot','lots', 'lip', 'pilot', 'slip', 'soil', 'tip', 'post',  'pot', 'lost', 'split',])) //'plot', 'pit', 'opt', 'slot', 'spit', 'pistol']).map(b => b.toString()))

