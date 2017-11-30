/* The Coupon Code (7 kyu)
    https://www.codewars.com/kata/539de388a540db7fec000642
*/
// Solution
function checkCoupon(enteredCode: string, correctCode: string, currentDate: string, expirationDate: string): boolean {
    return enteredCode == correctCode && new Date(expirationDate) >= new Date(currentDate);
}

/*  You're a square! (7 kyu)
    https://www.codewars.com/kata/54c27a33fb7da0db0100040e
*/
// Solution
function isSquare(n: number): boolean {
    let i = 1;
    let sq = 1;
    while (sq < n) {
        i++;
        sq = i * i;
        if (sq == n)
            return true;
    }
    return false;
};
// Community
function _isSquare(n: number): boolean {
    return n > 0 && Math.sqrt(n) % 1 === 0;
};

/*  Decode the Morse code (6 kyu)
    https://www.codewars.com/kata/decode-the-morse-code
*/
let MORSE_CODE: Map<string, string>;
// Solution
function decodeMorse(morseCode: string): string {
    let words = morseCode.trim().split("   ");
    let phrase: string = "";
    for (let w of words) {
        let chars = w.split(" ");
        for (let ch of chars) {
            phrase += MORSE_CODE[ch];
        }
        phrase += " ";
    }
    return phrase.trim();
}
// Community
function _decodeMorse(morseCode: string): string {
    return morseCode
        .trim()
        .split('   ')
        .map(word => word.split(' ').map(char => MORSE_CODE[char]).join(''))
        .join(' ')
}

/*  Reverse or rotate? (6 kyu)
    https://www.codewars.com/kata/reverse-or-rotate
*/
// Solution
function revrot(str, sz): string {
    if (sz <= 0 || str === "" || sz > str.length) {
        return "";
    }
    let isReversible = function(digits): boolean {      
        let cubeSum = digits.map(x => parseInt(x, 10)).reduce((x, y) => x + y ** 3);
        return cubeSum % 2 === 0;      
    }
    let output = "";
    let digits = Array.from(str);
    let i = 0;
    while (i < digits.length) {
        let chunk = digits.slice(i, i + sz)
        if (chunk.length < sz) {
            break;
        }
        if (isReversible(chunk)) {
            output += chunk.reverse().join("");
        } else {
            let rot = chunk.slice(1);
            rot.push(chunk[0]);
            output += rot.join("");
        }
        i += sz;
    }
    return output;
}

/*  Length of missing array (6 kyu)
    https://www.codewars.com/kata/length-of-missing-array
*/
// Solution
function getLengthOfMissingArray(arrayOfArrays: any[]): number {
    if (arrayOfArrays.length === 0) {
        return 0;
    }
    for (let arr of arrayOfArrays) {
        if (arr.length === 0) {
            return 0;
        }
    }
    arrayOfArrays.sort(function(a, b) {
        if (a.length < b.length) {
            return -1;
        } else if (a.length > b.length) {
            return 1;
        }
        return 0;
    });
    // assign the starting number
    let count: number = arrayOfArrays[0].length;
    // check the sorted list for the missing length
    for (let i = 1; i < arrayOfArrays.length; i++) {
        count++;
        if (count !== arrayOfArrays[i].length) {
            return count;
        }
    }
    return 0;
}
// Community
function _getLengthOfMissingArray(arrayOfArrays: any[]): number {
    if (arrayOfArrays === null || arrayOfArrays.length === 0 ) return 0
    
    const emptyArr = arrayOfArrays.every(el => el.length > 0)
    if (emptyArr === false) return 0
    
    const toNumArr = arrayOfArrays.map(el => el.length).sort((a, b) => a - b)
  
    const result = toNumArr.reduce((curr, next) => curr + 1 === next ? next : curr)
    return result + 1
  }