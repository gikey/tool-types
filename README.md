# tool-types

Complementing TypeScript built-in types.

![](https://img.shields.io/npm/v/tool-types?style=flat-square)
![](https://img.shields.io/npm/dm/tool-types?style=flat-square)


## Installation
```sh
npm install tool-types
# or yarn add tool-types
```

## Usage
```ts
import { TupleUnion } from 'tool-types';

type T0 = [number, string];

type T1 = TupleUnion<T0> // number | string
```

## Utility Types
- [`Intersect`](#intersect)
- [`Except`](#except)
- [`UnionOmit`](#unionomit)
- [`TupleUnion`](#tupleunion)
- [`RequireAtLeastOne`](#requireatleastone)
- [`RequireAtLeastOneByKeys`](#requireatleastonebykeys)
- [`Weaken`](#weaken)
- [`Promisify`](#promisify)
- [`DeepPartial`](#deeppartial)
- [`DeepRequired`](#deeprequired)
- [`DeepReadOnly`](#deepreadonly)
- [`DeepMutable`](#deepmutable)
- [`RequiredByKeys`](#requiredbykeys)
- [`PartialByKeys`](#partialbykeys)
- [`ReadOnlyByKeys`](#readonlybykeys)
- [`MutableByKeys`](#mutablebykeys)
- [`PickAllKeys`](#pickallkeys)
- [`PickRequiredKeys`](#pickrequiredkeys)
- [`PickPartialKeys`](#pickpartialkeys)
- [`PickRequired`](#pickrequired)
- [`PickPartial`](#pickpartial)
- [`Equal`](#equal)
- [`PickReadOnlyKeys`](#pickreadonlykeys)
- [`PickReadOnly`](#pickreadonly)
- [`PickMutableKeys`](#pickmutablekeys)
- [`PickMutable`](#pickmutable)

## Deprecated API

### `Intersect`
```ts
type A = { 
    name: string;
    age: number;
};
type B = { 
    name: string;
    address: string;
    gender: number;
}

// Expect: { name: string; }
type ResultType = Intersect<A, B>;
```
[⇧ back to top](#utility-types)
### `Except`
```ts
type A = { 
    name: string;
    age: number;
};
type B = { 
    name: string;
    address: string;
    gender: number;
}
// Expect: { age: number; }
type ResultType = Except<A, B>;
```
[⇧ back to top](#utility-types)
### `UnionOmit`
```ts
type A = { 
    value: string; 
    disabled?: boolean; 
    onChange: () => void;
};
type B = { 
    value: number;
    onChange: () => void;
};
/* Expect: 
{
    value: string, 
    disabled?: boolean;
    onChange: () => void;
   }
*/
type ResultType = UnionOmit<A, B>;
```
[⇧ back to top](#utility-types)
### `TupleUnion`
```ts
type A = ['a', 'b', 'c'];
// Expect: 'a' | 'b' | 'c'
type ResultType = TupleUnion<A>;
```
[⇧ back to top](#utility-types)
### `RequireAtLeastOne`
```ts
type A = {
    name: string;
    age: number;
}
/* Expect: 
| {name?: string; age: number;} 
| {name: string; age?: number;}
*/
type ResultType = RequireAtLeastOne<A>;
```
[⇧ back to top](#utility-types)
### `RequireAtLeastOneByKeys`
```ts
type A = {
    name: string;
    age: number; 
    gender: number;
}
/* Expect: 
| { 
    name?: string; 
    age: number; 
    gender: number;
  } 
| { 
    name: string;
    age: number;
    gender?: number;
  }
*/
type ResultType = RequireAtLeastOneByKeys<A, 'name' | 'gender'>;
```
[⇧ back to top](#utility-types)
### `Weaken`
```ts
type A = {
    name: string; 
    say(word: string): string;
}
type B = 'name'
// Expect: { name: any; say(word: string): string; }
type ResultType =Weaken<A, B>;
```
[⇧ back to top](#utility-types)
### `Promisify`
```ts
const foo = (): Promise<string> => {
  return new Promise(resolve => {
      resolve('hello world');
  });
};
// Expect: string
type ResultType = Promisify<typeof foo>;
```
[⇧ back to top](#utility-types)
### `DeepPartial`
```ts
type A = { 
    value: string; 
    next: { 
        data: number;
    }
}
/* Expect: 
{ 
    value?: string; 
    next?: { 
        data?: number;
    }
}
*/
type ResultType = DeepPartial<A>;
```
[⇧ back to top](#utility-types)
### `DeepRequired`
```ts
type A = { 
    value?: string;
    next?: { 
        data?: number;
    }
}
/* Expect: 
{ 
    value: string; 
    next: { 
        data: number;
    }
}
*/
type ResultType = DeepRequired<A>;
```
[⇧ back to top](#utility-types)
### `DeepReadOnly`
```ts
type A = {value: string; next: { data: number; }}
/* Expect: 
{ 
    readonly value: string; 
    readonly next: { 
        readonly data: number; 
    }
}
*/
type ResultType = DeepReadOnly<A>;
```
[⇧ back to top](#utility-types)
### `DeepMutable`
```ts
type A = { 
    readonly value: string; 
    readonly next: {
        readonly data: number;
    }
}
/* Expect: 
{ 
    value: string; 
    next: { 
        data: number;
    }
}
*/
type ResultType = DeepMutable<A>;
```
[⇧ back to top](#utility-types)
### `RequiredByKeys`
```ts
type A = { 
    name?: string; 
    age?: number; 
    gender?: number;
}
/* Expect: 
{ 
    name: string; 
    age?: number; 
    gender?: number;
}
*/
type ResultType = RequiredByKeys<A, 'name'>;
```
[⇧ back to top](#utility-types)
### `PartialByKeys`
```ts
type A = { 
    name: string; 
    age: number; 
    gender: number;
}
/* Expect: 
{ 
    name?: string; 
    age: number; 
    gender: number;
}
*/
type ResultType = PartialKeys<A, 'name'>;
```
[⇧ back to top](#utility-types)
### `ReadOnlyByKeys`
```ts
type A = { 
    name: string; 
    age: number; 
    gender: number;
}
/* Expect: 
{ 
    readonly name: string; 
    age: number; 
    gender: number;
}
*/
type ResultType = ReadOnlyByKeys<A, 'name'>;
```
[⇧ back to top](#utility-types)
### `MutableByKeys`
```ts
type A = { 
    readonly name: string; 
    readonly age: number; 
    readonly gender: number;
}
/* Expect: 
{ 
    name: string; 
    readonly age: number; 
    readonly gender: number;
}
*/
type ResultType = MutableByKeys<A, 'name'>;
```
[⇧ back to top](#utility-types)
### `PickAllKeys`
```ts
type A = { 
    name: string; 
    age?: number; 
    gender?: number;
}
// Expect: name | age | gender
type ResultType = PickAllKeys<A>;
```
[⇧ back to top](#utility-types)
### `PickRequiredKeys`
```ts
type A = { 
    name: string; 
    age?: number; 
    gender?: number;
}
// Expect: name
type ResultType = PickRequiredKeys<A>;
```
[⇧ back to top](#utility-types)
### `PickPartialKeys`
```ts
type A = { 
    name: string; 
    age?: number; 
    gender?: number;
}
// Expect: age | gender
type ResultType = PickPartialKeys<A>;
```
[⇧ back to top](#utility-types)
### `PickRequired`
```ts
type A = { 
    name: string; 
    age?: number; 
    gender?: number;
}
// Expect: { name: string }
type ResultType = PickRequired<A>;
```
[⇧ back to top](#utility-types)
### `PickPartial`
```ts
type A = { 
    name: string; 
    age?: number; 
    gender?: number;
}
// Expect: { age?: number; gender?: number;}
type ResultType = PickPartial<A>;
```
[⇧ back to top](#utility-types)
### `Equal`
```ts
type A = { name: string; }
type B = { name?: string; }
// Expect: false
type ResultType = Equal<A, B>;
```
[⇧ back to top](#utility-types)
### `PickReadOnlyKeys`
```ts
type A = { 
    readonly name: string; 
    age: number; 
}
// Expect: name
type ResultType =  PickReadOnlyKeys<A>;
```
[⇧ back to top](#utility-types)
### `PickReadOnly`
```ts
type A = { 
    readonly name: string;
    age: number;
}
// Expect: { readonly name: string; }
type ResultType = PickReadOnly<A>;
```
[⇧ back to top](#utility-types)
### `PickMutableKeys`
```ts
type A = { 
    readonly name: string;
    age: number;
}
// Expect: age
type ResultType = PickMutableKeys<A>;
```
[⇧ back to top](#utility-types)
### `PickMutable`
```ts
type A = { 
    readonly name: string;
    age: number;
}
// Expect: { age: number; }
type ResultType = PickMutable<A>;
```
[⇧ back to top](#utility-types)

