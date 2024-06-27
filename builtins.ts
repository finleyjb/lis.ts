import { Exp, List, makeBoolean, makeNumber, Number } from "./ast.ts";

export const builtins: ReadonlyMap<string, Function> = new Map<
  string,
  Function
>(
  [
    ["+", (val1: Exp, val2: Exp) => makeNumber(val1.val + val2.val)],
    ["-", (val1: Exp, val2: Exp) => makeNumber(val1.val - val2.val)],
    ["*", (val1: Exp, val2: Exp) => makeNumber(val1.val * val2.val)],
    ["/", (val1: Exp, val2: Exp) => makeNumber(val1.val / val2.val)],
    [">", (val1: Exp, val2: Exp) => makeBoolean(val1.val > val2)],
    [">=", (val1: Exp, val2: Exp) => makeBoolean(val1.val >= val2.val)],
    ["<", (val1: Exp, val2: Exp) => makeBoolean(val1.val < val2.val)],
    ["<=", (val1: Exp, val2: Exp) => makeBoolean(val1.val <= val2.val)],
    ["==", (val1: Exp, val2: Exp) => makeBoolean(val1.val === val2.val)],
    ["abs", (val: Number) => makeNumber(Math.abs(val.val))],
    ["append", (l: List, val: Exp) => l.val.concat(val)],
  ],
);
