interface A {
    n: number;
}

interface B {
    s: string;
}

interface C {
    n: number;
    p: string;
}

let intersection: A & B = { n: 3, s: "hello" };

let unionFail: A | B = { n: 0, s: "" };
//unionFail.s; // can only access common to both A and B, which there are none

let union: A | C = { n: 0, p: "num" };
union.n;
union.p; // ??? why does this work