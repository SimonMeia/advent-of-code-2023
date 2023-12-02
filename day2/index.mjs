import { Console } from 'console';
import { readFile } from 'fs';

const filename = "./data.txt";

readFile(filename, 'utf-8', function (err, data) {
    if (err) {
        return console.warn(`Could not read file because: ${err.message}`);
    }

    const lines = data.split('\r\n');

    const gameData = {
        red: 12,
        green: 13,
        blue: 14,
    }
    let sum = 0

    // Pour chaque game
    for (let i = 0; i < lines.length; i++) {
        const gameId = i + 1;
        const subests = lines[i].split(': ')[1].split('; ');
        let valid = true;

        // Pour chaque subest
        for (let subest of subests) {
            const picks = subest.split(', ');

            // Pour chaque tirage
            for (let pick of picks) {
                const number = parseInt(pick.split(' ')[0]);
                const color = pick.split(' ')[1];

                if (number > gameData[color]) {
                    valid = false
                    break
                }
            }
            if (!valid) break
        }
        if (valid) sum += gameId
    }

    console.log(`Part 1 : ${sum}`)

    // Pour chaque game
    sum = 0

    for (let i = 0; i < lines.length; i++) {
        const subests = lines[i].split(': ')[1].split('; ');

        let fewestNumberOfCubes = {
            red: 0,
            green: 0,
            blue: 0
        }

        // Pour chaque subest
        for (let subest of subests) {
            const picks = subest.split(', ');

            // Pour chaque tirage
            for (let pick of picks) {
                const number = parseInt(pick.split(' ')[0]);
                const color = pick.split(' ')[1];

                if (number > fewestNumberOfCubes[color]) {
                    fewestNumberOfCubes[color] = number
                }
            }
        }
        sum += fewestNumberOfCubes['red'] * fewestNumberOfCubes['green'] * fewestNumberOfCubes['blue']
    }

    console.log(`Part 2 : ${sum}`)

});
