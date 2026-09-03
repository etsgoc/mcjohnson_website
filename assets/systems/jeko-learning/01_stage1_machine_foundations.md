# Stage 1 — Machine Foundations

## Goal of this stage

Before you build a language, you need to know what your language will
eventually turn into: raw instructions that a CPU runs. This stage builds
that picture.

You do not need to code much here. You need to **understand deeply**.

---

## 1. Binary and hexadecimal

Computers store everything as bits (0 and 1). Humans find long strings of
bits hard to read, so we group them into **hexadecimal** (base 16) instead.

```text
decimal:      201
binary:       1100 1001
hex:          C9
```

Why this matters for you: memory addresses, colors, machine instructions,
and file formats are almost always shown in hex. You will see hex constantly
once you start writing a compiler.

**Task:** Convert these decimal numbers to binary and hex by hand (paper,
not a calculator): 42, 255, 1024.
**Expected result:** You can explain *why* 255 is `1111 1111` and `FF`
without looking it up — you understand the grouping of bits into 4s (for hex)
not just the final answer.

---

## 2. CPU registers

A **register** is a tiny, extremely fast storage slot inside the CPU itself
(not memory). CPUs have very few of them — maybe 16 general-purpose ones on
a modern x86-64 machine.

```text
CPU
 ├── rax   (general purpose, often used for return values)
 ├── rbx
 ├── rcx
 ├── rdx
 ├── rsp   (stack pointer — points to the top of the stack)
 ├── rbp   (base pointer — marks start of current stack frame)
 └── ... a few more
```

Every calculation your program does happens in registers. Memory (RAM) is
much slower, so the CPU loads values into registers, computes, then maybe
writes results back to memory.

**Task:** Look up (search "x86-64 general purpose registers") which
registers are used for function arguments in the System V calling convention
(used on Linux/macOS). Write the list from memory the next day.
**Expected result:** You can name at least the first four argument
registers (rdi, rsi, rdx, rcx) without checking.

---

## 3. Stack vs heap

Two different places your program stores data while running.

```text
STACK                          HEAP
- fixed, ordered              - flexible size
- fast (just move a pointer)  - slower (must ask allocator)
- automatically cleaned up    - must be freed manually (or by GC/ownership)
- grows/shrinks as functions   - lives until explicitly freed
  are called and return
```

```text
Stack (grows downward)          Heap (grows upward)
┌──────────────┐                ┌──────────────┐
│ main() frame │                │  allocated   │
├──────────────┤                │  block A     │
│ add() frame  │                ├──────────────┤
│  a = 3       │                │  allocated   │
│  b = 4       │                │  block B     │
└──────────────┘                └──────────────┘
```

**Task:** Write down, in your own words, why a very deep recursive function
(a function calling itself many times) can crash with a "stack overflow,"
but allocating a huge array on the heap usually doesn't crash the same way.
**Expected result:** Your explanation mentions that the stack has a fixed,
small size decided at program start, while the heap is much larger and
managed dynamically.

---

## 4. Pointers and memory addresses

A pointer is just a number: the address of a byte in memory.

```text
variable x
┌─────────┐
│ value:20│  address: 0x7ffee...
└─────────┘

pointer p
┌─────────────────┐
│ value: 0x7ffee..│  → points at x
└─────────────────┘
```

You already touch something similar in TypeScript when you pass an object
by reference instead of by value — but in TS you never see the address. In
systems languages, you do.

**Task:** In plain words, explain the difference between "copying a value"
and "copying a pointer to a value." Give one real example from your own
TypeScript/Supabase apps where this distinction actually mattered (even if
you didn't think of it that way at the time).
**Expected result:** A short paragraph that correctly distinguishes value
semantics from reference semantics using your own example.

---

## 5. Calling conventions

When function A calls function B, there are rules for: which registers hold
the arguments, where the return value goes, and who cleans up the stack
afterward. This is the **calling convention**.

```text
caller                          callee
  │  put args in rdi, rsi...       │
  │  push return address           │
  │──────── call ────────────────► │
  │                                │ does work
  │                                │ puts result in rax
  │◄─────── ret ───────────────────│
  │  read result from rax          │
```

**Task:** Nothing to build yet — just read the diagram above until you can
explain it out loud without looking, as if teaching a friend.
**Expected result:** You can describe, step by step, what happens between
"function A calls function B" and "function A gets the result back."

---

## 6. From source code to a running program

This is the full journey — memorize this shape, you'll see it in every
stage that follows.

```text
source code (.c / .rs / .jeko)
        ↓  compiler front-end
assembly (.s)
        ↓  assembler
object file (.o)
        ↓  linker (combines with libraries)
executable file
        ↓  OS loader reads it into memory
running process
        ↓
CPU executes instructions, one at a time
```

**Task:** Install a C compiler (gcc or clang) if you don't have one. Compile
a tiny file with one function, and generate the assembly output instead of
an executable (search: "gcc -S flag output assembly"). Also try the same
function on **godbolt.org** (Compiler Explorer) — it's a website made
exactly for seeing source-to-assembly instantly, no install needed.
**Expected result:** You have looked at real assembly output for a function
you wrote, and you can point to the part that adds two numbers.

---

## 7. Object files, linking, processes, virtual memory, syscalls (preview)

You'll go deep on these in Stage 3. For now, just hold these definitions
loosely:

- **Object file**: compiled code that isn't a full program yet — missing
  pieces get filled in by the linker.
- **Linking**: combining your object file(s) with library code into one
  executable.
- **Process**: a running instance of a program, with its own memory space.
- **Virtual memory**: every process thinks it owns all of memory; the OS
  secretly maps this illusion onto real physical RAM.
- **System call (syscall)**: the only way a normal program can ask the OS
  kernel to do something privileged (open a file, send network data, etc).

**Task:** Write one sentence for each of the five terms above, in your own
words, without copying the definitions here.
**Expected result:** Five short sentences that would make sense to someone
who has never seen this file.

---

## Stage 1 checkpoint

Before moving to Stage 2, you should be able to:

- [ ] Convert between decimal, binary, and hex without a tool
- [ ] Explain what a register is and why the CPU uses them instead of RAM
- [ ] Draw the stack vs heap diagram from memory
- [ ] Explain the difference between a value and a pointer to a value
- [ ] Describe the full journey from source code to a running process

Next: `02_stage2_c_programming.md`
