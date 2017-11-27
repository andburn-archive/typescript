interface A {
    n: number;
}

interface B {
    s: string;
    q: boolean;
}

interface C {
    n: number;
    p: string;
}

class NumStr {
    n: number;
    p: string;
}

/* 
    An intersection must specify all known properties of all its types.
*/
let intersectAB: A & B = { n: 2, s: "intersect", q: false };
console.log(intersectAB.s);
/* 
    For a union, any known properties of any of its types can be specified,
    but only those that are common to all can be accessed.
*/
let unionAB: A | B = { n: 2, s: "union"}; 
unionAB.s; // error, doesn't exist on type

let unionAC: A | C = { n: 0, p: "extra" };
console.log(unionAC.n);
console.log(unionAC.p); // not on the type, but works for object literals
unionAC = new NumStr();
console.log(unionAC.p); // but, errors for instance objects