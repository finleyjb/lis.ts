import { parse, tokenize } from "./ast.ts";
import { exec } from "./exec.ts";
import { Heap } from "./heap.ts";

const heap = new Heap();
if (import.meta.main) {
  const exp = parse(tokenize("(if (== 1 1) 1 1.1)"));
  console.log("\n=== Executing expression ===");
  console.log(exp);
  console.log('\n=== Result ===')
  console.log(exec(exp));
}
