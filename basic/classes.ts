abstract class Animal {
    constructor(public name: string) {}
    abstract speak(): string;
    vocalize(): string {
        return `${this.name} cannot speak`; // this is required to access properties
    }
}

class Mamamal extends Animal {
    constructor(name: string) {
        super(name);
    }
    speak(): string {
        return super.vocalize();
    }
}

class Bird extends Animal {
    constructor(name: string) {
        super(name);
    }
    speak(): string {
        return super.vocalize();
    }
}


function run() {
    let horse: Animal = new Mamamal("horse");
    return horse.speak();
}