import {
    onlyUnique,
    calculateSum,
    getArrayOfLinesFromFile,
    getCommonLettersFromDoubleIndexArray,
    getUniqueLetterFromTripleIndexArray,
    getCommonLettersFromTripleIndexArray
} from './constantsAndUtils.js'

function processSacksPart1() {
    const lineArray = getArrayOfLinesFromFile('input.txt')
    let commonLetters = getCommonLettersFromDoubleIndexArray(lineArray)

    console.log('Sum is:', calculateSum(commonLetters))
}

function processSacksPart2() {
    const lineArray = getArrayOfLinesFromFile('input.txt')
    const commonLetters = getCommonLettersFromTripleIndexArray(lineArray)

    console.log('Sum is:', calculateSum(commonLetters))
}

console.log('***** Part 1 *****')
processSacksPart1()
// Sum should be = 8252

console.log('\n***** Part 2 *****')
processSacksPart2()
// Sum should be: 2828
