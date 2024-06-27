import { parseArgs } from "jsr:@std/cli/parse-args";
import { parse, tokenize } from "./ast.ts";
import { exec } from "./exec.ts";
import { Heap } from "./heap.ts";
import { repl } from "./repl.ts";

const flags = parseArgs(Deno.args, {
  boolean: ["repl"],
  default: { repl: true },
});

const heap = new Heap();
if (import.meta.main) {
  if (flags.repl) {
    await repl();
  }

  const exp = parse(tokenize("(if (== 1 1) 1 1.1)"));
  console.log("\n=== Executing expression ===");
  console.log(exp);
  console.log("\n=== Result ===");
  console.log(exec(exp));
}
