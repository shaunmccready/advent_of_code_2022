import {
    getArrayOfTreeLinesFromFile,
    createTreeGridFromLinesOfTrees,
    getAllOuterTrees,
    getAllVisibleInnerTrees,
    getVisibilityScoreOfTreesSortedDesc
} from './utils'

const treeLinesToParse = getArrayOfTreeLinesFromFile('realTreeLines.txt')
const treesGrid = createTreeGridFromLinesOfTrees(treeLinesToParse)

function part1() {
    const visibleOuterTrees = getAllOuterTrees(treesGrid)
    const visibleInnerTrees = getAllVisibleInnerTrees(treesGrid)

    const totalVisible = visibleOuterTrees.length + visibleInnerTrees.length
    console.log(`total visible trees = ${totalVisible}`)
}

function part2() {
    const visibilitiesOfTrees = getVisibilityScoreOfTreesSortedDesc(treesGrid)
    console.log('Final answer:', visibilitiesOfTrees[0])
}

console.log('***** Part 1 *****')
part1()
// Result = 1690

console.log('\n***** Part 2 *****')
part2()
// Result = 535680
