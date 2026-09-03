# Stage 2 — C Programming

## Why C, if Jeko is Rust-like?

Rust hides a lot of machine detail behind safety rules. That's great for
*using* Rust, but bad for *understanding what those rules are protecting you
from*. C has almost no safety net, so it forces you to see the machine
directly. Once you've felt C break in your hands, Rust's rules will make
intuitive sense instead of feeling arbitrary.

You already know TypeScript. Keep comparing C to TS as you go — the
differences are exactly the things you need to notice.

---

## 1. Pointers, for real this time

```c
int x = 10;
int *p = &x;   // p holds the address of x
*p = 20;       // follow the pointer, change what it points to
```

```text
x
│
├── value: 20
│
└── address: 0x7ffe....
             ↑
             p  (p's value is that address)
```

In TypeScript, `let p = x` for an object copies a reference automatically,
and you can never "un-reference" it or get the raw address. In C, you are in
full control — and full danger.

**Task:** Predict, on paper, what a small C snippet prints if you follow a
pointer, change the value through it, then read the original variable
again. Then actually compile and run it to check.
**Expected result:** Your prediction matches the real output. If it
doesn't, figure out *why* before moving on — this usually reveals a
misunderstanding worth fixing now.

---

## 2. Structs, unions, function pointers

```c
struct User {
    unsigned long id;
    unsigned int age;
};
```

A struct is a group of values stored together in memory, back to back, like
this:

```text
struct User in memory
┌─────────────┬───────────┐
│ id (8 bytes)│ age(4 bytes)│
└─────────────┴───────────┘
```

A **union** is like a struct, but all fields share the *same* memory — only
one is valid at a time. A **function pointer** is a variable that holds the
address of a function, letting you call different functions through the
same variable (this is how a lot of dynamic dispatch is implemented under
the hood — including some of what Rust's trait objects compile down to).

**Task:** Define a struct that models something from one of your TypeScript
apps (e.g. a `User` or `Product`). Write down, in bytes, roughly how big you
expect the struct to be, based on its fields.
**Expected result:** A struct definition plus a short note like "id is 8
bytes, age is 4 bytes, so around 12-16 bytes total" (real size may include
padding — a bonus discovery if you notice it).

---

## 3. Manual memory: `malloc` / `free`

```text
request memory  →  malloc(n)  →  heap gives you a block
use it
done with it    →  free(ptr)  →  heap reclaims the block
```

Forget to `free` → **memory leak**. Use memory after freeing it → **use
after free**, a serious bug class. Free the same memory twice → **double
free**, also serious. This is *exactly* the category of bug that Rust's
ownership system exists to prevent automatically — which is why Stage 6
will make so much more sense after this stage.

**Task:** Write a tiny C program that deliberately leaks memory (allocate,
never free), run it, and read up on how to detect leaks (search: "valgrind
memory leak check" or use a similar tool for your OS). Then fix the leak and
confirm the tool reports clean.
**Expected result:** You've seen a real leak reported by a real tool, not
just read about the concept.

---

## 4. Undefined behavior and memory layout

C lets you do things that have **no defined result** — like reading past the
end of an array. The compiler assumes you'd never do this, so it doesn't
protect you, and the result can be "anything," including working fine on
your machine and crashing elsewhere.

```text
int arr[3] = {1, 2, 3};
arr[5]  // undefined behavior — could be garbage, could crash, could "work"
```

**Task:** Deliberately write an out-of-bounds array access and run it a few
times. Note what happens (garbage value? crash? nothing obvious?).
**Expected result:** A short note describing what you observed, and the
understanding that "it didn't crash" does NOT mean "it was safe."

---

## 5. Compilation and linking, and POSIX APIs

POSIX is a standard set of OS functions (mostly for Unix-like systems —
Linux, macOS) such as `open`, `read`, `write`, `fork`, `socket`. These are
thin wrappers around syscalls. This is your first real look at how a
program talks to the OS.

```c
int fd = open("data.txt", O_RDONLY);
read(fd, buffer, size);
close(fd);
```

**Task:** Write a program that opens a file, reads its contents, and prints
them. Then write a second version that does the same thing but for a file
that doesn't exist, and observe what the `open` call returns.
**Expected result:** The first program prints the file. The second shows
you that `open` returns a special value (commonly `-1`) on failure, and you
check `errno` to see why — this "return a sentinel value on failure" pattern
is everywhere in systems code, and it's part of why Rust's `Result` type
exists (Stage 5 will connect this directly).

---

## Projects for this stage

Build these roughly in order. **Do not look up full solutions** — design and
attempt each one yourself, then ask your AI tutor to review your approach
and point out bugs, not to write it for you.

| Project | What it teaches |
|---|---|
| Hex/byte dump utility | reading raw bytes, representation |
| Dynamic array (like a growable list) | manual memory growth strategy |
| Hash table | data structures, hashing basics |
| Simple string library | manual memory + text handling |
| Thread pool | basic concurrency |
| Tiny TCP echo server | networking basics |
| Tiny shell (runs commands you type) | processes, syscalls |

### Example: Dynamic array

**Task:** Design (on paper first) a growable array type that starts small
and doubles in size when full, similar to how `Vec` works in Rust or how a
JS array grows internally. Decide: what fields does your struct need
(pointer to data, current length, current capacity)? What happens on
growth — do you allocate new memory and copy the old data over?
**Expected result:** A working program where you can push 100+ integers
into your dynamic array, print them all back correctly, and the array grows
automatically without you managing size by hand. No memory leaks (verify
with your leak-checking tool).

### Example: Tiny shell

**Task:** Build a program that reads a line of input (like `ls -la`),
splits it into a command and arguments, and runs it as a new process,
waiting for it to finish before asking for the next command.
**Expected result:** Typing `ls` in your shell actually lists files, using
your own program as the "shell" — this is your first real contact with
processes and `fork`/`exec`, which you'll go deeper on in Stage 3.

---

## Stage 2 checkpoint

- [ ] You can explain pointers, structs, and manual memory without notes
- [ ] You have caused, and fixed, a real memory leak
- [ ] You have caused undefined behavior on purpose and seen what happened
- [ ] You've built at least the dynamic array and the tiny shell
- [ ] You understand what POSIX functions are and how they relate to syscalls

Next: `03_stage3_assembly_and_os_concepts.md`
