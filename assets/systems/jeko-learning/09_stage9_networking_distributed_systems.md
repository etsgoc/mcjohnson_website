# Stage 9 — Networking, Concurrency & Distributed Systems

## Goal of this stage

This is the bridge to blockchain. Blockchain is not primarily a compiler
topic — it's built from networking, cryptography, and distributed systems
ideas. This stage builds those foundations.

```text
              BLOCKCHAIN (Stage 10)
                   │
     ┌─────────────┼──────────────┐
     │             │              │
 Networking     Crypto        Distributed
  (this stage)  (Stage 10)      systems
                                (this stage)
```

---

## 1. TCP vs UDP

```text
TCP                              UDP
- connection-based               - connectionless
- guarantees delivery & order    - no guarantees
- slower, reliable               - faster, unreliable
- used by: HTTP, blockchains      - used by: video calls, some games
```

You touched TCP already in Stage 2 (the echo server) and Stage 7 (`net`
std module). Now you'll use it for something closer to real distributed
communication.

---

## 2. Serialization

Before you can send data over a network, you must turn it into bytes in a
way both sides agree on — this is **serialization**, and it must be
**deterministic** (the same data always produces the exact same bytes) for
things like blockchain, where two nodes must agree on what a block "is."

```text
struct Block {
    previous_hash: [u8; 32],
    timestamp: u64,
    transactions: Vec<Transaction>,
    nonce: u64,
}
        ↓ serialize
[bytes: 0x1a 0x3f 0x00 0x02 ...]
        ↓ send over network
        ↓ deserialize on the other side
struct Block { ... }  ← identical to the original
```

**Task:** Write a function (in your language or Rust as a stand-in) that
serializes a simple struct into bytes, and a matching function that
deserializes those bytes back into an identical struct. Run it round-trip
(serialize, then deserialize) and confirm the result matches the original
exactly.
**Expected result:** `original == deserialize(serialize(original))` is
true for several different sample structs, including ones with nested data
like a `Vec` of items.

---

## 3. Peer-to-peer (P2P) networking

Unlike a normal client-server app (like your Supabase apps, where all
clients talk to one central server), a **P2P network** has every node able
to talk to many others directly, with no single central authority.

```text
Node A ←────→ Node B
  ↕             ↕
Node C ←────→ Node D
```

**Task:** Build a small program where multiple instances of the same
program (each a "node") can connect to each other over TCP and broadcast a
simple text message to all peers they know about.
**Expected result:** Running 3-4 instances on your machine (different
ports), a message typed into one instance appears in all the others.

---

## 4. Concurrency in a networked program

A real P2P node must do several things "at once": accept new connections,
receive messages from existing peers, and handle its own local work — all
without one slow peer blocking everything else. This connects directly to
Stage 7's threads, plus (increasingly common in real systems) an
**async/event-loop** model as an alternative to one-thread-per-connection.

```text
node event loop
   ├── new connection arrives  → handle it
   ├── message from peer A     → handle it
   ├── message from peer B     → handle it
   └── timer tick               → do periodic work
```

**Task:** Extend your P2P program from above so each connected peer is
handled independently (via a thread per peer, or an event loop — either is
fine for learning), and confirm one slow/misbehaving peer doesn't freeze
the whole node.
**Expected result:** You can simulate a "slow peer" (e.g. one that
deliberately sleeps before responding) and confirm messages from other
peers still get processed promptly.

---

## 5. Distributed systems: the hard problems

This is the conceptual core that blockchain sits on top of.

- **Consensus**: how do multiple independent nodes agree on one shared
  truth (e.g. "what is the next block"), when they can't fully trust each
  other and messages can be delayed or lost?
- **Replication**: keeping the same data copied correctly across many
  nodes.
- **Byzantine faults**: some nodes might be actively malicious, not just
  offline — a much harder problem than "assume everyone is honest but
  might crash."
- **Network partitions**: what happens when the network splits and two
  groups of nodes can't talk to each other for a while?
- **Leader election**: some consensus systems pick one node to propose the
  next update; how do they agree on who that is?
- **Finality**: at what point is a decision "final" and can never be
  undone?

```text
Node A: "I think block X is next"
Node B: "I think block Y is next"
Node C: "I think block X is next"
Node D: (offline, no vote)

→ majority says X → X becomes the agreed next block
```

**Task:** No code yet — read about a simple consensus idea (majority
voting is enough for now; you'll refine this in Stage 10). Simulate it on
paper: 5 nodes, each independently "votes" for one of two options, and you
determine the outcome using simple majority. Then simulate what happens if
one node is malicious and lies about what it received from others.
**Expected result:** You can explain, in plain words, why "just trust
whatever the majority says" starts to break down once nodes might lie, and
why real systems need more than plain majority voting to be safe against
that (this sets up the "why proof-of-work / proof-of-stake exist" question
for Stage 10).

---

## Stage 9 checkpoint

- [ ] You understand TCP vs UDP and when to use each
- [ ] You can serialize/deserialize data deterministically
- [ ] You've built a basic P2P broadcast program
- [ ] Your P2P node handles multiple peers concurrently without blocking
- [ ] You can explain consensus, Byzantine faults, and why simple majority
      voting isn't enough on its own

Next: `10_stage10_blockchain.md`
