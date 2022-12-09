import {
    TreeNode,
    printOutTree,
    calculateSizesOfDirectories,
    getAllDirectoriesWithAtMostSize,
    calculateSumOfAllDirectories
} from './data-structures'
import { getArrayOfInstructionLinesFromFile } from './utils'

function part1() {
    const myTree = new TreeNode('/')

    const instructions = getArrayOfInstructionLinesFromFile('instructions.txt')
    //remove first instruction cd /
    instructions.shift()
    let directoryStack: TreeNode[] = [myTree]

    for (let instruction of instructions) {
        if (instruction === '$ ls') continue //ignore listing

        if (instruction === '$ cd ..') {
            directoryStack.pop()
            continue
        }

        if (instruction.startsWith('$ cd')) {
            const [, , directoryName] = instruction.split(' ')

            const newCurrentDirectory = directoryStack[directoryStack.length - 1].getChildDirectory(directoryName)
            directoryStack.push(newCurrentDirectory)
        } else {
            const lineDetails = instruction.split(' ')

            if (lineDetails[0] === 'dir') {
                directoryStack[directoryStack.length - 1].addDirectory(lineDetails[1], new TreeNode(lineDetails[1]))
            } else {
                directoryStack[directoryStack.length - 1].addfile({ name: lineDetails[1], size: +lineDetails[0] })
            }
        }
    }

    calculateSizesOfDirectories(myTree)
    // printOutTree(myTree, 0)

    const atMostSize = 100000
    const directoriesUnderSize = getAllDirectoriesWithAtMostSize(myTree, atMostSize)

    // console.log('\nDIRS', directoriesUnderSize)

    const directoriesSum = calculateSumOfAllDirectories(directoriesUnderSize)
    console.log(`\nTotal size of all directories(${directoriesUnderSize.size} total) under 1000000: `, directoriesSum)
}

console.log('***** PART 1 *****')
part1()
