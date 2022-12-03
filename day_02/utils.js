export const Shapes = {
    X: 1, //rock
    Y: 2, //paper
    Z: 3 //scissors
}

// X = rock
// Y = paper
// Z = scissors

export const Outcomes = {
    win: 6,
    lose: 0,
    draw: 3
}

export function calculateOutcomes(outcome, shape) {
    switch (outcome) {
        case 'win':
            return Outcomes.win + Shapes[shape]
        case 'lose':
            return Outcomes.lose + Shapes[shape]
        case 'draw':
            return Outcomes.draw + Shapes[shape]
        default:
            throw new Error(`Outcome ${outcome} doesn't exist`)
    }
}

export function getResult(player1, me) {
    if (player1 === 'A' && me === 'X') {
        // rock & rock
        return 'draw'
    }

    if (player1 === 'A' && me === 'Y') {
        // rock & paper
        return 'win'
    }

    if (player1 === 'A' && me === 'Z') {
        //rock & scissors
        return 'lose'
    }

    if (player1 === 'B' && me === 'X') {
        // paper and rock
        return 'lose'
    }

    if (player1 === 'B' && me === 'Y') {
        // paper & paper
        return 'draw'
    }

    if (player1 === 'B' && me === 'Z') {
        // paper & scissors
        return 'win'
    }

    if (player1 === 'C' && me === 'X') {
        // scissors & rock
        return 'win'
    }

    if (player1 === 'C' && me === 'Y') {
        // scissors & paper
        return 'lose'
    }

    if (player1 === 'C' && me === 'Z') {
        // scissors & scissors
        return 'draw'
    }

    throw new Error(`Case ${player} & ${me} not handled`)
}

export function getShape(player1, outcome) {
    if (player1 === 'A' && outcome === 'X') {
        // rock & lose
        return 'Z'
    }

    if (player1 === 'A' && outcome === 'Y') {
        // rock & draw
        return 'X'
    }

    if (player1 === 'A' && outcome === 'Z') {
        //rock & win
        return 'Y'
    }

    if (player1 === 'B' && outcome === 'X') {
        // paper and lose
        return 'X'
    }

    if (player1 === 'B' && outcome === 'Y') {
        // paper & draw
        return 'Y'
    }

    if (player1 === 'B' && outcome === 'Z') {
        // paper & win
        return 'Z'
    }

    if (player1 === 'C' && outcome === 'X') {
        // scissors & lose
        return 'Y'
    }

    if (player1 === 'C' && outcome === 'Y') {
        // scissors & draw
        return 'Z'
    }

    if (player1 === 'C' && outcome === 'Z') {
        // scissors & win
        return 'X'
    }

    throw new Error(`Case ${player} & outcome:${me} not handled`)
}

export function calculateOutcomesFromLetter(outcome, shape) {
    switch (outcome) {
        case 'Z':
            return Outcomes.win + Shapes[shape]
        case 'X':
            return Outcomes.lose + Shapes[shape]
        case 'Y':
            return Outcomes.draw + Shapes[shape]
        default:
            throw new Error(`Outcome letter:${outcome} doesn't exist`)
    }
}
