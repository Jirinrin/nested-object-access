import { NestedKeys, NestedRecord, RetrieveNested } from "./types";

export * from "./types";

export function getNested<T extends NestedRecord, K extends NestedKeys<T>>(record: T, key: K): RetrieveNested<T, K>;
