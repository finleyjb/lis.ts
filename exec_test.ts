import { assertEquals } from "jsr:@std/assert/assert-equals";
import { makeBoolean, makeNumber, parse, tokenize } from "./ast.ts";
import { exec, runSrc } from "./exec.ts";

Deno.test(function execTest() {
  const exp = runSrc("( == 1 1)");
  assertEquals(exp, makeBoolean(true));
});

Deno.test(function addTest() {
  const exp = runSrc("(+ 1 1)");
  assertEquals(exp, makeNumber(2));
});

Deno.test(function ifTest() {
  const exp = runSrc("(if (== 2 2) 1 0)");
  assertEquals(exp, makeNumber(1));
});
