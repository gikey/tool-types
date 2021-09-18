/**
 * Intersect
 * @desc Get the intersection of two types `A` and `B`
 * @example
 *   type A = { name: string; age: number };
 *   type B = { name: string; address: string; gender: number }
 *   // Expect: {name: string}
 *   Intersect<A, B>;
 */
export type Intersect<T, U> = Pick<T, Extract<keyof T, keyof U>>;

/**
 * UnionOmit
 * @desc Combine the two types and exclude the property that exist in `A` in `B`
 * @example
 *   type A = { value: string; disabled?: boolean; onChange: () => void;};
 *   type B = { value: number; onChange: () => void};
 *   // Expect: {value: string, disabled?: boolean; onChange: () => void}
 *   UnionOmit<A, B>;
 */
export type UnionOmit<T, U> = T & Omit<T, keyof U>;

/**
 * TupleUnion
 * @desc Converted array elements to union type
 * @example
 *   const A = ['a', 'b', 'c'];
 *   // Expect: 'a' | 'b' | 'c'
 *   TupleUnion<A>;
 */
export type TupleUnion<T> = T extends Array<infer U> ? U : never;

/**
 * RequireAtLeastOne
 * @desc A type where at least one of the properties of an interface (can be any property) is required to exist
 * @example
 *   type A = {name: string; age: number;}
 *   // Expect: {name?: string; age: number;} | {name: string; age?: number;}
 *   RequireAtLeastOne<A>;
 */
export type RequireAtLeastOne<T> = {
    [K in keyof T]-?: Required<Pick<T, K>> &
        Partial<Pick<T, Exclude<keyof T, K>>>;
}[keyof T];

/**
 * RequireAtLeastOneByKeys
 * @desc A type where at least one of the properties of an interface (can be any property) is required to exist
 * @example
 *   type A = {name: string; age: number; gender: number;}
 *   // Expect: {name?: string; age: number; gender: number } | {name: string; age: number; gender?: number}
 *   RequireAtLeastOneByKeys<A, 'name' | 'gender'>;
 */
export type RequireAtLeastOneByKeys<T, Keys extends keyof T = keyof T> = Pick<
    T,
    Exclude<keyof T, Keys>
> &
    {
        [K in Keys]-?: Required<Pick<T, K>> &
            Partial<Pick<T, Exclude<Keys, K>>>;
    }[Keys];
/**
 * Weaken
 * @desc A type where at least one of the properties of an interface (can be any property) is required to exist
 * @example
 *   type A = {name: string; say(word: string): string;}
 *   type B = 'name'
 *   // Expect: {name: any; say(word: string): string;}
 *   Weaken<A, B>;
 */
export type Weaken<T, U extends keyof T> = {
    [P in keyof T]: P extends U ? any : T[P];
};
