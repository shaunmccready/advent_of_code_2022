import {
    getArrayOfMovementLinesFromFile,
    createInitialGrid,
    processMovementInstruction,
    createVisualGrid,
    createBlankGrid,
    populateAndPrintVisitsGrid,
    getUniqueVisits
} from './utils'

function part1() {
    const movementInstructions = getArrayOfMovementLinesFromFile('realMovements.txt')
    const numOfRows = 30
    const numOfCols = 30
    const ropeGrid = createInitialGrid(numOfRows, numOfCols)

    for (const instruction of movementInstructions) {
        let [direction, amountToMove] = instruction.split(' ')
        processMovementInstruction(direction, +amountToMove, ropeGrid)
    }

    const uniqueVisits = getUniqueVisits(ropeGrid.tVisits)
    console.log('Total tail visits: ', uniqueVisits.length)
}

console.log('***** Part 1 *****')
part1()

// console.log('\n***** Part 2 *****')
