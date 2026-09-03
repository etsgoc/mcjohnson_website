# Resources — Go Deeper, Forever

This file is different from the others. No tasks here, just a curated map
of where to go once a stage's short explanation isn't enough. Almost
everything below is free or open source, because you should not have to
pay to learn this.

---

## General systems programming foundations

- **CS:APP — "Computer Systems: A Programmer's Perspective"** — the classic
  book connecting C, assembly, memory, and OS concepts. Look for the free
  course materials and lecture slides that many universities post
  alongside it (search "CS:APP course website").
- **Nand2Tetris** (nand2tetris.org) — free course, build a computer from
  logic gates up to a working OS and simple apps. Extremely good for
  building deep intuition about "what a computer actually is."
- **Ben Eater's YouTube channel** — builds an 8-bit computer on breadboards,
  and separately has excellent videos on how CPUs execute instructions.
  Very visual, very good for Stage 1 intuition.
- **Godbolt.org (Compiler Explorer)** — the tool mentioned in Stage 1 and 3.
  Use it constantly.
- **Teach Yourself Computer Science** (teachyourselfcs.com) — a free,
  well-reasoned reading list covering the whole CS foundation, if you ever
  want structured breadth beyond this path.

## C and low-level programming

- **"The C Programming Language" (K&R)** — the classic, short, dense. Worth
  owning even if you learn C mostly by doing.
- **Beej's Guide to C Programming** (beej.us) — free, excellent, practical.
- **Beej's Guide to Network Programming** (beej.us) — free, the standard
  intro to sockets, directly useful for Stage 2 and Stage 9.

## Compilers and language implementation

- **Crafting Interpreters** by Robert Nystrom (craftinginterpreters.com) —
  free, online, one of the best-written technical books that exists.
  Builds two full interpreters step by step. Do this alongside or right
  after Stage 4.
- **The rustc dev guide** (rustc-dev-guide.rust-lang.org) — free, official,
  explains how the real Rust compiler is built internally — extremely
  relevant once you're deep into Stage 5-6.
- **LLVM "Kaleidoscope" tutorial** (llvm.org) — free, official tutorial for
  building a real compiler backend using LLVM, useful once you want real
  code generation beyond a tree-walking interpreter.
- **"Writing A Compiler In Go" and "Writing An Interpreter In Go"** by
  Thorsten Ball — not free, but short, clear, and very beginner-friendly;
  good alternative/companion to Crafting Interpreters.

## Rust itself (since Jeko is Rust-inspired)

- **The Rust Programming Language ("the book")** — free, official
  (doc.rust-lang.org/book). Even though you know some Rust, read it fully
  once — you'll notice design decisions differently now that you're
  building a language yourself.
- **The Rustonomicon** (doc.rust-lang.org/nomicon) — free, official, the
  "dark arts" of unsafe Rust and low-level memory guarantees — very
  relevant to Stage 6.
- **Rust By Example** — free, official, good for quick syntax reference.

## Operating systems

- **"Writing an OS in Rust"** by Philipp Oppermann (os.phil-opp.com) —
  free, extremely well-written, guided, step-by-step blog series building
  a real kernel in Rust. This is the single best resource for Stage 8.
- **OSDev.org wiki** — free, huge community reference for every OS-building
  topic imaginable; use it as a lookup reference alongside Oppermann's
  guide.
- **MIT 6.828 / 6.1810 "Operating System Engineering"** — free course
  materials (search "MIT 6.1810 operating systems" or "6.828 pdos"), based
  around xv6, a small real Unix-like teaching OS with readable source code.

## Networking and distributed systems

- **MIT 6.824 "Distributed Systems"** — free lecture videos and labs
  (search "MIT 6.824 distributed systems"), the standard course covering
  consensus (Raft), replication, and fault tolerance — directly feeds
  Stage 9 and Stage 10.
- **"Designing Data-Intensive Applications"** by Martin Kleppmann — not
  free, but widely regarded as the best single book connecting databases,
  distributed systems, and real-world tradeoffs.
- **The Raft consensus paper** ("In Search of an Understandable Consensus
  Algorithm") — free PDF, much more approachable than it sounds, and there
  are excellent free visualizations of Raft online (search "raft
  visualization").

## Cryptography and blockchain

- **Mastering Bitcoin** by Andreas Antonopoulos — free, open source, full
  text available on GitHub (search "bitcoinbook mastering bitcoin
  github"). Extremely clear explanations of hashing, keys, transactions,
  and mining.
- **The original Bitcoin whitepaper** by Satoshi Nakamoto — free, short
  (about 9 pages), worth reading directly once you've done Stage 10 — it
  will suddenly be very readable instead of mysterious.
- **Ethereum.org developer docs** — free, good conceptual explanations of
  accounts, gas, smart contracts, and proof-of-stake, if you want to go
  beyond a Bitcoin-style model.
- **libp2p docs** (libp2p.io) — free, the P2P networking library used by
  many real blockchain and distributed projects; good reference once your
  own Stage 9 P2P code feels solid and you want to see a production-grade
  approach.

## Frontend framework internals

- **"Build your own React"** by Rodrigo Pombo (pomb.us) — free, short,
  exceptionally clear article building a tiny React clone from scratch.
  The single best resource for Stage 11's virtual DOM task.
- **SolidJS documentation and blog posts by its creator, Ryan Carniato** —
  free, excellent explanations of fine-grained reactivity/signals, the
  alternative model to virtual DOM diffing.
- **WebAssembly.org** — free, official docs and guides for WASM itself.
- **"Programming WebAssembly with Rust"** — a good next step once the
  official docs feel too dry, for compiling Rust (and eventually Jeko) to
  the browser.

## Practice and community

- **Exercism.org** — free coding exercises with mentorship, has tracks for
  Rust, C, and many other languages — good for keeping fundamentals sharp
  between big project stages.
- **"Awesome Compilers" list on GitHub** (search "awesome compilers
  github") — a curated list of compiler resources, papers, and toy
  compiler projects to study for extra ideas.
- **r/ProgrammingLanguages and r/rust** — active communities where people
  discuss language design tradeoffs; useful once you have specific design
  questions about Jeko.

---

## How to keep going after these 12 files

1. Re-read `00_START_HERE.md` every few months — your understanding of the
   same diagrams will deepen each time.
2. Keep a running design document for Jeko itself, separate from these
   learning files — record decisions and *why* you made them.
3. When you get stuck on a concept, don't just ask an AI to explain it
   again the same way — ask it to explain the concept using a completely
   different analogy, or ask it to quiz you instead of teach you.
4. Treat Jeko as a project that will take years, built in public stages,
   not something to rush. Every stage above, done properly, is itself a
   respectable standalone project.

Good luck — you're building something genuinely ambitious, and now you have
a real map for it.
