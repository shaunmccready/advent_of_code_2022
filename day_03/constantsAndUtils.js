import { readFileSync } from 'fs'

export const letterPriorityValues = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    f: 6,
    g: 7,
    h: 8,
    i: 9,
    j: 10,
    k: 11,
    l: 12,
    m: 13,
    n: 14,
    o: 15,
    p: 16,
    q: 17,
    r: 18,
    s: 19,
    t: 20,
    u: 21,
    v: 22,
    w: 23,
    x: 24,
    y: 25,
    z: 26,
    A: 27,
    B: 28,
    C: 29,
    D: 30,
    E: 31,
    F: 32,
    G: 33,
    H: 34,
    I: 35,
    J: 36,
    K: 37,
    L: 38,
    M: 39,
    N: 40,
    O: 41,
    P: 42,
    Q: 43,
    R: 44,
    S: 45,
    T: 46,
    U: 47,
    V: 48,
    W: 49,
    X: 50,
    Y: 51,
    Z: 52
}

export function onlyUnique(value, index, self) {
    return self.indexOf(value) === index
}

export function calculateSum(commonLetters) {
    let sumOfPriorities = 0
    for (const letter of commonLetters) {
        const letterValue = +letterPriorityValues[letter]
        sumOfPriorities = sumOfPriorities + letterValue
    }

    return sumOfPriorities
}

export function getArrayOfLinesFromFile(filename) {
    const contents = readFileSync(filename, 'utf-8')
    const lineArray = contents.split(/\r?\n/)
    return lineArray
}

export function getCommonLettersFromDoubleIndexArray(lineArray) {
    let commonLetters = []
    for (const line of lineArray) {
        const firstSack = line.slice(0, line.length / 2)
        const secondSack = line.slice(line.length / 2, line.length)

        const nonUniqueCommonLetters = []
        for (const firstLetter of firstSack) {
            for (const secondLetter of secondSack) {
                if (firstLetter === secondLetter) {
                    nonUniqueCommonLetters.push(firstLetter)
                }
            }
        }

        const uniqueCommonLetters = nonUniqueCommonLetters.filter(onlyUnique)
        commonLetters = commonLetters.concat(uniqueCommonLetters)
    }

    return commonLetters
}

export function getUniqueLetterFromTripleIndexArray(tempGroupArray) {
    const firstLine = tempGroupArray[0]
    const secondLine = tempGroupArray[1]
    const thirdLine = tempGroupArray[2]
    const nonUniqueCommonLetters = []

    for (const firstLetter of firstLine) {
        for (const secondLetter of secondLine) {
            if (firstLetter === secondLetter && thirdLine.includes(firstLetter)) {
                nonUniqueCommonLetters.push(firstLetter)
            }
        }
    }

    const uniqueCommonLetters = nonUniqueCommonLetters.filter(onlyUnique)
    return uniqueCommonLetters
}

export function getCommonLettersFromTripleIndexArray(lineArray) {
    let commonLetters = []
    let tempGroupArray = []
    let countForThreeElves = 0

    for (let i = 0; i < lineArray.length; i++) {
        tempGroupArray.push(lineArray[i])
        countForThreeElves++

        if (countForThreeElves === 3) {
            const uniqueResult = getUniqueLetterFromTripleIndexArray(tempGroupArray)
            commonLetters.push(uniqueResult)

            // Reset values
            tempGroupArray = []
            countForThreeElves = 0
        }
    }

    return commonLetters
}
