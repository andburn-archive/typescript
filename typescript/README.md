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

