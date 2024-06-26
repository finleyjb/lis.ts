import { parse, tokenize } from "./ast.ts";
import { exec } from "./exec.ts";
import { Heap } from "./heap.ts";

const heap = new Heap();
if (import.meta.main) {
  const exp = parse(tokenize("(if (== 1 1) 1 1.1)"));
  console.log(exp);
  console.log(exec(exp));
}
