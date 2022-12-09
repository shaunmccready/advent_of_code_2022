import { readFileSync } from 'fs'

export function getArrayOfInstructionLinesFromFile(filename: string) {
    const contents = readFileSync(filename, 'utf-8')
    const lineArray = contents.split(/\r?\n/)
    return lineArray
}
