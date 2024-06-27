import { Exp } from "./ast.ts";
import { runSrc } from "./exec.ts";
import inputLoop from "https://deno.land/x/input@2.0.4/index.ts";

export async function repl() {
  const input = new inputLoop();
  while (!input.done) {
    try {
      const inputTxt = await input.question("> ", false);
      if (inputTxt) {
        console.log((runSrc(inputTxt) as Exp).val);
      }
    } catch (e) {
      console.log(`\nException: ${e}`);
    }
  }
  Deno.exit(0);
}
