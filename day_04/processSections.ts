import { getArrayOfLinesFromFile, extractSides, verifyOneSideContainsAnother, verifyAnyOverlapOfSides } from './utils'

const lineArray = getArrayOfLinesFromFile('input.txt')

let totalNumberOfContainedPairs = 0

for (const line of lineArray) {
    const [leftSide, rightSide] = extractSides(line)

    const contains = verifyOneSideContainsAnother(leftSide, rightSide)

    if (contains) {
        totalNumberOfContainedPairs++
    }
}

console.log('***** Part 1 *****')
console.log('Total number of contained pairs:', totalNumberOfContainedPairs)
// Result = 477

console.log('\n***** Part 2 *****')

let totalNumberOfOverlapPairs = 0
for (const line of lineArray) {
    const [leftSide, rightSide] = extractSides(line)

    const overlap = verifyAnyOverlapOfSides(leftSide, rightSide)

    if (overlap) {
        totalNumberOfOverlapPairs++
    }
}

console.log('Total number of overlap pairs:', totalNumberOfOverlapPairs)
// Result = 830
