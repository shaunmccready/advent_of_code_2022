import {
    TreeNode,
    printOutTree,
    calculateSizesOfDirectories,
    getAllDirectorySizesWithAtLeast,
    getAllDirectoriesWithAtMostSize,
    getSmallestDirectory,
    calculateSumOfAllDirectories
} from './data-structures'
import { getArrayOfInstructionLinesFromFile } from './utils'

function part1(): TreeNode {
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
    printOutTree(myTree, 0)

    const atMostSize = 100000
    const directoriesUnderSize = getAllDirectoriesWithAtMostSize(myTree, atMostSize)

    const directoriesSum = calculateSumOfAllDirectories(directoriesUnderSize)
    console.log(`\nTotal size of all directories under 1000000: `, directoriesSum)

    return myTree
}

function part2(myTree: TreeNode) {
    const totalDiscSpace = 70000000
    const spaceNeededForUpdate = 30000000

    const sizeOfDisc = myTree.getDirectorySize()

    const remainingSpaceOnDisc = totalDiscSpace - sizeOfDisc
    console.log('remaining space on disc: ', remainingSpaceOnDisc)

    const spaceToDelete = spaceNeededForUpdate - remainingSpaceOnDisc
    console.log('Need to delete:', spaceToDelete)

    const candidateDirectories = getAllDirectorySizesWithAtLeast(myTree, spaceToDelete)
    console.log('candidates:', candidateDirectories)

    const smallestDirectory = getSmallestDirectory(candidateDirectories)
    console.log('Directory to delete:', smallestDirectory)
}

console.log('***** PART 1 *****')
const myTree = part1()

console.log('\n***** PART 2 *****')
part2(myTree)
