import { readFile } from 'fs';

const filename = "./data.txt";

readFile(filename, 'utf-8', function (err, data) {
    if (err) {
        return console.warn(`Could not read file because: ${err.message}`);
    }

    const lines = data.split('\r\n');

    // PART 1
    let sum = 0
    for (let line of lines) {
        let firstDigit = null;
        let lastDigit = null;
        for (let char of line) {
            if (char <= '9' && char >= '0') {
                if (firstDigit === null) {
                    firstDigit = parseInt(char);
                    lastDigit = parseInt(char);
                } else {
                    lastDigit = parseInt(char);
                }
            }
        }
        sum += firstDigit * 10 + lastDigit
    }
    console.log(`Part 1 : ${sum}`)

    // PART 2

    const numbers = {
        1: 'one',
        2: 'two',
        3: 'three',
        4: 'four',
        5: 'five',
        6: 'six',
        7: 'seven',
        8: 'eight',
        9: 'nine',
    }
    sum = 0

    for (let line of lines) {
        let firstDigit = null;
        let lastDigit = null;

        if (line.includes('oneight')) {
            line = line.replaceAll('oneight', '18');
        }
        if (line.includes('twone')) {
            line = line.replaceAll('twone', '21');
        }
        if (line.includes('threeight')) {
            line = line.replaceAll('threeight', '38');
        }
        if (line.includes('fiveeight')) {
            line = line.replaceAll('fiveeight', '58');
        }
        if (line.includes('sevenine')) {
            line = line.replaceAll('sevenine', '79');
        }
        if (line.includes('eightwo')) {
            line = line.replaceAll('eightwo', '82');
        }
        if (line.includes('eighthree')) {
            line = line.replaceAll('eighthree', '83');
        }
        if (line.includes('nineight')) {
            line = line.replaceAll('nineight', '98');
        }

        for (const [key, value] of Object.entries(numbers)) {
            if (line.includes(value)) {
                line = line.replaceAll(value, key);
            }
        }

        for (let char of line) {
            if (char <= '9' && char >= '0') {
                if (firstDigit === null) {
                    firstDigit = parseInt(char);
                    lastDigit = parseInt(char);
                } else {
                    lastDigit = parseInt(char);
                }
            }
        }

        sum += firstDigit * 10 + lastDigit
    }

    console.log(`Part 2 : ${sum}`)

});
