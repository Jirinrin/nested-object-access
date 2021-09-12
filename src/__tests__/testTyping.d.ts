// Manual test, just hover over these types to check that stuff looks okay

import { NestedKeys, RetrieveNested } from "..";

// Test NestedKeys

type TestDict = {
  b: string;
  c: { d: number; w: string; e: { p: false } };
  t: { l: boolean; e: { q: "foo" } };
  i: { d: string | undefined; o: null };
};

// Default functionality
// "b" | "c" | "t" | "i" | "c.d" | "c.w" | "c.e.p" | "t.e.q" | "t.l" | "i.d" | "i.o" | "c.e" | "t.e"
type TestKeys = NestedKeys<TestDict>;
// Get only the paths to primitive values
// "b" | "c.d" | "c.w" | "c.e.p" | "t.e.q" | "t.l" | "i.d" | "i.o"
type TestKeysPr = NestedKeys<TestDict, "primitives">;
// Get only the paths to nested objects
// "c" | "t" | "i" | "c.e" | "t.e"
type TestKeysObj = NestedKeys<TestDict, "objects">;
// Get only up to a certain depth
// "b" | "c" | "t" | "i" | "c.d" | "c.w" | "c.e" | "t.e" | "t.l" | "i.d" | "i.o"
type TestKeysWithDepth = NestedKeys<TestDict, any, 2>;

// Test RetrieveNested

type TestDict2 = { c: { e: { p: "pp" } } }

// { e: { p: "pp"; }; }
type TestNestedPath1 = RetrieveNested<TestDict2, "c">;
// { p: "pp"; }
type TestNestedPath2 = RetrieveNested<TestDict2, "c.e">;
// "pp"
type TestNestedPath3 = RetrieveNested<TestDict2, "c.e.p">;
