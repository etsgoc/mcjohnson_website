# Stage 4 — Build Your First Language

## Goal of this stage

Build a tiny, working language — not Jeko yet, just a small practice
language. The goal is to understand the pipeline, not to make something
impressive.

This is where language design and language *implementation* finally meet.

---

## 1. The compiler pipeline

```text
source text
    ↓
Lexer (tokenizer)
    ↓
tokens
    ↓
Parser
    ↓
AST (Abstract Syntax Tree)
    ↓
Semantic analysis (type checking, name resolution)
    ↓
IR (Intermediate Representation)
    ↓
Code generation
    ↓
executable / bytecode
```

Each stage has one job. Keep them separate — this is the single most
important design habit for a compiler, and mixing stages together is the
most common beginner mistake.

---

## 2. Lexer: turning text into tokens

The lexer reads raw characters and groups them into meaningful chunks
called **tokens** — numbers, identifiers, keywords, symbols.

```text
input:   let x = 10 + 20;

tokens:  LET, IDENT("x"), EQUALS, NUMBER(10), PLUS, NUMBER(20), SEMICOLON
```

Think of it like splitting a sentence into words and punctuation, but with
rules about what counts as a valid "word" in your language.

**Task:** Design (on paper) the token types your practice language needs for
a tiny subset: `let`, identifiers, numbers, `+`, `-`, `=`, `;`, `print`,
parentheses. Then implement a lexer that turns a source string into a list
of tokens, and print the list for a few sample inputs.
**Expected result:** Given `let x = 10 + 20; print(x);`, your lexer outputs
a clean, ordered list of tokens matching your token type design — no
characters lost, no tokens merged incorrectly.

---

## 3. Parser: turning tokens into an AST

The parser reads the token list and builds a tree that represents the
*structure* of the program — this tree is the **AST**.

```text
let x = 10 + 20;

AST:

Let
 ├── name: "x"
 └── value:
      Add
       ├── left: Number(10)
       └── right: Number(20)
```

Parsing has real rules about precedence (`*` binds tighter than `+`) and
associativity (does `10 - 5 - 2` mean `(10-5)-2` or `10-(5-2)`?). This is
usually the hardest part of Stage 4 for beginners — expect to redo it a
few times.

**Task:** Implement a parser for your token list that produces an AST for
`let` statements, arithmetic expressions (`+ - * /`), and a `print(...)`
call. Test it on expressions with mixed precedence, like `2 + 3 * 4`.
**Expected result:** Your AST for `2 + 3 * 4` groups the multiplication
*inside* the addition (i.e. `Add(2, Mul(3,4))`), not the other way around —
if it doesn't, your precedence rules are wrong, which is a very common and
very fixable bug.

---

## 4. Semantic analysis (a small taste)

Before running or compiling the AST, you check it makes sense: is every
variable declared before use? Are the types compatible? At this early
stage, keep it minimal — just check that variables exist before they're
used.

```text
let y = x + 1;   // error if x was never declared!
```

**Task:** Add a check that walks your AST and reports an error if a
variable is used before being declared with `let`.
**Expected result:** Running your checker on a program that uses an
undeclared variable prints a clear error message naming the variable and
(ideally) roughly where it appears.

---

## 5. From AST to running code: start with an interpreter

The simplest way to "run" an AST is to **walk the tree and execute it
directly** — this is called a tree-walking interpreter. It's slow compared
to compiling to machine code, but it's the fastest way to get something
*working*, and Jeko itself doesn't need to skip this step.

```text
evaluate(Add(10, 20)) → evaluate(10) + evaluate(20) → 10 + 20 → 30
```

**Task:** Implement a tree-walking interpreter for your AST: it should
support `let` (storing variables), arithmetic, and `print`.
**Expected result:** Running your interpreter on
`let x = 10; let y = 20; print(x + y);` prints `30`.

---

## 6. (Optional stretch) IR and code generation

Once your interpreter works, you can try lowering your AST into a simpler
**IR** — a flat, simplified form that's closer to machine instructions —
and eventually generating real code from it (this connects directly to
Stage 1's assembly work). This is optional for Stage 4; Stage 5 will use
your interpreter, and true code generation returns properly once you study
LLVM basics later (see the resources file).

**Task:** Just read and understand this shape for now — don't implement it
yet:

```text
AST:  Add(Number(10), Number(20))

IR (flat, instruction-like):
  LOAD  10  → t1
  LOAD  20  → t2
  ADD   t1, t2 → t3
  PRINT t3
```

**Expected result:** You can explain, in your own words, why this flatter
form is closer to what a CPU actually does than a tree is.

---

## Stage 4 checkpoint

- [ ] You built a working lexer, parser, AST, and interpreter for a tiny
      language
- [ ] `let x = 10 + 20; print(x);` runs correctly through your pipeline
- [ ] You can explain precedence and why `2 + 3 * 4` must parse as
      `2 + (3 * 4)`
- [ ] You understand (even if you haven't built) what IR is for

Next: `05_stage5_rust_like_features.md` — now you make it look like Jeko.
