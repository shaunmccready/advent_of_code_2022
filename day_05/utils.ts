import { readFileSync } from 'fs'

export type Crates = { [key: string]: string[] | undefined }

export function getArrayOfInstructionLinesFromFile(filename: string) {
    const contents = readFileSync(filename, 'utf-8')
    const lineArray = contents.split(/\r?\n/)
    return lineArray
}

export function getCargoCratesFromFile(filename: string): Crates {
    const contents = readFileSync(filename, 'utf-8')
    const lineArray = contents.split(/\r?\n/)
    lineArray.reverse()

    let cargoCrates: Crates = {}
    let firstLineCompleted = false

    for (let line of lineArray) {
        if (!firstLineCompleted) {
            const numOfCrates = line.match(/\d+/g)

            numOfCrates?.forEach((numberStr: string) => {
                cargoCrates[numberStr] = []
            })

            firstLineCompleted = true
        } else {
            // Parse all crates and add them
            const parsedLine = line.match(/.{2,4}/g)

            if (parsedLine) {
                for (let i = 0; i < parsedLine.length; i++) {
                    const token = parsedLine[i]
                    if (token.trim() === '') {
                        // theres no crate to add
                        continue
                    }

                    const crateToAdd = token.match(/[A-Z]/)?.[0]

                    if (crateToAdd) {
                        cargoCrates[i + 1]?.push(crateToAdd)
                    }
                }
            }
        }
    }

    return cargoCrates
}
