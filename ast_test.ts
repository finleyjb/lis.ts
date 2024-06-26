import { assertEquals } from "jsr:@std/assert";
import { makeList, makeNumber, makeSymbol, parse, tokenize } from "./ast.ts";

Deno.test(function addTest() {
  assertEquals(tokenize("(+ 1 1)"), ["(", "+", "1", "1", ")"]);
});

Deno.test(function numberVal() {
  assertEquals(parse(["1"]), makeNumber(1));
  assertEquals(parse(["1.1"]), makeNumber(1.1));
});

Deno.test(function symbolVal() {
  assertEquals(parse(["blah"]), makeSymbol("blah"));
});

Deno.test(function emptyList() {
  assertEquals(parse(["(", ")"]), makeList([]));
});

Deno.test(function list() {
  assertEquals(
    parse(["(", "blah", "1", "1.1", ")"]),
    makeList([makeSymbol("blah"), makeNumber(1), makeNumber(1.1)]),
  );
});
