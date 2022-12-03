import { Shapes, Outcomes, calculateOutcomes, getResult, getShape, calculateOutcomesFromLetter } from './utils.js'

import { readFileSync } from 'fs'

const readInputAndProcessPart1 = () => {
    const contents = readFileSync('input.txt', 'utf-8')
    const matchArray = contents.split(/\r?\n/)

    let totalScore = 0
    for (const line of matchArray) {
        const match = line.split(' ')

        const player1 = match[0]
        const me = match[1]

        totalScore = totalScore + calculateOutcomes(getResult(player1, me), me)
    }

    console.log('Total score for part 1:', totalScore)
}

readInputAndProcessPart1()

console.log('\n********* Part 2 *********\n\n')

// X = lose
// Y = draw
// Z = win

//rock X
//paper Y
//scissors Z

const readInputAndProcessPart2 = () => {
    const contents = readFileSync('input.txt', 'utf-8')
    const matchArray = contents.split(/\r?\n/)

    let totalScore = 0
    for (const line of matchArray) {
        const match = line.split(' ')

        const player1 = match[0]
        const outcome = match[1]

        totalScore = totalScore + calculateOutcomesFromLetter(outcome, getShape(player1, outcome))
    }

    console.log('Total score for part 2:', totalScore)
}

readInputAndProcessPart2()
