import { readFile } from 'fs';

const filename = "./data.txt";
let sum = 0

readFile(filename, 'utf-8', function (err, data) {
    if (err) {
        return console.warn(`Could not read file because: ${err.message}`);
    }

    let lines = data.split('\r\n');

    const scratchCards = getScratchCards(lines)

    for (let card of scratchCards) {
        let cardValue = 0
        for (let number of card.cardNumbers) {
            if (card.winningNumbers.includes(number)) {
                if (cardValue === 0) {
                    cardValue = 1
                } else {
                    cardValue *= 2
                }
            }
        }
        sum += cardValue
    }

    console.log(`Part 1 : ${sum}`)

});

function getScratchCards(lines) {
    return lines.map((line) => {
        const spt = line.split(': ');
        const winningNumbers = spt[1].split('| ')[0].split(' ').filter((n) => n !== '');
        const cardNumbers = spt[1].split('| ')[1].split(' ').filter((n) => n !== '');
        return { winningNumbers: winningNumbers, cardNumbers: cardNumbers }
    })
}