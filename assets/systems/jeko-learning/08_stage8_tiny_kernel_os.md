# Stage 8 — Tiny Kernel / Operating System

## Goal of this stage

Everything so far assumed an existing OS (Linux/macOS/Windows) underneath
you. Now ask: "what if there is no OS — what if *I* am the OS?" This is the
deepest stage in the whole path. It's normal to lean heavily on tutorials
here (see the resources file) — the goal is understanding, not inventing
OS theory from scratch.

This stage is genuinely optional for Jeko's language goals, but you
mentioned wanting Jeko usable for OS work, so understanding this layer
directly informs how your std library (Stage 7) and runtime should be
designed to eventually run *without* a host OS (this is called
**bare-metal** or `no_std` in Rust terms).

---

## 1. The boot process

```text
power on
    ↓
firmware (BIOS/UEFI) runs first, does hardware checks
    ↓
firmware loads the bootloader from disk
    ↓
bootloader sets up minimal CPU state
    ↓
bootloader loads YOUR kernel into memory
    ↓
control jumps to your kernel's entry point
    ↓
your kernel is now the only thing running — no OS below you anymore
```

**Task:** Read about the boot process for your CPU architecture (search:
"x86-64 boot process BIOS UEFI"). Draw the diagram above from memory,
adding one sentence per step about what that stage is actually
responsible for.
**Expected result:** A diagram + notes that show you understand there are
several handoffs before your own code ever runs.

---

## 2. CPU initialization and privilege levels

CPUs have **privilege rings** — ring 0 (kernel, full hardware access) and
ring 3 (user programs, restricted). This is the real mechanism behind the
"user space / kernel space" boundary from Stage 3.

```text
ring 0 (kernel)   — full access to hardware
ring 3 (user)     — restricted, must use syscalls to ask ring 0 for help
```

A tiny kernel you write yourself runs in ring 0 from the start — there's no
"asking permission," because you're already at the top.

---

## 3. Memory management and paging

Recall virtual memory from Stage 3 — an OS *implements* that illusion using
**paging**: a table that maps virtual addresses to physical ones.

```text
virtual address            physical address
  0x1000        ──────►      0x9A000
  (via page table lookup)
```

As kernel author, you now own the page table itself — you decide the
mapping, instead of relying on someone else's OS to do it.

**Task:** Read about page tables and paging (see resources file for a
guided tutorial). Explain, in your own words, why paging lets the OS give
each process the illusion of "owning all of memory" even though physical
RAM is shared.
**Expected result:** A short paragraph correctly connecting "page table" to
"illusion of private memory per process."

---

## 4. Interrupts

An **interrupt** is a signal that pauses whatever the CPU is doing to
handle something urgent — a key press, a timer tick, a hardware error. Your
kernel must register **interrupt handlers** to respond to these.

```text
CPU running normal code
        │
        │  ← interrupt fires (e.g. timer)
        ▼
CPU jumps to your interrupt handler
        │
        ▼
handler does its work, then CPU resumes where it left off
```

This is also how your kernel implements a **scheduler** — a timer interrupt
fires regularly, and your handler decides whether to switch to a different
process.

---

## 5. What to actually build

Follow a guided, free tutorial for your first kernel (strongly recommended
— see resources file for "Writing an OS in Rust" and OSDev.org). Roughly,
you'll build, in order:

```text
1. "Hello world" that prints text directly to screen memory (no OS to help)
2. A simple memory allocator for your kernel's own use
3. Interrupt handling (keyboard input, timer)
4. Paging / virtual memory
5. A basic scheduler (switch between simple tasks)
6. A minimal filesystem (even an in-memory one counts)
```

**Task:** Follow a guided tutorial to get a kernel that boots (in an
emulator like QEMU — you don't need real hardware) and prints "Hello,
world" using nothing but your own code — no OS underneath.
**Expected result:** You have a bootable kernel image that runs in an
emulator and prints text you wrote to the screen, with zero help from an
existing OS.

**Task:** Extend it to read keyboard input via interrupts and echo typed
characters back to the screen.
**Expected result:** Typing in the emulator window shows the characters
appearing on screen, handled entirely by your own interrupt handler.

---

## Stage 8 checkpoint

- [ ] You understand the boot process and privilege rings
- [ ] You understand paging well enough to explain it to someone else
- [ ] You understand interrupts and how they enable scheduling
- [ ] You have a bootable "hello world" kernel running in an emulator
- [ ] (Stretch) Your kernel handles keyboard interrupts

Next: `09_stage9_networking_distributed_systems.md`
