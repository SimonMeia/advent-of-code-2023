import { readFile } from 'fs';

const filename = "./data.txt";
let sum = 0

readFile(filename, 'utf-8', function (err, data) {
    if (err) {
        return console.warn(`Could not read file because: ${err.message}`);
    }

    let lines = data.split('\r\n');

    const scratchCards = getScratchCards(lines)

    // Pour chaque carte
    for (let i = 0; i < lines.length; i++) {
        // Pour chaque fois qu'on possède la carte
        for (let j = 0; j < scratchCards[i].numberOfCardOwned; j++) {
            let winningNumbers = 0
            // Pour chauque numero gratté
            for (let number of scratchCards[i].cardNumbers) {
                if (scratchCards[i].winningNumbers.includes(number)) {
                    winningNumbers++
                }
            }
            for (let k = 1; k <= winningNumbers; k++) {
                scratchCards[i + k].numberOfCardOwned++
            }
        }
    }

    let numberOfCardScatched = 0
    for (let card of scratchCards) {
        numberOfCardScatched += card.numberOfCardOwned
    }

    console.log(`Part 2 : ${numberOfCardScatched}`)

});

function getScratchCards(lines) {
    return lines.map((line) => {
        const spt = line.split(': ');
        const winningNumbers = spt[1].split('| ')[0].split(' ').filter((n) => n !== '');
        const cardNumbers = spt[1].split('| ')[1].split(' ').filter((n) => n !== '');
        return { winningNumbers: winningNumbers, cardNumbers: cardNumbers, numberOfCardOwned: 1 }
    })
}