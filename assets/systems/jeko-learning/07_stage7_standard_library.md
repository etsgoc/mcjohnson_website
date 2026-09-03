# Stage 7 — Standard Library

## Goal of this stage

A language is not just its compiler. Nobody writes real programs using only
`let` and `match`. This stage connects Jeko to the real world: files,
threads, networking, time — by building a **standard library** (std) that
wraps OS syscalls (from Stage 3) behind safe, ergonomic functions.

```text
your language

File::open("data.txt")
       │
       ▼
standard library         ← you build this
       │
       ▼
syscall                  ← Stage 3
       │
       ▼
OS kernel
       │
       ▼
filesystem / disk
```

---

## 1. The shape of a standard library

```text
std/
├── memory     — allocator interface
├── alloc      — growable collections (Vec, HashMap, String)
├── string     — text handling
├── collections— Vec, HashMap, etc (built on alloc)
├── io         — reading/writing streams
├── fs         — files, directories
├── process    — spawning and managing processes
├── thread     — spawning threads
├── sync       — Mutex, channels, atomics
├── net        — TCP/UDP sockets
├── time       — clocks, durations
└── crypto     — hashing, later used heavily in Stage 10
```

You don't need to build all of this at once. Build it in the order your own
programs need it — that's how real standard libraries grew too.

---

## 2. FFI: calling the OS from your language

Since your Jeko compiler eventually generates real machine code (or, for
now, could call out through your host language — e.g. Rust, if you're
bootstrapping Jeko's early runtime in Rust), you need a way to call C-like
functions from Jeko. This is called **FFI** (Foreign Function Interface).

```text
Jeko function `File::open`
        │
        ▼
  FFI call to the C function `open()`
        │
        ▼
  syscall
```

**Task:** From your Stage 5/6 language (or directly in Rust, as a
stand-in, if your language can't do FFI yet), call the real `open`, `read`,
and `close` functions to read an actual file from disk, and print its
contents.
**Expected result:** Your program prints the real contents of a real file
on your machine — this is the first time your project actually touches the
operating system directly instead of just running in its own little world.

---

## 3. Building `Vec` (a growable array) as a real std type

You built a dynamic array in C in Stage 2. Now rebuild the *idea* as a
proper standard library type in your language, using the ownership rules
from Stage 6 to guarantee it frees itself automatically and can't be
misused.

**Task:** Implement `Vec<T>` in your language's standard library: `push`,
`pop`, `get`, `len`, and automatic cleanup when it goes out of scope (no
manual free needed by the user of `Vec`).
**Expected result:** A user of your language can write
`let v = Vec::new(); v.push(1); v.push(2);` and never think about memory —
while under the hood, your `Vec` implementation is doing exactly the
malloc/free-style management you learned by hand in Stage 2.

---

## 4. `Result` and `Option` as real std types, used everywhere

By now `Result<T, E>` should already work (Stage 5). Add `Option<T>` (a
value that might be absent — `Some(value)` or `None`) and make your std
functions actually use them, instead of sentinel values like `-1` or `null`.

```text
Option<T>          Result<T, E>
 ├── Some(T)         ├── Ok(T)
 └── None             └── Err(E)
```

**Task:** Rewrite your file-reading std function so it returns
`Result<String, IoError>` instead of crashing or returning an empty
string on failure. Rewrite a "find item in Vec" function to return
`Option<T>` instead of a sentinel index like `-1`.
**Expected result:** Calling code is *forced* (by exhaustiveness checking
from Stage 5) to explicitly handle the "file not found" and "not found in
list" cases — the compiler literally will not let a programmer forget.

---

## 5. Threads and basic synchronization

```text
main thread
   │
   ├── spawn ──► thread A (runs concurrently)
   │
   └── join ◄──  wait for thread A to finish
```

A `Mutex` (mutual exclusion lock) protects shared data so only one thread
touches it at a time.

**Task:** Implement a minimal `thread::spawn` and `Mutex<T>` in your std
(these can wrap real OS threads via FFI — pthreads on Unix-like systems).
Write a small program that spawns several threads, each incrementing a
shared counter protected by your `Mutex`, then joins them all and prints
the final count.
**Expected result:** The final count is always correct (e.g. exactly 1000
after 10 threads each increment 100 times) — run it multiple times to
confirm it's not accidentally racing.

---

## Stage 7 checkpoint

- [ ] You can call real OS functions from your language via FFI
- [ ] You have a working `Vec<T>` with automatic memory management
- [ ] Your std uses `Result`/`Option` instead of sentinel values
- [ ] You have working threads and a working `Mutex`

Next: `08_stage8_tiny_kernel_os.md` — this is the deepest, most advanced
stage. Feel free to read it now and come back to actually build it later.
