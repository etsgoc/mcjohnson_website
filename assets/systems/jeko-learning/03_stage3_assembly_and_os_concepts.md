# Stage 3 — Assembly and OS Concepts

## Goal of this stage

Go one layer below C. See what your C code actually turns into, and
understand what the operating system is doing while your program runs.

---

## 1. x86-64 assembly, briefly

Assembly is a human-readable form of machine instructions — one line per
instruction, operating directly on registers and memory.

```asm
mov rax, 5      ; put 5 into register rax
add rax, 3      ; add 3 to rax  → rax now holds 8
ret             ; return, result is in rax
```

Compare this to the C function it might come from:

```c
int add() {
    return 5 + 3;
}
```

You don't need to become an assembly expert. You need to be able to **read**
small chunks of it and recognize what's happening.

**Task:** Take three small C functions (one with an `if`, one with a loop,
one that calls another function) and view their assembly on godbolt.org.
For each, find: where a value moves into a register, and (for the `if`
version) the instruction that jumps based on a comparison (look for
something like `cmp` followed by a `j...` instruction).
**Expected result:** You can point at the specific assembly line that
corresponds to your `if` condition and explain what it's checking.

---

## 2. Processes and virtual address space

Every running program gets its own **virtual address space** — a private
view of memory that starts at address 0 and goes up, even though many
programs are running at once on the same physical RAM.

```text
program (on disk)
   ↓ OS loads it
process (in memory)
   ↓
virtual address space
┌─────────────────┐  high addresses
│      stack      │  ↓ grows down
├─────────────────┤
│   (unused gap)  │
├─────────────────┤
│      heap       │  ↑ grows up
├─────────────────┤
│   data (globals)│
├─────────────────┤
│      code       │
└─────────────────┘  low addresses
```

The OS + CPU together translate these virtual addresses into real physical
RAM locations, invisibly, using a mechanism called **paging** (more on this
in Stage 8).

**Task:** Write a tiny C program that prints the address of a local
variable (stack), a heap-allocated variable, and a global variable. Compare
the three addresses.
**Expected result:** You see that stack, heap, and global addresses fall
into clearly different ranges, matching the diagram above.

---

## 3. System calls: crossing into the kernel

A syscall is a controlled door between your program (**user space**) and the
OS kernel (**kernel space**). Your program cannot touch hardware directly —
it must ask the kernel.

```text
YOUR PROGRAM (user space)
     │
     │  syscall (e.g. write())
     ▼
┌─────────────┐
│    KERNEL   │
│             │
│ filesystem  │
│ networking  │
│ memory      │
│ scheduler   │
└─────────────┘
```

When you called `write()` or `open()` in Stage 2, you were already making
syscalls — POSIX functions are thin wrappers around them.

**Task:** Use a syscall-tracing tool for your OS (Linux: `strace`, macOS:
`dtruss`/`dtrace`) on one of your Stage 2 programs (the file reader or tiny
shell). Read the raw list of syscalls it made.
**Expected result:** You can identify at least `open`, `read`, `write`, and
`close` (or their equivalents) in the trace output, and match each one to a
line of your own C code.

---

## 4. The scheduler and multitasking

Your CPU (usually) has far fewer cores than the number of processes running
on your machine. The **scheduler** (part of the kernel) decides which
process gets the CPU, and for how long, switching rapidly between them —
this is why it *feels* like everything runs "at once."

```text
time  →
CPU:  [process A][process B][process A][process C][process A]...
```

**Task:** Open your OS's process/activity monitor. Watch how many
processes are running versus how many CPU cores you have. Write down the
numbers.
**Expected result:** You notice the process count is far higher than the
core count, confirming that scheduling (fast switching) — not "true"
simultaneous execution of everything — is what's happening.

---

## 5. Putting it together: the full boundary

```text
   your language (later: Jeko)
          ↓
   your compiler output (assembly → machine code)
          ↓
   object file → linker → executable
          ↓
   OS loader creates a process
          ↓
   process runs in its virtual address space
          ↓
   syscalls cross into the kernel when needed
          ↓
   kernel talks to real hardware
```

**Task:** Without looking at any notes, draw this whole chain from memory,
labeling each arrow with what causes the transition (e.g. "compiling,"
"linking," "OS loads it," "syscall").
**Expected result:** A hand-drawn diagram that matches the shape above,
made from memory, not copied.

---

## Stage 3 checkpoint

- [ ] You can read small assembly snippets and match them to source code
- [ ] You can explain virtual address space and why every process "sees" the
      same layout
- [ ] You have traced real syscalls from a program you wrote
- [ ] You understand the scheduler's role in multitasking
- [ ] You can draw the full source-to-hardware chain unaided

Next: `04_stage4_build_first_language.md` — the fun part starts here.
