import { assertEquals } from "jsr:@std/assert/assert-equals";
import { Heap } from "./heap.ts";
import { callFn } from "./exec.ts";
import { makeBoolean, makeNumber } from "./ast.ts";

Deno.test(function getSymbol() {
  const heap = new Heap();
  assertEquals(
    callFn(heap.getSymbol("==")!, makeNumber(1), makeNumber(1)),
    makeBoolean(true),
  );
});

Deno.test(function setSymbol() {
  const heap = new Heap();
  heap.setSymbol("myVal", makeNumber(1));
  assertEquals(heap.getSymbol("myVal"), makeNumber(1));

  // Check that this still looks up builtins
  assertEquals(
    callFn(heap.getSymbol("==")!, makeNumber(1), makeNumber(1)),
    makeBoolean(true),
  );
});

Deno.test(function shadowSymbol() {
  const heap = new Heap();
  heap.setSymbol("==", makeNumber(1));
  assertEquals(heap.getSymbol("=="), makeNumber(1));
});
