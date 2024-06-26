// deno-lint-ignore-file no-explicit-any ban-types
import {
  Exp,
  List,
  makeBoolean,
  makeFunction,
  makeNumber,
  Number,
  Symbol,
} from "./ast.ts";

export class Heap {
  private readonly builtins: ReadonlyMap<string, Function> = new Map<
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

  private readonly userHeap: Map<string, Exp> = new Map();

  getSymbol(sym: Symbol | string) {
    const name = typeof sym === "string" ? sym : sym.val;
    let val: Exp | undefined;
    if (this.userHeap.has(name)) {
      val = this.userHeap.get(name);
    } else {
      val = makeFunction(this.builtins.get(name)!);
    }
    return val;
  }

  setSymbol(sym: Symbol | string, val: Exp) {
    const name = typeof sym === "string" ? sym : sym.val;
    this.userHeap.set(name, val);
  }
}
