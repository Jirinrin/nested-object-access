export type Primitive = string | number | boolean | null | undefined;
export interface NestedRecord {
  [key: string]: Primitive | NestedRecord;
}

/**
 * This will spit out a union type of all key-value pairs in an object.
 * Handy for keeping those two closely linked to one another in a union type.
 */
type KVTuples<T extends Record<string, any>, K extends keyof T = keyof T> = K extends any ? { k: K; v: T[K] } : never;

export type NestedKeysFilter = "primitives" | "objects";

type MinusOne = { 0: never; 1: 0; 2: 1; 3: 2; 4: 3; 5: 4; 6: 5; 7: 6; 8: 7; 9: 8 };
export type RecursionDepth = never | keyof MinusOne;

type NestedKeysTpl<T extends KVTuples<NestedRecord>, Filter extends NestedKeysFilter, Depth extends RecursionDepth, KBase extends string = ""> =
  // If reached depth 0 stop; distribute the union so that each tuple in it is handled separately
  0 extends Depth ? never : T extends any
    ? T["v"] extends Record<string, any>
      ? // Nested object => recurse / add key to the end type if desired
        | ("objects" extends Filter ? `${KBase}${T["k"]}` : never)
        | NestedKeysTpl<
            KVTuples<T["v"]> extends KVTuples<NestedRecord> ? KVTuples<T["v"]> : never, // extra check necessary for TS
            Filter,
            MinusOne[Depth],
            `${KBase}${T["k"]}.`
          >
      : // Base case for the recursion: at the end of a branch is a string
        ("primitives" extends Filter ? `${KBase}${T["k"]}` : never)
    : never;

/**
 * This type maps a (nested) object to "dot paths" to all of the nested fields: e.g. {a: string; b: {c: string}} => "a" | "b.c"
 */
export type NestedKeys<
  T extends NestedRecord,
  Filter extends NestedKeysFilter = any,
  Depth extends RecursionDepth = never,
> = NestedKeysTpl<T extends NestedRecord ? KVTuples<T> : never, Filter, Depth>;

/**
* Retrieve a deep entry in a nested object by a dot-separated path.
* e.g. "a.b.c" in object {a: {b: {c: string}}} => string
*/
export type RetrieveNested<D extends NestedRecord, P extends NestedKeys<D>> =
 P extends `${infer KBase}.${infer PNested}`
  ? D[KBase] extends NestedRecord
    ? RetrieveNested<D[KBase], PNested>
    : D[KBase]
  : D[P];
