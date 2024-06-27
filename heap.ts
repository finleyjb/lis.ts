import { Exp, makeFunction, Symbol } from "./ast.ts";
import { builtins } from "./builtins.ts";

export class Heap {
  private readonly userHeap: Map<string, Exp> = new Map();

  getSymbol(sym: Symbol | string) {
    const name = typeof sym === "string" ? sym : sym.val;
    let val: Exp | undefined;
    if (this.userHeap.has(name)) {
      val = this.userHeap.get(name);
    } else {
      val = makeFunction(builtins.get(name)!);
    }
    return val;
  }

  setSymbol(sym: Symbol | string, val: Exp) {
    const name = typeof sym === "string" ? sym : sym.val;
    this.userHeap.set(name, val);
  }
}
