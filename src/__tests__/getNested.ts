import { getNested } from "..";

const testObj = {
  a: "a",
  b: { c: "c" },
  prim: {
    str: "str",
    num: 1,
    bool: false,
    null: null,
    undef: undefined,
  },
  d: { 1: "1" },
};

describe("getNested", () => {
  it("gets a simple root-level key", () => {
    expect(getNested(testObj, "a")).toBe(testObj.a);
  });
  it("gets a simple nested key", () => {
    expect(getNested(testObj, "b.c")).toBe(testObj.b.c);
  });
  it("gets a number key", () => {
    expect(getNested(testObj, "d.1")).toBe(testObj.d[1]);
  });
  it("gets an object root-level key", () => {
    expect(getNested(testObj, "b")).toEqual(testObj.b);
  });
  it("gets all primitive types properly", () => {
    Object.keys(testObj.prim).forEach((k) =>
      // @ts-ignore
      expect(getNested(testObj, `prim.${k}` as `prim.${keyof typeof testObj.prim}`)).toEqual(testObj.prim[k]));
  });
  it("returns undefined for a nonexistent root-level key", () => {
    expect(getNested(testObj, "z" as any)).toBe(undefined);
  });
  it("returns undefined for a nonexistent nested key", () => {
    expect(getNested(testObj, "z.y.x" as any)).toBe(undefined);
  });
  it("returns undefined for a partially existent nested key", () => {
    expect(getNested(testObj, "b.z" as any)).toBe(undefined);
  });
});
