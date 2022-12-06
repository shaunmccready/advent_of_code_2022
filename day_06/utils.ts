import { readFileSync } from 'fs'

export function getArrayOfInstructionLinesFromFile(filename: string) {
    const contents = readFileSync(filename, 'utf-8')
    const lineArray = contents.split(/\r?\n/)
    return lineArray
}

function findFirstUniqueCharacters(line: string, countOfConsecutiveCharacters: number): string {
    let firstMarkerCount = 1
    let fourUniqueChecker = new Set<string>()
    let consecutiveChars: string[] = []

    for (let char of line) {
        consecutiveChars.push(char)

        if (consecutiveChars.length === countOfConsecutiveCharacters) {
            consecutiveChars.forEach((ch) => fourUniqueChecker.add(ch))

            if (fourUniqueChecker.size === countOfConsecutiveCharacters) {
                return consecutiveChars.join('')
            } else {
                consecutiveChars.shift()
                fourUniqueChecker.clear()
            }
        }
    }

    throw new Error(`Was not able to find the 4 characters in the line: ${line}`)
}

export function findFirstConsecutiveUniqueCharacterPosition(line: string, countOfConsecutiveCharacters: number): number {
    const fourChars = findFirstUniqueCharacters(line, countOfConsecutiveCharacters)
    const position = line.indexOf(fourChars) + countOfConsecutiveCharacters

    return position
}
