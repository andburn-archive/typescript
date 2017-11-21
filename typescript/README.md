# TypeScript Notes

## Basic
- `tsc` compiler command
- type annotations `let s: string = "Hello";`
- interfaces define a structure using `interface`, implementing the structure is all that is 
required no need for a *implements* keyword
- create a class with `class` keyword, *constructor* allows `public` field shortcuts in arguments

## Types
- `boolean` standard *true* or *false*
- `number` all numbers are floats, accepts notation for hex `0x`, binary `0b` and octal `0o`
- `string` double or single quotes
  - template strings use backticks and `${ x }` for interpolation
- arrays can be defined with generic or bracket notation
```typescript
let a: number[] = [1, 2, 3];
let b: Array<number> = [1, 2, 3];
```
- tuples allow the creation of fixed length arrays of differing types
```typescript
let x: [string, number];
x = ["ciao", 5];
```
  - on retreival types are retained
  - elements outside the known range of the tuple (using it as a regular array), 
  have the *union* type
- enums can be declared with or without values, a starting value can be defined on the first element (default is 0)
```typescript
enum Color { Red = 1, Green, Blue }
let c: Color = Color.Blue;
```
  - access an enums name by its value with `Color[1] == "Green"`
- `any` is used when the type is not known `let unk: any = externalCall();`
  - useful when dealing with existing JavaScript
  - also for multi-type arrays `let list: any[] = [1, false, "hi"];`
- `undefined` and `null` are their own types and are subtypes of all other types, and can be assigned to `number` for example
  - the `--strictNullChecks` flag ensures `undefined` and `null` can only be assigned to their own types and `void`
- `void` is the absence of a type, most used as return value from functions
- `never` used for types that never occur, could be used a return value from a function that always throws an error
- type assertions allow you to tell the compiler you know the type of a value even if it doesn't
```typescript
let input: number = <number>returnedValue;
```
  - the *as* syntax can also be used `returnedValue as number`

## Variable Declaration
- `var` has function scope, leading to unexpected errors particularly with closures
- `let` has block scope, not accessible outside their enclosing block
  - can't be assigned before its declared
  - can't be redeclared in the same scope
  - capturing `let` variables works nicely without the need for *IIFE's*
- `const` has the same scoping rules as `let` but assigned values cannot be changed
  - it doesn't mean the value is *immutable* but cannot be assigned to another value
- in strict terms `const` is preferred over `let` when it is know that varialbe should not be reassigned
- *destructuring* allows variable declaration from arrays and objects
```javascript
let list = [1, 2];
let [a, b] = list;
console.log(a); // 1
```
- can destructure regular variables too `[a, b] = [c, d];`
- and even function parameters `function f([x, y]: [number, number]) {`
- remaining list items can grouped `let[first, ...rest] = [1, 2, 3, 4];` or just ignore them `let[first] = [1, 2, 3, 4];`
- objects can also be destructured in a similar way to arrays
```typescript
let obj = { a: "one", b: "two", c: 3 };
let {a, b} = o; // skip c
let { a, b }: { a: string, b: number } = o; // with type
let {a: newA, b: newB} = o; // property renaming
```
- can use default values, in case they are undefined `let { a, b = 10 } = obj`
- the *spread* operator is the opposite of destructuring
  - can "*spread*" array's into another `let list = [0, ...other, ...another]`
  - and also object into other objects `{ ...defaults, food: "lots" }`
  - spread goes from left to right, for object this means properties on the right will overwrite earlier ones with the same name
  - only an objects own enumerable properties are spread, meaning functions will not be spread into the new object

## Interfaces
- essentially use *duck-typing* while enabling us to give these types a name
```typescript
interface Person {
  name: string;
  age: number;
}
```
- interface properties can be optional and are marked with `?` after name
```typescript
interface Config {
  color?: string;
  limit: number;
}
```
- when combining optional properties with mandatory ones, any unspecified properties in the declared object will cause an error
- properties can also be `readonly` meaning they can't be modified after their initial creation for basic types, for objects their props can be changed but not the object itself
- `ReadonlyArray<T>` is an array type with all the mutating methods removed, even assigning a new array object to the variable is not allowed
- use `const` for variables and `readonly` on properties
- interfaces can also define function types by giving a signature specifying name and type of parameters and return type
  - no name is given to function signature, only params and return type
  - the actual names of the params don't matter when implementing the function
```typescript
interface SearchFunc {
  (source: string, subString: string): boolean;
}
```
- when implementing a function type, type definitions can be inferred
```typescript
let search: SearchFunc = function(src, sub) {
  return false;
}
```
- interfaces can also define index types `[index: number]: string` meaning when the type is indexed into with a number it will return a string, an `Array<string>` for example
  - indexers must be either `number` or `string`, can define both but must both return the same type
  - indexed types do require all properties to be of the same type as the indexed return type
- `implements` can be used explicitly on a class declaration to conform to an interface
  - methods can be described in the interface that should be implemented in the class
```typescript
interface Device {
  status: number;
  restart(message: string);
}
```
- interfaces can extend each other with `extends` keyword, including multiple inheritenance
- it may be necessary to create hybrid types with dealing with third-party JavaScript
- you may have a function type and regular properties together
```typescript
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}

function getCounter(): Counter {
  let counter = <Counter>function(start: number) {};
  counter.interval = 123;
  counter.reset = function() {};
  return counter;
}
```
- interfaces can extend classes and inherit all public, private and protected members

## Classes
- designed to model standard OO classes found in C# or Java
- the `constructor` keyword is used to define a ctor
- properties and methods are declared without `let` or `function`
```typescript
class Greeter {
  greeting: string;
  constructor(greeting: string) {
    this.greeting = greeting;
  }
  greet() {
    return `Hello, ${this.greeting}`;
  }
}
```
- create a new class instance object with the `new` keyword; `new Animal()`
- `this` is required when accessing class members within the class
- use `extends` for class inheritenance
- subclasses defining a constructor must use `super()` as the first statement
- to call superclass methods use `super.someMethod()`
- class members can have `public`, `protected` or `private` access
- all members are `public` by default, but can be declard explicilty
- `private` members can't be accessed outside their declaring class
- `protected` is the same as `private` except that it does allow access from within subclasses
- TypeScript is a structural type system, and as such structures must match in order for instances to be assigned to one another
  - when `private` and `protected` members are involved, for a structural match the non public members must have been declared at the same point in the inheritance tree
- properties can also be `readonly` and can't be changed after initialization
- parameter properties provide a shortcut to declaring class properties
  - properties are defined in the constructors parameters by using an accessibility modifier and/or `readonly`
```typescript
constructor(public name: string, private age: number) {}
```
- getters and setters can be defined on a property, using `get` and `set`
  - compiler needs to be set to ECMA 5 or above to support this
  - a `get` with no `set` are implicitly `readonly`
- class members are defined using `static`
- `abstract` classes can contain method implementations and constructors, but cannot be instantiated
  - `abstract` methods signatures can be declared in a similar way to interfaces, these must be implemented in any subclasses
- classes define types and therefore interfaces can inherit from them

## Functions
- named and anonymous functions supported
- parameters and return value can be typed
- to the declare the funciton type i.e. when assigned to a variable, we use:
```typescript
let f: (x: number, y: number) => number; // arrow used to make return type clear
f = function(first: number, last: number): number {
  return x + y;
}
```
- typescript will use type inference if only one side of the assignment statement is typed
```typescript
let fx: function(x: number, y: number): number { return x + y; };
```
- the number of parameters declared for a function must match the number when called
- parameters can be made optional with `?` after the name `name?: string`
  - optionals must come after required
- parameters can have default values `fn(first: string, x = 3)`
  - params with defaults coming after all required are treated as optional
- *rest* parameters, are variable length params zero or more contained in a single array param, indicated with an ellipses before the name (this also used in the function type)
```typescript
function(x: number, y: number, ...otherNumbers: number[]) { }
```
- `--noImplicitThis` compiler flag alerts to you to possilbe mistakes when using `this` in funcitons
- *this* parameters can be used to enforce consistent type on the this object, using a fake `this` param as the first parameter of a function `function(this: Animal, name: string) {}`
- function overloads can be used to when a return value can be `any` number of different types
```typescript
function prepare(x: {list: string, amount: number}): string;
function prepare(x: string): string;
function prepare(x): any {
  // do things
}
```

## Enums
- use the `enum` keyword for either numeric or string based enums
```typescript
enum Points {
  North,
  South,
  East,
  West,
}
```
- numeric values are zero based and in order
- can specify all numbers or just the starting number
```typescript
  North = 1,
  South,
```
- use like `let direction: Points = Points.East`
- *string* enums must be explictily initialized, either with string literal or another string enum member
```typescript
enum Orientation {
  Up = "U",
  Down = "D",
  Left = "L",
  Right = "R",
}
```
- numeric enums can be reversed mapped to their name (doesn't work with string enums)
```typescript
let a = Points.North;
let name = Points[a] // "North"
```
- use `const enum Things { }` to have enum values be inlined

