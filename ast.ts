export type Tokens = string[];

export function tokenize(source: string): Tokens {
  const tokens = source.replaceAll(/\(/g, " ( ").replaceAll(/\)/g, " ) ").split(
    /\s/,
  ).filter(
    (token) => !!token,
  );
  return tokens;
}

export interface Exp {
  kind: string;
  val: any;
}

export interface List extends Exp {
  kind: "list";
  val: Exp[];
}

export interface Number extends Exp {
  kind: "number";
  val: number;
}

export interface Symbol extends Exp {
  kind: "symbol";
  val: string;
}

export interface Bool extends Exp {
  kind: "bool";
  val: boolean;
}

export interface Fn extends Exp {
  kind: "fn";
  // deno-lint-ignore ban-types
  val: Function;
}

export function parse(tokens: Tokens): Exp {
  const token = tokens.shift();
  if (token === "(") {
    const vals: Exp[] = [];
    const exp = { kind: "list", val: vals };
    while (tokens[0] !== ")") {
      vals.push(parse(tokens));
    }
    tokens.shift();
    return exp;
  } else if (token === ")") {
    throw new Error("Unexpected )");
  } else {
    // Note that javascript numbers are all doubles, so there's no reason to
    // have a separate parseInt call
    const intVal = parseFloat(token!);
    if (!isNaN(intVal)) {
      return makeNumber(intVal);
    } else {
      return makeSymbol(token!);
    }
  }
}

export function makeNumber(val: number): Number {
  return { kind: "number", val };
}

export function makeSymbol(val: string): Symbol {
  return { kind: "symbol", val };
}

export function makeList(val: Exp[]): List {
  return { kind: "list", val };
}

export function makeBoolean(val: boolean): Bool {
  return { kind: "bool", val };
}

// deno-lint-ignore ban-types
export function makeFunction(val: Function): Fn {
  return { kind: "fn", val };
}
