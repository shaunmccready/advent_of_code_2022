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
    const treeRows = treeGrid.length
    const treeColumns = treeGrid[0].length

    const visibleInnerTrees: number[] = []

    let allTopTrees: number[] = []
    let allBottomTrees: number[] = []
    let allLeftTrees: number[] = []
    let allRightTrees: number[] = []

    for (let i = 1; i < treeGrid.length - 1; i++) {
        const treeRow = treeGrid[i]

        for (let j = 1; j < treeRow.length - 1; j++) {
            const currVal = treeGrid[i][j]
            // console.log('curr val', currVal)
            // console.log('row:', i)

            // top = i--
            let currRow = i
            while (currRow > 0) {
                const topVal = treeGrid[currRow - 1][j]
                allTopTrees.push(topVal)
                currRow--
            }

            // bottom
            currRow = i
            while (currRow < treeGrid.length - 1) {
                const bottomVal = treeGrid[currRow + 1][j]
                allBottomTrees.push(bottomVal)
                currRow++
            }

            //left
            let currCol = j
            while (currCol > 0) {
                const leftVal = treeGrid[i][currCol - 1]
                allLeftTrees.push(leftVal)
                currCol--
            }

            //right
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

            if (
                !blockingTreesTop.length ||
                !blockingTreesBottom.length ||
                !blockingTreesLeft.length ||
                !blockingTreesRight.length
            ) {
                visibleInnerTrees.push(currVal)
            }

            //reset directional tree arrays
            allTopTrees = []
            allBottomTrees = []
            allLeftTrees = []
            allRightTrees = []
        }
    }

    return visibleInnerTrees
}

export function getVisibilityScoreOfTrees(treeGrid: number[][]): number[] {
    const treeRows = treeGrid.length
    const treeColumns = treeGrid[0].length

    const visibilityScores: number[] = []

    let allTopTrees: number[] = []
    let allBottomTrees: number[] = []
    let allLeftTrees: number[] = []
    let allRightTrees: number[] = []

    for (let i = 0; i < treeGrid.length; i++) {
        const treeRow = treeGrid[i]

        for (let j = 0; j < treeRow.length; j++) {
            const currVal = treeGrid[i][j]
            console.log('curr val', currVal)
            console.log('row:', i)

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

            let visCounter = 0
            for (let num of allTopTrees) {
                visCounter++
                if (num >= currVal) break
            }
            if (visCounter > 0) visibilitiesFromCurrentPosition.push(visCounter)
            console.log('Top vis counter:', visCounter)

            visCounter = 0
            for (let num of allBottomTrees) {
                visCounter++
                if (num >= currVal) break
            }
            if (visCounter > 0) visibilitiesFromCurrentPosition.push(visCounter)
            console.log('Bottom vis counter:', visCounter)

            visCounter = 0
            for (let num of allLeftTrees) {
                visCounter++
                if (num >= currVal) break
            }
            if (visCounter > 0) visibilitiesFromCurrentPosition.push(visCounter)
            console.log('Left vis counter:', visCounter)

            visCounter = 0
            for (let num of allRightTrees) {
                visCounter++
                if (num >= currVal) break
            }
            if (visCounter > 0) visibilitiesFromCurrentPosition.push(visCounter)
            console.log('Right vis counter:', visCounter)

            console.log('All visibility scores:', visibilitiesFromCurrentPosition)

            let finalVisibilityScore = 1
            visibilitiesFromCurrentPosition.forEach((num) => (finalVisibilityScore = finalVisibilityScore * num))
            console.log('final vis score:', finalVisibilityScore)
            visibilityScores.push(finalVisibilityScore)

            //reset directional tree arrays
            allTopTrees = []
            allBottomTrees = []
            allLeftTrees = []
            allRightTrees = []

            console.log('\n')
        }

        console.log('*****')
    }

    return visibilityScores
}
