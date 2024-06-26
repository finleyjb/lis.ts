import { Exp, Fn, List, Number, parse, Symbol, tokenize } from "./ast.ts";
import { Heap } from "./heap.ts";

const heap = new Heap();

export function exec(expression: Exp): Exp | undefined {
  console.log(expression);
  if (expression.kind === "symbol") {
    return heap.getSymbol(expression as Symbol);
  } else if (expression.kind === "number") {
    return expression;
  } else {
    const list = (expression as List).val;
    const first = list[0];
    const symbol = (first as Symbol).val;
    if (symbol === "if") {
      const [_, test, conseq, alt] = list;
      return exec(test) ? conseq : alt;
    } else if (symbol === "define") {
      const [_, symbol, exp] = list;
      heap.setSymbol(symbol as Symbol, exec(exp)!);
    } else {
      const proc = exec(first);
      const args = (list.slice(1)).map((arg) => exec(arg)!);
      return callFn(proc as Fn, ...args);
    }
  }
}

export function callFn(fn: Exp, ...args: Exp[]): Exp {
  return (fn as Fn).val(...args);
}

export function runSrc(source: string) {
  const exp = parse(tokenize(source));
  console.log(exp);
  return exec(exp);
}
