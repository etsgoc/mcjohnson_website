# Stage 5 — Make It Rust-Like

## Goal of this stage

Take the toy interpreter from Stage 4 and grow it toward Jeko's actual
design: static types, structs, enums, pattern matching, and a `Result`-style
way of handling errors. This is where your language starts to feel like
something you envisioned, not just a calculator.

---

## 1. Static types

A **static type system** checks types *before* the program runs (at compile
time), instead of discovering type errors while running (like plain
JavaScript does). Since Jeko infers a lot for the programmer, this stage is
about the checker, not about forcing the user to annotate everything.

```rust
let x: i32 = 10;      // explicit
let y = 10;            // inferred — the compiler figures out y: i32
let z = x + "oops";    // compile-time error: type mismatch
```

Type inference (the compiler figuring out types you didn't write) usually
works by: assign a type to every expression, walk the AST, and unify types
that must match (e.g. both sides of `+` must agree).

**Task:** Add a type-checking pass to your Stage 4 interpreter. Start with
just two types: integer and boolean. Every `let` should get a type (either
written or inferred from its value), and using mismatched types (like adding
a boolean to an integer) should produce a compile-time error instead of
silently running.
**Expected result:** `let x = 10; let y = true; print(x + y);` is rejected
*before* running, with an error naming the mismatched types — not a runtime
crash, not a silent wrong answer.

---

## 2. Structs

```rust
struct User {
    id: u64,
    age: u32,
}
```

A struct groups related data (you already know this shape well from
TypeScript interfaces/types — the difference now is that your compiler must
know the exact memory layout and enforce field types itself).

**Task:** Add struct definitions and struct literals to your language
(`let u = User { id: 1, age: 30 };`) plus field access (`u.age`). Type-check
that a struct literal provides all required fields with the correct types.
**Expected result:** Creating a struct with a missing field, or a
wrong-typed field, is a compile-time error; a correctly-formed struct
literal works, and `u.age` returns the right value.

---

## 3. Enums (the Rust kind, not just labels)

Rust-style enums can carry data per variant — this is more powerful than
TypeScript's string-literal unions, closer to a "tagged union."

```rust
enum Shape {
    Circle(f64),
    Rectangle(f64, f64),
}
```

```text
Shape::Circle(3.0)
┌──────┬──────┐
│ tag: │ data:│
│Circle│  3.0 │
└──────┴──────┘
```

**Task:** Add enum definitions with data-carrying variants to your
language. Support at least one enum with two variants, one of which holds a
value.
**Expected result:** You can construct each variant and the compiler
correctly tracks which variant + data each value holds.

---

## 4. Pattern matching

```rust
match shape {
    Shape::Circle(r) => ...
    Shape::Rectangle(w, h) => ...
}
```

Pattern matching *destructures* a value — pulls out its data based on which
variant it is — and (importantly) a good compiler checks that you've handled
every possible variant (**exhaustiveness checking**).

**Task:** Implement `match` for your enums. Add a check that reports an
error if not all variants are covered by the match arms.
**Expected result:** Matching all variants compiles fine; leaving one
variant unhandled produces a clear compile-time error naming the missing
variant — this single feature is one of Rust's most-loved safety features,
and now you know exactly how it works.

---

## 5. A `Result`-style error type

```rust
enum Result<T, E> {
    Ok(T),
    Err(E),
}
```

This is just an enum with **generic** type parameters (`T` and `E` are
placeholders filled in per use). Instead of crashing or returning a special
sentinel value (remember `open()` returning `-1` in Stage 2?), functions
that might fail return a `Result`, and the caller is forced (by the
exhaustiveness check above) to handle both the success and failure cases.

**Task:** Add basic generics support so you can define `Result<T, E>` as a
built-in enum, and write a function in your language that returns
`Result<i32, String>` — succeeding sometimes, failing with a message other
times. Force callers to `match` on it.
**Expected result:** You can write and run a small program where a
"divide" function returns `Err("division by zero")` for zero, and `Ok(value)`
otherwise, and the caller must handle both cases to compile.

---

## Stage 5 checkpoint

- [ ] Your language rejects type-mismatched programs before running them
- [ ] Structs and enums (with data) work and are type-checked
- [ ] `match` works and checks exhaustiveness
- [ ] You've implemented a `Result`-style type using generics

Next: `06_stage6_memory_model_ownership.md` — this is the heart of what
makes Rust (and Jeko) different from most languages.
