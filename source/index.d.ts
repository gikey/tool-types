/**
 * Intersect
 * @desc 获取两个类型中属性的交集
 * @example
 *   type A = { name: string; age: number };
 *   type B = { name: string; address: string; gender: number; }
 *   // Expect: {name: string}
 *   Intersect<A, B>;
 */
export type Intersect<T, U> = Pick<T, Extract<keyof T, keyof U>>;

/**
 * Except
 * @desc 获取 A - B 差集
 * @example
 *   type A = { name: string; age: number };
 *   type B = { name: string; address: string; gender: number; }
 *   // Expect: { age: number; }
 *   Except<A, B>;
 */
export type Except<T, U> = Pick<T, Exclude<keyof T, keyof U>>;

/**
 * UnionOmit
 * @desc 合并两个类型并排除 `U` 中在 `T` 中存在的属性
 * @example
 *   type A = { value: string; disabled?: boolean; onChange: () => void;};
 *   type B = { value: number; onChange: () => void};
 *   // Expect: {value: string, disabled?: boolean; onChange: () => void}
 *   UnionOmit<A, B>;
 */
export type UnionOmit<T, U> = T & Omit<T, keyof U>;

/**
 * TupleUnion
 * @desc 将元组值转为联合类型
 * @example
 *   type A = ['a', 'b', 'c'];
 *   // Expect: 'a' | 'b' | 'c'
 *   TupleUnion<A>;
 */
export type TupleUnion<T> = T extends Array<infer U> ? U : never;

/**
 * RequireAtLeastOne
 * @desc 所有属性中至少一个必填
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
 * @desc `U` 中指定的属性至少一个必填
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
 * @desc 将 `U` 中指定属性的类型变成 any
 * @example
 *   type A = {name: string; say(word: string): string;}
 *   type B = 'name'
 *   // Expect: {name: any; say(word: string): string;}
 *   Weaken<A, B>;
 */
export type Weaken<T, U extends keyof T> = {
    [P in keyof T]: P extends U ? any : T[P];
};

/**
 * Promisify
 * @desc 获取 Promise 类型
 * @example
 * const foo = (): Promise<string> => {
 *     return new Promise(resolve => {
 *         resolve('hello world');
 *     });
 * };
 *   // Expect: string
 *   Promisify<typeof foo>;
 */
export type Promisify<T extends (args: any[]) => Promise<any>> = T extends (
    args: any[]
) => Promise<infer U>
    ? U
    : never;

/**
 * DeepPartial
 * @desc 递归 Partial
 * @example
 * type A = { value: string; next: { data: number; }}
 *   // Expect: { value?: string; next?: { data?: number; }}
 *   DeepPartial<A>;
 */
export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * DeepRequired
 * @desc 递归 Required
 * @example
 * type A = { value?: string; next?: { data?: number; }
 * }
 *   // Expect: { value: string; next: { data: number; }}
 *   DeepRequired<A>;
 */
export type DeepRequired<T> = {
    [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

/**
 * DeepReadOnly
 * @desc 递归 ReadOnly
 * @example
 * type A = {value: string; next: { data: number; }}
 *   // Expect: { readonly value: string; readonly next: { readonly data: number; }}
 *   DeepReadOnly<A>;
 */
export type DeepReadOnly<T> = {
    readonly [P in keyof T]: T[P] extends object ? DeepReadOnly<T[P]> : T[P];
};

/**
 * DeepMutable
 * @desc 递归 Mutable
 * @example
 * type A = { readonly value: string; readonly next: { readonly data: number; }}
 *   // Expect: { value: string; next: { data: number; }}
 *   DeepMutable<A>;
 */
export type DeepMutable<T> = {
    -readonly [P in keyof T]: T[P] extends object ? DeepMutable<T[P]> : T[P];
};

/**
 * RequiredByKeys
 * @desc 指定属性必填
 * @example
 * type A = { name?: string; age?: number; gender?: number;}
 *   // Expect: { name: string; age?: number; gender?: number;}
 *   RequiredByKeys<A, 'name'>;
 */
export type RequiredByKeys<T, U extends keyof T> = T & { [P in U]-?: T[P] };

/**
 * PartialKeys
 * @desc 指定属性非必填
 * @example
 * type A = { name: string; age: number; gender: number;}
 *   // Expect: { name?: string; age: number; gender: number;}
 *   PartialKeys<A, 'name'>;
 */
export type PartialByKeys<T, U extends keyof T> = T & { [P in U]?: T[P] };

/**
 * ReadOnlyByKeys
 * @desc 指定属性 readonly
 * @example
 * type A = { name: string; age: number; gender: number;}
 *   // Expect: { readonly name: string; age: number; gender: number;}
 *   ReadOnlyByKeys<A, 'name'>;
 */
export type ReadOnlyByKeys<T, U extends keyof T> = T &
    { readonly [P in U]: T[P] };

/**
 * MutableByKeys
 * @desc 指定属性 readonly
 * @example
 * type A = { readonly name: string; readonly age: number; readonly gender: number;}
 *   // Expect: { name: string; readonly age: number; readonly gender: number;}
 *   MutableByKeys<A, 'name'>;
 */
export type MutableByKeys<T, U extends keyof T> = T &
    { readonly [P in U]: T[P] };

/**
 * PickAllKeys
 * @desc 获取属性名(联合类型)
 * @example
 * type A = { name: string; age?: number; gender?: number;}
 *   // Expect: name | age | gender
 *   PickAllKeys<A>;
 */
export type PickAllKeys<T> = {
    [P in keyof T]-?: P;
}[keyof T];

/**
 * PickRequiredKeys
 * @desc 获取必填属性名(联合类型)
 * @example
 * type A = { name: string; age?: number; gender?: number;}
 *   // Expect: name
 *   PickRequiredKeys<A>;
 */
export type PickRequiredKeys<T> = {
    [P in keyof T]-?: {} extends Pick<T, P> ? never : P;
}[keyof T];

/**
 * PickPartialKeys
 * @desc 获取非必填属性名(联合类型)
 * 也可以用 type PickPartialKeys<T> = Exclude<keyof<T> , PickRequiredKeys<T>> 实现
 * @example
 * type A = { name: string; age?: number; gender?: number;}
 *   // Expect: age | gender
 *   PickPartialKeys<A>;
 */
export type PickPartialKeys<T> = {
    [P in keyof T]-?: {} extends Pick<T, P> ? P : never;
}[keyof T];

/**
 * PickRequired
 * @desc 从类型中排除所有非必填属性
 * @example
 * type A = { name: string; age?: number; gender?: number;}
 *   // Expect: { name: string }
 *   PickRequired<A>;
 */
export type PickRequired<T> = Pick<T, PickRequiredKeys<T>>;

/**
 * PickPartial
 * @desc 从类型中排除所有必填属性
 * @example
 * type A = { name: string; age?: number; gender?: number;}
 *   // Expect: { age?: number; gender?: number;}
 *   PickPartial<A>;
 */
export type PickPartial<T> = Pick<T, PickPartialKeys<T>>;

/**
 * Equal
 * @desc 判断两个类型是否相等
 * @example
 * type A = { name: string; }
 * type B = { name?: string; }
 *   // Expect: false
 *   Equal<A, B>;
 */
export type Equal<T, U> = (<K>() => K extends T ? 1 : 2) extends <
    K
>() => K extends U ? 1 : 2
    ? true
    : false;

/**
 * PickReadOnlyKeys
 * @desc 获取 readonly 属性名(联合类型)
 * @example
 * type A = { readonly name: string; age: number; }
 *   // Expect: name
 *   PickReadOnlyKeys<A>;
 */
export type PickReadOnlyKeys<T> = {
    [P in keyof T]: Equal<
        { [Q in P]: T[Q] },
        { readonly [Q in P]: T[Q] }
    > extends true
        ? P
        : never;
}[keyof T];

/**
 * PickReadOnly
 * @desc 从类型中排除所有 mutable 类型
 * @example
 * type A = { readonly name: string; age: number; }
 *   // Expect: { readonly name: string; }
 *   PickReadOnly<A>;
 */
export type PickReadOnly<T> = Pick<T, PickReadOnlyKeys<T>>;

/**
 * PickMutableKeys
 * @desc 获取 mutable 属性名(联合类型)
 * @example
 * type A = { readonly name: string; age: number; }
 *   // Expect: age
 *   PickMutableKeys<A>;
 */
export type PickMutableKeys<T> = {
    [P in keyof T]: Equal<
        { [Q in P]: T[Q] },
        { readonly [Q in P]: T[Q] }
    > extends true
        ? never
        : P;
}[keyof T];

/**
 * PickMutable
 * @desc 从类型中排除所有 readonly 类型
 * @example
 * type A = { readonly name: string; age: number; }
 *   // Expect: { age: number; }
 *   PickMutable<A>;
 */
export type PickMutable<T> = Pick<T, PickMutableKeys<T>>;
