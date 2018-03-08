interface Person {
    name: string;
    age: number;
}

interface PersonInfo {
    readonly person: Person;
    info: string;
}

let amy: Person = { name: "Amy", age: 20 };
let amyInfo: PersonInfo = { person: amy, info: "things" };

// can't assign to readonly object
// amyInfo.person = { name: "John", age: 30 };

// can assign to object's properties, like const
amyInfo.person.name = "John";

interface Chair {
    back?: number;
    seat: number;
    legs: number;
}

// can only assign known properties
// let bench: Chair = { seat: 392, legs: 932, backs: 312 };

// type assertions can get around this check, backs is no ignored
let bench: Chair = { seat: 392, legs: 932, backs: 312 } as Chair;

// assigning from a declared object instead of a literal object bypass the type check
let couch = { seat: 392, legs: 932, backs: 312 };
let chair: Chair = couch;

// can also use a string index signature to catch all non typed properties
interface Table {
    width: number;
    height: number;
    [propName: string]: any;
}

// function types
interface StartFunc {
    (input: string) : void;
}

// constructor signature check
// can't implement constructor interface directly, need to define it seperately
// and go through a factory style method
interface ClockConstructor {
    new (hour: number, minute: number): ClockInterface;
}
interface ClockInterface {
    tick();
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
    return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {
    constructor(h: number, m: number) { }
    tick() {
        console.log("beep beep");
    }
}
class AnalogClock implements ClockInterface {
    constructor(h: number, m: number) { }
    tick() {
        console.log("tick tock");
    }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);

// hybrid types

interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}

// need to use the angle bracket notation to denote the function type
function getCounter(): Counter {
    let counter = <Counter>function (start: number) { };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}
