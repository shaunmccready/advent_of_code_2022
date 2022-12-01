import { readFileSync } from 'fs'

const readInput = () => {
    const contents = readFileSync('input.txt', 'utf-8')
    const contentsArray = contents.split(/\r?\n/)

    console.log('Results length:', contentsArray.length)

    const elfSumArray = []
    let sum = 0

    for (let i = 0; i < contentsArray.length; i++) {
        if (i === contentsArray.length - 1) {
            // last item
            const num = +contentsArray[i]
            sum = sum + num
            console.log(`Elf ${elfSumArray.length + 1} has ${sum}`)
            elfSumArray.push(sum)
        } else if (contentsArray[i] === '') {
            // empty row means end of elf
            console.log(`Elf ${elfSumArray.length + 1} has ${sum}`)
            elfSumArray.push(sum)
            sum = 0
        } else {
            // console.log(contentsArray[i])
            const num = +contentsArray[i]
            sum = sum + num
        }
    }

    console.log('\nElf Array length: ', elfSumArray.length)

    // should be 40701 before sorting
    console.log('Last value before sorting (should be 40701) = ', elfSumArray[elfSumArray.length - 1])
    if (elfSumArray[elfSumArray.length - 1] !== 40701) {
        console.log('Error!!!')
        return
    }

    // Manual sort 1:
    // let highestCalorie = 0
    // elfSumArray.forEach((total) => {
    //     if (total > highestCalorie) {
    //         highestCalorie = total
    //     }
    // })
    // console.log('highest:', highestCalorie)

    // Sorted desc from highest to lowest
    const elfArraySortedDesc = elfSumArray.sort((a, b) => {
        return b - a
    })

    const topThree = []
    topThree.push(elfArraySortedDesc[0])
    topThree.push(elfArraySortedDesc[1])
    topThree.push(elfArraySortedDesc[2])

    console.log('Top 3 elves:', topThree)

    const topThreeTotal = topThree.reduce((prev, curr) => {
        return prev + curr
    }, 0)
    console.log('Total calories of the top three elves: ', topThreeTotal)

    if (201524 !== topThreeTotal) {
        console.log('Error summing the top three elves')
    }

    return
}

readInput()
