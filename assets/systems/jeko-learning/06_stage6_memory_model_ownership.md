# Stage 6 — Memory Model & Ownership

## Goal of this stage

This is the stage that makes Rust (and Jeko) fundamentally different from
both C (Stage 2, manual and unsafe) and TypeScript (garbage collected,
memory managed for you invisibly). You will implement the compiler rules
that catch memory bugs *before* the program ever runs — no garbage
collector, no manual `free()`, and no crashes from use-after-free.

This connects directly back to Stage 2. Remember use-after-free, double
free, and memory leaks? Ownership is the compile-time answer to all three.

---

## 1. The core question

```text
let x = allocate();
```

- Who **owns** that memory?
- When can it be freed?
- Can two things point to it at once?
- Can something use it after its owner is gone?
- Can two threads touch it at the same time safely?

Rust (and Jeko) answer these with rules enforced entirely at **compile
time** — this is different from garbage collection (which checks at
runtime) and different from C (which doesn't check at all).

---

## 2. Ownership

Every value has exactly **one** owner at a time. When the owner goes out of
scope, the value is automatically freed — no manual `free()` needed.

```rust
let a = String::from("hello");
let b = a;
// a is no longer usable — ownership moved to b
```

```text
before move:            after move:
a ──► "hello"           a ──► (invalid, moved out)
                         b ──► "hello"
```

This is called a **move**. It's the opposite of what happens in most
languages: in JS, `let b = a` for an object just makes a second reference
to the same thing, and both stay valid. In Rust, ownership *transfers* — `a`
becomes unusable.

**Task:** Add move semantics to your Stage 5 language for one heap-backed
type (like a string or a growable list). When a variable is assigned to
another variable, mark the original as "moved," and make using a moved
variable a compile-time error.
**Expected result:** `let a = make_string(); let b = a; print(a);` fails to
compile with an error like "use of moved value: a" — and importantly, at
runtime, only ONE free happens for that value (when `b` goes out of scope),
never two.

---

## 3. Borrowing (references without taking ownership)

Instead of moving a value, you can **borrow** it — get temporary access
without taking ownership.

```rust
fn length(s: &String) -> usize {
    s.len()
}

let a = String::from("hello");
let n = length(&a);   // a is still usable after this
```

```text
a ──► "hello"
       ▲
       │ borrowed (read-only) by the function call
```

**Task:** Add immutable references (`&T`) to your language. A function that
takes `&T` should be able to read the value without taking ownership, and
the original variable must remain usable afterward.
**Expected result:** Calling a "borrowing" function twice in a row on the
same variable works fine — no move error — because borrowing doesn't
transfer ownership.

---

## 4. Mutable borrowing and the aliasing rule

```rust
fn modify(s: &mut String) {
    s.push_str(", world");
}
```

The critical rule that gives Rust its memory *and* thread safety guarantees:
**at any point, you may have either (a) any number of immutable borrows, OR
(b) exactly one mutable borrow — never both at once.**

```text
allowed:                          NOT allowed:
&a   &a   &a                      &a   &mut a
(many readers, fine)              (reader + writer, forbidden)

allowed:
&mut a
(one writer, no readers)
```

This single rule is what prevents data races *at compile time*, without
ever needing locks for the common case. This is the payoff of the whole
stage.

**Task:** Add mutable references (`&mut T`) and implement the aliasing
check: reject a program that tries to create a mutable borrow while an
immutable (or another mutable) borrow of the same variable is still active.
**Expected result:** Your compiler rejects a program that holds `&a` and
then tries `&mut a` before the first borrow ends, with a clear error — and
accepts the same code once the immutable borrow's scope has ended.

---

## 5. Lifetimes (a first, simplified pass)

A **lifetime** answers: "how long is this reference valid for?" The core
danger lifetimes prevent is a **dangling reference** — a reference that
outlives the value it points to.

```rust
fn dangling() -> &String {
    let s = String::from("oops");
    &s   // ERROR: s is destroyed when the function ends, but we're
         //         returning a reference to it!
}
```

```text
function ends → s is freed
       but the caller still holds a reference to where s used to be
       → that memory could now hold anything → dangling reference
```

**Task:** Add a check to your borrow checker that rejects a function
returning a reference to a value that was created (and thus destroyed) 
inside that same function.
**Expected result:** Your compiler rejects the "dangling" pattern above
with a clear error, while allowing a function to return a reference that
was *passed in* as a parameter (since that value's lifetime is controlled
by the caller, not the callee).

---

## 6. Concurrency safety: `Send`, `Sync`, and why they matter

Once you have ownership and borrowing, thread safety becomes almost a free
side effect: a type is `Send` if it's safe to move to another thread, and
`Sync` if it's safe to be accessed from multiple threads at once (through a
shared reference). The compiler can derive most of this automatically from
your ownership rules.

```text
                    Send?         Sync?
plain integer        yes           yes
Rc<T> (shared,
 non-atomic count)    no            no
Arc<T> (shared,
 atomic count)        yes           yes
```

**Task:** No implementation needed yet — just explain, in your own words,
why a type using a *non-atomic* shared counter (increment isn't safe from
two threads at once) should NOT be allowed to cross threads, while a type
using an *atomic* counter should.
**Expected result:** A short paragraph correctly connecting "not thread
safe internally" to "the compiler should refuse to let it cross threads" —
this is the conceptual seed for real concurrency work in Stage 9.

---

## Stage 6 checkpoint

- [ ] You implemented move semantics and can explain "use after move" errors
- [ ] You implemented immutable and mutable borrowing with the aliasing rule
- [ ] You implemented a basic dangling-reference check
- [ ] You can explain why ownership rules also solve data races, not just
      memory bugs

This is genuinely the hardest stage in the whole path. If it takes a long
time, that is completely normal — this is the part of Rust that took the
Rust team itself years to get right.

Next: `07_stage7_standard_library.md`
