import * as fs from 'fs'
import * as readline from 'readline'

let result = []
let n = -1
readline.createInterface({
    input: fs.createReadStream('./chinese_lunar_2018_2030.ics'),
}).on('line', function (line) {
    const [key, value] = line.split(':')
    let f = null
    switch (key) {
        case 'BEGIN':
            if (value === 'VEVENT') {
                n++;
            }
            break;
        case 'DTSTART;VALUE=DATE':
            if (/0101$/.test(value)) {
                f = 0
            }
            if (/0501$/.test(value)) {
                f = 1
            }
            if (/1001$/.test(value)) {
                f = 2
            }
            break;
        case 'SUMMARY':
            const [s, fa] = value.split(/\s+/)
            switch (fa) {
                case '春节':
                    f = 3
                    break;
                case '清明':
                    f = 4
                    break;
                case '端午':
                    f = 5
                    break;
                case '中秋':
                    f = 6
                    break;
            }
            break;
    }
    if (typeof f === 'number') {
        result.push(n)
        result.push(f)
    }
}).on('close', function () {
    console.log(result.join(', '))
})
