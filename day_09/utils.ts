import { readFileSync } from 'fs'

export function getArrayOfMovementLinesFromFile(filename: string) {
    const contents = readFileSync(filename, 'utf-8')
    const lineArray = contents.split(/\r?\n/)
    return lineArray
}

type GridDetails = {
    sPosition: number[]
    hPosition: number[]
    hPrevious: number[]
    tPosition: number[]
    tVisits: number[][]
    grid: string[][]
}

export function createBlankGrid(numOfRows: number, numOfCols: number): string[][] {
    const blankGrid: string[][] = new Array(numOfRows)

    for (let i = 0; i < numOfRows; i++) {
        let blankArray: string[] = []
        for (let j = 0; j < numOfCols; j++) {
            blankArray[j] = '.'
        }
        blankGrid[i] = blankArray
    }

    return blankGrid
}

export function createInitialGrid(numOfRows: number, numOfCols: number): GridDetails {
    const gridArray = {
        sPosition: [4, 0],
        hPosition: [4, 0],
        hPrevious: [],
        tPosition: [4, 0],
        tVisits: [[4, 0]],
        grid: createBlankGrid(numOfRows, numOfCols)
    }

    return gridArray
}

export function createVisualGrid(gridDetails: GridDetails) {
    const numOfRows = gridDetails.grid.length
    const numOfCols = gridDetails.grid[0].length

    const grid = createBlankGrid(numOfRows, numOfCols)

    grid[numOfRows - 1][0] = 's'
    const [tRow, tCol] = gridDetails.tPosition
    const [hRow, hCol] = gridDetails.hPosition

    //Place T before H, that way if they occupy the same location, H is on top
    grid[tRow][tCol] = 'T'
    grid[hRow][hCol] = 'H'

    console.log(grid)
    return grid
}

export function processMovementInstruction(direction: string, amountToMove: number, grid: GridDetails): void {
    for (let i = 0; i < amountToMove; i++) {
        const currHLocation = grid.hPosition
        const currTLocation = grid.tPosition

        // Move H once
        const newHPosition = moveByDirection(currHLocation, direction)
        grid.hPrevious = currHLocation
        grid.hPosition = newHPosition

        // printGridOut
        // createVisualGrid(grid)

        // check if T is within touching distance
        const tRowDiff = Math.abs(newHPosition[0] - currTLocation[0])
        const tcolDiff = Math.abs(newHPosition[1] - currTLocation[1])

        //   if no move T once
        //      update T position
        //      add new T position to tVisits
        if (tRowDiff > 1 || tcolDiff > 1) {
            grid.tPosition = grid.hPrevious
            grid.tVisits.push(grid.tPosition)
        }

        // printGridOut
        // createVisualGrid(grid)
    }
}

function moveByDirection(currPos: number[], direction: string) {
    switch (direction) {
        case 'U':
            return [currPos[0] - 1, currPos[1]]
        case 'D':
            return [currPos[0] + 1, currPos[1]]
        case 'L':
            return [currPos[0], currPos[1] - 1]
        case 'R':
            return [currPos[0], currPos[1] + 1]
        default:
            throw new Error(`Problem figuring out where to move! Direction:${direction}`)
    }
}

export function populateAndPrintVisitsGrid(grid: string[][], visits: Set<number[]>): void {
    console.log('visits:', visits)

    visits.forEach(([row, col]) => {
        grid[row][col] = '#'
    })

    console.log('visit grid:', grid)
}

export function getUniqueVisits(visits: number[][]): number[][] {
    const uniqueVisits: number[][] = []

    for (let i = 0; i < visits.length; i++) {
        const [row, col] = visits[i]
        // console.log('visit:', row, col)

        const arrToInsert = [row, col]

        const insertString = JSON.stringify(arrToInsert)
        let contains = false
        for (let j = 0; j < uniqueVisits.length; j++) {
            const [row, col] = uniqueVisits[j]

            const entryString = JSON.stringify([row, col])

            if (insertString === entryString) {
                contains = true
                break
            }
        }

        if (!contains) {
            uniqueVisits.push(arrToInsert)
        }
    }

    return uniqueVisits
}
