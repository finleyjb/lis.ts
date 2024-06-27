import { parseArgs } from "jsr:@std/cli/parse-args";
import { Exp, parse, tokenize } from "./ast.ts";
import { exec, runSrc } from "./exec.ts";
import { Heap } from "./heap.ts";
import { repl } from "./repl.ts";

const heap = new Heap();
const args = parseArgs(Deno.args)._;
console.log(args);
if (import.meta.main) {
  if (!args.length) {
    await repl();
  }

  for (const fname of args) {
    const text = await Deno.readTextFile(fname);
    console.log((runSrc(text) as Exp).val);
    Deno.exit(0);
  }

  const exp = parse(tokenize("(if (== 1 1) 1 1.1)"));
  console.log("\n=== Executing expression ===");
  console.log(exp);
  console.log("\n=== Result ===");
  console.log(exec(exp));
}
