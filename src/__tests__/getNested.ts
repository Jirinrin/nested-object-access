import { getNested } from "..";

const testObj = {
  b: "bb",
  c: { d: "dd", w: "ww", e: { p: "pp" } },
  t: { l: "ww", e: { q: "pp" } },
  i: { d: "DD", o: "oo" },
};

describe("getNested", () => {
  it("gets a simple root-level key", () => {
    expect(getNested(testObj, "b")).toBe(testObj.b);
  });
  it("gets an object root-level key", () => {
    expect(getNested(testObj, "c")).toEqual(testObj.c);
  });
  it("gets a simple nested key", () => {
    expect(getNested(testObj, "c.d")).toBe(testObj.c.d);
  });
});
