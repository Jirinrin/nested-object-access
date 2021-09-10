// Manual test, just hover over these types to check that stuff looks okay

import { NestedKeys, RetrieveNested } from "..";

type TestDict = {
  b: "bb";
  c: { d: "dd"; w: "ww"; e: { p: "pp" } };
  t: { l: "ww"; e: { q: "pp" } };
  i: { d: "DD"; o: "oo" };
};

// "b" | "c.d" | "c.w" | "c.e.p" | "t.e.q" | "t.l" | "i.d" | "i.o"
type TestDotsTestStr = NestedKeys<TestDict, "primitives">;
// "c" | "t" | "i" | "c.e" | "t.e"
type TestDotsTestObj = NestedKeys<TestDict, "objects">;
// "b" | "c" | "t" | "i" | "c.d" | "c.w" | "c.e.p" | "t.e.q" | "t.l" | "i.d" | "i.o" | "c.e" | "t.e"
type TestDotsTestAny = NestedKeys<TestDict>;
// "b" | "c.d" | "c.w" | "t.l" | "i.d" | "i.o"
type TestDotsTestDepth = NestedKeys<TestDict, "primitives", 2>;

type TestPath1 = RetrieveNested<TestDict, "c">;
type TestPath2 = RetrieveNested<TestDict, "c.e">;
