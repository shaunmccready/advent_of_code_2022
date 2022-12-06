import { getCargoCratesFromFile, getArrayOfInstructionLinesFromFile } from './utils'
import _ from 'lodash'

const initialStacks = getCargoCratesFromFile('initialCrates.txt')
const instructionArray = getArrayOfInstructionLinesFromFile('steps.txt')

function part1(): void {
    const cratesToShiftPart1 = _.cloneDeep(initialStacks)

    for (let line of instructionArray) {
        const results = line.match(/[0-9]+/g)

        if (!results) {
            break
        }

        let numToMove = +results[0]
        const fromCrate = results[1]
        const toCrate = results[2]

        while (+numToMove > 0) {
            const popped = cratesToShiftPart1[fromCrate]?.pop()

            if (popped) {
                cratesToShiftPart1[toCrate]?.push(popped)
            }

            numToMove--
        }
    }

    const lastCrateArray = []
    for (let crate of Object.values(cratesToShiftPart1)) {
        if (crate) {
            const lastCrate = crate[crate.length - 1]
            lastCrateArray.push(lastCrate)
        }
    }

    console.log('Last crate of each:', lastCrateArray.join(''))
}

function part2(): void {
    const cratesToShiftPart2 = _.cloneDeep(initialStacks)

    for (let line of instructionArray) {
        const results = line.match(/[0-9]+/g)

        if (!results) {
            break
        }

        let numToMove = +results[0]
        const fromCrate = +results[1]
        const toCrate = +results[2]

        const tempStack = []
        while (+numToMove > 0) {
            const popped = cratesToShiftPart2[fromCrate]?.pop()

            if (popped) {
                tempStack.push(popped)
            }

            numToMove--
        }

        const amountToPop = tempStack.length
        for (let j = 0; j < amountToPop; j++) {
            const popped = tempStack.pop()
            if (popped) {
                cratesToShiftPart2[toCrate]?.push(popped)
            }
        }
    }

    let lastCrateArrayPart2 = []
    for (let crate of Object.values(cratesToShiftPart2)) {
        if (crate) {
            const lastCrate = crate[crate.length - 1]
            lastCrateArrayPart2.push(lastCrate)
        }
    }

    console.log('Last crate of each:', lastCrateArrayPart2.join(''))
}

console.log('***** Part 1 *****')
part1()

console.log('\n***** Part 2 *****')
part2()
