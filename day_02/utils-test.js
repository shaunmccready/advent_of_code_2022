import { calculateOutcomes, getResult } from './utils.js'

console.log('Win with X:', calculateOutcomes('win', 'X'))
console.log('Lose with Y:', calculateOutcomes('lose', 'Y'))
console.log('Draw with Z:', calculateOutcomes('draw', 'Z'))
console.log('Win with Z:', calculateOutcomes('win', 'Z'))
console.log('\n')

console.log('A & Y:', getResult('A', 'Y'))
console.log('B & X', getResult('B', 'X'))
console.log('C & Z', getResult('C', 'Z'))
console.log('\n')

let total = 0
total = total + calculateOutcomes(getResult('A', 'Y'), 'Y')
total = total + calculateOutcomes(getResult('B', 'X'), 'X')
total = total + calculateOutcomes(getResult('C', 'Z'), 'Z')

console.log('Total:', total)
