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