# Jeko Learning Path — Start Here

## Why this exists

You already know **what** you want Jeko to be (a Rust-like language, type-safe,
with a lot of things inferred by the compiler, later used for OS work,
blockchain, and its own frontend framework). You also already know some Rust
and TypeScript.

What you are missing is not vision. It is the **path from idea to working
system** — how a compiler is actually built, what an operating system
actually does, and how blockchain systems actually work under the hood.

This set of files is that path. It is written in simple English on purpose,
because the ideas are hard enough without hard words.

## How to use these files (with Claude / ChatGPT as your tutor)

For every stage:

1. **Read the file fully once**, without trying to code anything yet. Just
   build a picture in your head.
2. **Read it a second time**, slower, and stop at every diagram until you can
   redraw it from memory on paper.
3. Go to the **Tasks** section at the end. Try the task yourself first —
   even a bad attempt is fine.
4. Only after trying, ask your AI tutor (ChatGPT or Claude) to review what you
   built, explain *why* something failed, or explain a concept again in a
   different way. Do not ask the AI to just hand you the finished code — you
   will learn very little that way, and Jeko needs to be something *you*
   understand, not something an AI understands for you.
5. Compare your result with the **Expected Result** section. If it matches
   the shape described, move to the next stage.

There is no fixed timeline. Some stages take a weekend. Some take months.
That is completely normal for this kind of work — even professional compiler
engineers spend years on this.

## The big picture (mental model)

```text
                    Your Jeko language
                            │
                    ┌───────┴───────┐
                    │   Compiler    │
                    │ lexer / parser│
                    │ AST / types   │
                    │ borrow checker│
                    │ IR / codegen  │
                    └───────┬───────┘
                            │
                    ┌───────┴───────┐
                    │ Runtime / Std │
                    │ allocator     │
                    │ threads       │
                    │ files/sockets │
                    └───────┬───────┘
                            │
                    ┌───────┴───────┐
                    │       OS      │
                    │ processes     │
                    │ memory        │
                    │ syscalls      │
                    └───────┬───────┘
                            │
                       CPU / hardware
```

Blockchain sits partly *beside* this stack, built on top of networking,
cryptography, and distributed systems — not something the compiler gives you
for free. A frontend framework for Jeko sits on top too, using the compiler
to turn `.jeko` UI files into something a browser (or your own renderer) can
draw.

## Stage map

| File | Stage | What it gives you |
|---|---|---|
| 01 | Machine Foundations | How a program becomes bytes the CPU runs |
| 02 | C Programming | Manual memory, pointers, the "no safety net" view of computing |
| 03 | Assembly & OS Concepts | What's under C: registers, syscalls, processes |
| 04 | Build Your First Language | Lexer → Parser → AST → Interpreter |
| 05 | Make It Rust-Like | Static types, structs, enums, pattern matching |
| 06 | Memory Model & Ownership | Ownership, borrowing, lifetimes — the hard part of Rust, made concrete |
| 07 | Standard Library | Bridging your language to the real OS |
| 08 | Tiny Kernel / OS | Building a minimal OS from scratch |
| 09 | Networking & Distributed Systems | P2P, concurrency, consensus |
| 10 | Blockchain | Hashing, Merkle trees, chains, nodes |
| 11 | Frontend Framework for Jeko | Rendering, reactivity, compiling UI code |
| 12 | Resources | Free books, courses, and sites to go deeper forever |

## One important mindset shift

Do not think: *"If I learn to build a compiler, I automatically understand
OS and blockchain."* You won't. They overlap a lot, but each has its own
core ideas. This path treats your language project as the **spine** — the
thing that connects everything — but Stages 8, 9, and 10 are their own
subjects with their own logic.

Whenever a concept feels abstract, turn it into a question you can answer by
building something:

- "What is a lifetime?" → "How do I make my compiler reject this program?"
- "What is a syscall?" → "What function in my standard library calls it?"
- "What is consensus?" → "How do four nodes that disagree agree?"

That is the style of every file that follows. Start with `01_stage1_machine_foundations.md`.
