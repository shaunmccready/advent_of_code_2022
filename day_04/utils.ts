import { readFileSync } from 'fs'

export function getArrayOfLinesFromFile(filename: string) {
    const contents = readFileSync(filename, 'utf-8')
    const lineArray = contents.split(/\r?\n/)
    return lineArray
}

type SectionMap = { [key: number]: boolean | undefined }

type ElfPairs = { leftSide: SectionMap; rightSide: SectionMap }

export function extractSides(line: string): SectionMap[] {
    const pairsArray = line.split(',')

    const splitLeft = pairsArray[0].split('-')
    const splitRight = pairsArray[1].split('-')

    const leftSide = parseSideOfPairToObject(splitLeft)
    const rightSide = parseSideOfPairToObject(splitRight)

    return Array.of(leftSide, rightSide)
}

export function parseSideOfPairToObject(pairArray: string[]): SectionMap {
    const firstLeftVal = +pairArray[0]
    const lastLeftVal = +pairArray[1]

    const side: SectionMap = {
        [firstLeftVal]: true
    }

    if (firstLeftVal === lastLeftVal) {
        // nothing left to parse
    } else {
        for (let i = firstLeftVal + 1; i <= lastLeftVal; i++) {
            side[i] = true
        }

        // console.log('Side:', side)
    }

    return side
}

export function verifyOneSideContainsAnother(leftSide: SectionMap, rightSide: SectionMap): boolean {
    const compareLeft = verifyOneCompleteSide(leftSide, rightSide)
    const compareRight = verifyOneCompleteSide(rightSide, leftSide)

    return compareLeft || compareRight ? true : false
}

function verifyOneCompleteSide(side1: SectionMap, side2: SectionMap) {
    let totalEntriesToCheck = Object.keys(side2).length

    for (const key of Object.keys(side1)) {
        side2[+key]

        if (side2[+key] !== undefined) {
            totalEntriesToCheck--
        }

        if (totalEntriesToCheck === 0) {
            return true
        }
    }

    //Side 1 does not contains Side 2
    return false
}

export function verifyAnyOverlapOfSides(leftSide: SectionMap, rightSide: SectionMap): boolean {
    for (const key of Object.keys(leftSide)) {
        rightSide[+key]

        if (rightSide[+key]) {
            return true
        }
    }

    // No overlaps at all
    return false
}
