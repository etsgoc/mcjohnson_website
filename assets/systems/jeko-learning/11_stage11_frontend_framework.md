# Stage 11 — A Frontend Framework for Jeko

## Goal of this stage

You already know frontend development well from TypeScript (React-style
apps talking to Supabase). This stage uses that knowledge as a bridge:
you'll learn what a frontend framework actually does under the hood, then
design how Jeko could compile UI code into something a browser (or your own
renderer) can display.

---

## 1. What a frontend framework actually does

Strip away the magic. Every framework (React, Svelte, Vue, SolidJS) solves
the same core problem:

```text
application state  →  ???  →  pixels on screen

when state changes → update ONLY the parts of the screen that changed,
                      not the whole page
```

The `???` is where frameworks differ. Two dominant strategies:

```text
Virtual DOM (React-style)          Fine-grained reactivity (Solid/Svelte-style)
- render whole tree in memory      - track exactly which values a piece
- diff against previous tree         of UI depends on
- apply only the differences to    - when a value changes, update ONLY
  the real DOM                        that exact spot, no diffing needed
```

**Task:** Read the source or a good explainer for one small, real framework
implementation (see resources file for "Build your own React" — a free,
short, very clear article). Don't just read it — retype the key parts by
hand into your own file as you go (typing, not copy-pasting, forces your
brain to actually process each line).
**Expected result:** You can explain, without notes, what a "virtual DOM
diff" actually compares and why it avoids touching the real DOM more than
necessary.

---

## 2. A minimal virtual DOM, built by you

```text
describe UI as data:

{ tag: "div", children: [
    { tag: "h1", text: "Hello" },
    { tag: "p", text: state.count }
]}
```

This is just a tree of plain objects describing what the UI *should* look
like — same shape idea as your compiler's AST from Stage 4, just describing
UI instead of code.

**Task:** In TypeScript (your comfort zone) or your Jeko interpreter, build
a tiny function that takes this kind of tree and turns it into real DOM
elements (or, if working outside a browser, printed indented text
representing the tree). Then build a `diff` function that compares an old
tree to a new tree and produces a small list of changes (e.g. "text of node
X changed from A to B").
**Expected result:** Given two versions of a simple tree where only one
text value changed, your diff function reports exactly that one change —
not "rebuild everything."

---

## 3. Reactivity: signals

Modern frameworks (including SolidJS, and Svelte 5's runes) increasingly
use **signals** — values that know who's "watching" them, and automatically
notify those watchers when they change.

```text
const count = signal(0);

effect(() => {
    print("count is now", count.get());
});

count.set(5);   // automatically re-runs the effect above, printing "count is now 5"
```

```text
signal(count)
   │
   ├── watched by: effect A
   └── watched by: effect B

count.set(new value)
   → notify effect A
   → notify effect B
```

**Task:** Implement a minimal `signal()` and `effect()` in TypeScript (or
Jeko): calling `.set()` on a signal should automatically re-run every
effect that read that signal's value. No framework, no library — just the
core subscribe/notify mechanism.
**Expected result:** Two separate effects that both read the same signal
both re-run automatically when you call `.set()`, and an effect that never
read the signal does NOT re-run — proving your dependency tracking is
actually precise, not just "re-run everything."

---

## 4. Designing Jeko's UI syntax

This is where your language design instincts and this stage meet. Think
about what a `.jeko` UI file should look like, given everything you now
know: it needs to compile down to something like the virtual DOM tree or
signal graph you just built by hand.

```text
possible shape (just an example to react to, not a prescription):

component Counter {
    state count: i32 = 0

    view {
        button(on_click: || count += 1) {
            text("Count: {count}")
        }
    }
}
```

**Task:** Design your own syntax on paper for a simple counter component in
Jeko. Then describe, step by step, what your compiler would need to do to
turn this into either (a) a virtual DOM tree + diffing setup, or (b) a
signal graph like the one you just built. Which approach fits Jeko's
"infer as much as possible" philosophy better, and why?
**Expected result:** A written design doc (even half a page) that shows a
syntax example plus a clear explanation of the compilation strategy you'd
use — this becomes a real design document you can return to when you
start building it for real.

---

## 5. Compiling to the browser: WASM

If Jeko is meant to run real UI in a real browser eventually, it will
likely compile to **WebAssembly (WASM)** — a low-level, portable bytecode
format browsers can run at near-native speed, alongside (or instead of)
JavaScript.

```text
Jeko source
    ↓ your compiler (Stage 4-5 pipeline)
Jeko IR
    ↓ WASM code generation (new backend, alongside any native backend)
.wasm file
    ↓ loaded by the browser
runs in the browser, callable from JS, can manipulate the DOM via
JS interop functions you expose
```

**Task:** Read a short WASM introduction (resources file) and, separately,
compile a trivial Rust function to WASM using existing tools (`wasm-pack`
or similar) and call it from a plain HTML page with a few lines of
JavaScript.
**Expected result:** A webpage where a button click calls into
WASM-compiled code (not JavaScript) and the result shows up on the page —
this is a small proof that "code compiled from a systems language, running
in the browser" is a real, working thing, not a distant dream.

---

## Stage 11 checkpoint

- [ ] You understand virtual DOM diffing vs fine-grained reactivity
- [ ] You built a minimal working diff function
- [ ] You built a minimal working signal/effect system
- [ ] You've designed (on paper) Jeko's own component syntax
- [ ] You've run a real WASM module in a real browser

Next: `12_resources_and_next_steps.md` — where to keep going, forever.
