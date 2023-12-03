import { readFile } from 'fs';

const filename = "./data.txt";
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
let sum = 0

readFile(filename, 'utf-8', function (err, data) {
    if (err) {
        return console.warn(`Could not read file because: ${err.message}`);
    }

    const lines = data.split('\r\n');

    for (let l = 0; l < lines.length; l++) {
        const line = lines[l];
        for (let c = 0; c < line.length; c++) {
            if (line[c] === '*') {
                let numberTouched = []

                numberTouched = numberTouched.concat(processLine(lines[l - 1], c))
                numberTouched = numberTouched.concat(processLine(lines[l], c))
                numberTouched = numberTouched.concat(processLine(lines[l + 1], c))

                if (numberTouched.length === 2) {
                    sum += numberTouched[0] * numberTouched[1]
                }
            }
        }
    }

    console.log(`Part 2 : ${sum}`)

});

function processLine(line, c) {
    const numberTouched = []

    // Check same column
    if (numbers.includes(line[c])) {
        let numberBefore = ''
        for (let i = c; i >= 0; i--) {
            if (numbers.includes(line[i])) {
                numberBefore += line[i]
            } else {
                break
            }
        }

        let numberAfter = ''
        for (let i = c + 1; i < line.length; i++) {
            if (numbers.includes(line[i])) {
                numberAfter += line[i]
            } else {
                break
            }
        }

        numberBefore = numberBefore.split('').reverse().join('');
        let finalNumber = numberBefore + numberAfter
        numberTouched.push(parseInt(finalNumber))

        return numberTouched
    }

    // Check previous column
    if (numbers.includes(line[c - 1])) {
        let number = ''
        for (let i = c - 1; i >= 0; i--) {
            if (numbers.includes(line[i])) {
                number += line[i]
            } else {
                break
            }
        }

        number = number.split('').reverse().join('');
        numberTouched.push(parseInt(number))
    }

    // Check next column
    if (numbers.includes(line[c + 1])) {
        let number = ''
        for (let i = c + 1; i < line.length; i++) {
            if (numbers.includes(line[i])) {
                number += line[i]
            } else {
                break
            }
        }
        numberTouched.push(parseInt(number))
    }

    return numberTouched
}