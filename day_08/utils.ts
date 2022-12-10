import { readFileSync } from 'fs'

export function getArrayOfTreeLinesFromFile(filename: string) {
    const contents = readFileSync(filename, 'utf-8')
    const lineArray = contents.split(/\r?\n/)
    return lineArray
}

export function createTreeGridFromLinesOfTrees(treeLines: string[]): number[][] {
    const treesGrid: number[][] = []

    for (let line of treeLines) {
        const treeLine: number[] = []

        for (let tree of line) {
            treeLine.push(+tree)
        }
        treesGrid.push(treeLine)
    }

    return treesGrid
}

export function getAllOuterTrees(treeGrid: number[][]): number[] {
    const treeRows = treeGrid.length
    const treeColumns = treeGrid[0].length

    const outerTrees: number[] = []

    // get outer top and bottom trees
    treeGrid[0].forEach((tree) => outerTrees.push(tree))
    treeGrid[treeRows - 1].forEach((tree) => outerTrees.push(tree))

    // get outer left and right trees (minus the ones on the top and bottom)
    for (let i = 1; i < treeGrid.length - 1; i++) {
        outerTrees.push(treeGrid[i][0])
        outerTrees.push(treeGrid[i][treeColumns - 1])
    }

    return outerTrees
}

export function getAllVisibleInnerTrees(treeGrid: number[][]): number[] {
    const visibleInnerTrees: number[] = []

    for (let i = 1; i < treeGrid.length - 1; i++) {
        const treeRow = treeGrid[i]

        for (let j = 1; j < treeRow.length - 1; j++) {
            let allTopTrees: number[] = []
            let allBottomTrees: number[] = []
            let allLeftTrees: number[] = []
            let allRightTrees: number[] = []

            const currVal = treeGrid[i][j]

            // top = i--
            let currRow = i
            while (currRow > 0) {
                const topVal = treeGrid[currRow - 1][j]
                allTopTrees.push(topVal)
                currRow--
            }

            // bottom = i++
            currRow = i
            while (currRow < treeGrid.length - 1) {
                const bottomVal = treeGrid[currRow + 1][j]
                allBottomTrees.push(bottomVal)
                currRow++
            }

            //left = j--
            let currCol = j
            while (currCol > 0) {
                const leftVal = treeGrid[i][currCol - 1]
                allLeftTrees.push(leftVal)
                currCol--
            }

            //right = j++
            currCol = j
            while (currCol < treeGrid.length - 1) {
                const rightVal = treeGrid[i][currCol + 1]
                allRightTrees.push(rightVal)
                currCol++
            }

            const blockingTreesTop = allTopTrees.filter((tree) => tree >= currVal)
            const blockingTreesBottom = allBottomTrees.filter((tree) => tree >= currVal)
            const blockingTreesLeft = allLeftTrees.filter((tree) => tree >= currVal)
            const blockingTreesRight = allRightTrees.filter((tree) => tree >= currVal)

            // Tree considered visible if at least one side is not blocked
            if (
                !blockingTreesTop.length ||
                !blockingTreesBottom.length ||
                !blockingTreesLeft.length ||
                !blockingTreesRight.length
            ) {
                visibleInnerTrees.push(currVal)
            }
        }
    }

    return visibleInnerTrees
}

function getTreeVisibilityCount(valToCompare: number, treeArray: number[]): number {
    let visCounter = 0
    for (let num of treeArray) {
        visCounter++
        if (num >= valToCompare) break
    }
    return visCounter
}

export function getVisibilityScoreOfTreesSortedDesc(treeGrid: number[][]): number[] {
    const visibilityScores: number[] = []

    for (let i = 0; i < treeGrid.length; i++) {
        const treeRow = treeGrid[i]

        for (let j = 0; j < treeRow.length; j++) {
            let allTopTrees: number[] = []
            let allBottomTrees: number[] = []
            let allLeftTrees: number[] = []
            let allRightTrees: number[] = []

            const currVal = treeGrid[i][j]
            let currRow, currCol

            // top = i--
            if (i !== 0) {
                currRow = i
                while (currRow > 0) {
                    const topVal = treeGrid[currRow - 1][j]
                    allTopTrees.push(topVal)
                    currRow--
                }
            }

            // bottom = i++
            if (i !== treeGrid.length - 1) {
                currRow = i
                while (currRow < treeGrid.length - 1) {
                    const bottomVal = treeGrid[currRow + 1][j]
                    allBottomTrees.push(bottomVal)
                    currRow++
                }
            }

            //left = j--
            if (j !== 0) {
                currCol = j
                while (currCol > 0) {
                    const leftVal = treeGrid[i][currCol - 1]
                    allLeftTrees.push(leftVal)
                    currCol--
                }
            }

            //right = j++
            if (j !== treeRow.length - 1) {
                currCol = j
                while (currCol < treeGrid.length - 1) {
                    const rightVal = treeGrid[i][currCol + 1]
                    allRightTrees.push(rightVal)
                    currCol++
                }
            }

            const visibilitiesFromCurrentPosition: number[] = []

            let visCount = getTreeVisibilityCount(currVal, allTopTrees)
            if (visCount > 0) visibilitiesFromCurrentPosition.push(visCount)

            visCount = getTreeVisibilityCount(currVal, allBottomTrees)
            if (visCount > 0) visibilitiesFromCurrentPosition.push(visCount)

            visCount = getTreeVisibilityCount(currVal, allLeftTrees)
            if (visCount > 0) visibilitiesFromCurrentPosition.push(visCount)

            visCount = getTreeVisibilityCount(currVal, allRightTrees)
            if (visCount > 0) visibilitiesFromCurrentPosition.push(visCount)

            visibilityScores.push(getVisibilityScore(visibilitiesFromCurrentPosition))
        }
    }

    //Sort the scores descending (highest first)
    visibilityScores.sort((a, b) => b - a)
    return visibilityScores
}

function getVisibilityScore(visibilitiesFromCurrentPosition: number[]): number {
    let finalVisibilityScore = 1
    visibilitiesFromCurrentPosition.forEach((num) => (finalVisibilityScore = finalVisibilityScore * num))
    return finalVisibilityScore
}
