function checkCoupon(enteredCode: string, correctCode: string, currentDate: string, expirationDate: string): boolean {
    return enteredCode == correctCode && new Date(expirationDate) >= new Date(currentDate);
}

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