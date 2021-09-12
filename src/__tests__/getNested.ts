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
};

describe("getNested", () => {
  it("gets a simple root-level key", () => {
    expect(getNested(testObj, "a")).toBe(testObj.a);
  });
  it("gets a simple nested key", () => {
    expect(getNested(testObj, "b.c")).toBe(testObj.b.c);
  });
  it("gets an object root-level key", () => {
    expect(getNested(testObj, "b")).toEqual(testObj.b);
  });
  it("gets all primitive types properly", () => {
    Object.keys(testObj.prim).forEach((k) =>
      // @ts-ignore
      expect(getNested(testObj, `prim.${k}` as `prim.${keyof typeof testObj.prim}`)).toEqual(testObj.prim[k]));
  });
});
