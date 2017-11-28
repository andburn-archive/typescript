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