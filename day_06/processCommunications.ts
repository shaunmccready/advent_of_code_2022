import { getArrayOfInstructionLinesFromFile, findFirstConsecutiveUniqueCharacterPosition } from './utils'

const inputArray = getArrayOfInstructionLinesFromFile('input.txt')

function part1() {
    const consecutiveCharsCount = 4

    for (let line of inputArray) {
        const result = findFirstConsecutiveUniqueCharacterPosition(line, consecutiveCharsCount)
        console.log(result)
        // Result is  1210
    }
}

function part2() {
    const consecutiveCharsCount = 14

    for (let line of inputArray) {
        const result = findFirstConsecutiveUniqueCharacterPosition(line, consecutiveCharsCount)
        console.log(result)
        // Result is  3476
    }
}

console.log('***** PART 1 *****')
part1()

console.log('\n***** PART 2 *****')
part2()
