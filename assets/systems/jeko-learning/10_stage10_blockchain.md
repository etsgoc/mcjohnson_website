# Stage 10 — Blockchain

## Goal of this stage

Combine Stage 9 (networking, distributed systems) with cryptography to
build an actual, working blockchain. By this point you should treat this
as an integration project — most of the hard concepts are already behind
you.

```text
             Blockchain node
                    │
        ┌───────────┴───────────┐
        │                       │
     Networking             Cryptography
     (Stage 9)               (this stage)
        │                       │
        ├── TCP/P2P              ├── hashes
        └── serialization        ├── signatures
                    │             └── Merkle trees
             Consensus / VM
                    │
             Storage engine
                    │
              OS / filesystem (Stage 3, 7)
```

---

## 1. Cryptographic hashing

A **hash function** takes any data and produces a fixed-size, seemingly
random fingerprint. The same input always gives the same output, and even
a tiny input change gives a completely different output. Good hash
functions are effectively impossible to reverse.

```text
H("hello")   → 2cf24dba5fb0a30e...
H("hellp")   → completely different output, despite one letter changed
```

**Task:** Use a real hashing library (don't implement SHA-256 yourself yet
— use one from your host language, e.g. Rust's `sha2` crate) to hash a few
strings and confirm: same input → same hash, tiny change → totally
different hash.
**Expected result:** You've seen the "avalanche effect" (small input
change, huge output change) with your own eyes, on your own data.

---

## 2. Blocks and chains

```text
Block
 ├── previous_hash   ← hash of the block before this one
 ├── timestamp
 ├── transactions
 └── nonce            ← a number miners adjust to satisfy the puzzle (below)

Block 1 ──hash──► Block 2 ──hash──► Block 3
(previous_hash    (previous_hash    (previous_hash
 = genesis)        = H(Block1))      = H(Block2))
```

Because each block includes the *hash* of the one before it, changing any
past block changes its hash, which breaks every block after it — this is
where blockchain's tamper-resistance actually comes from.

**Task:** Define a `Block` struct with the fields above. Write a function
that computes a block's hash (hash of its serialized contents from Stage
9). Build a small chain of 3-4 blocks, each correctly referencing the
previous block's hash.
**Expected result:** If you change any field in an earlier block, and
recompute, the hash no longer matches what later blocks expect — you can
detect the tampering programmatically by re-verifying the chain.

---

## 3. Merkle trees

Instead of hashing all transactions in a block as one long blob, blockchain
systems build a **Merkle tree** — hashes of hashes — so you can prove a
single transaction is included in a block without needing every other
transaction.

```text
          root
         /    \
       H12    H34
       / \    / \
      H1 H2  H3 H4
      │   │   │   │
      T1  T2  T3  T4  (transactions)
```

**Task:** Implement a Merkle tree builder for a list of transactions
(hash pairs together repeatedly until you reach one root hash). Then
implement a "proof of inclusion" — given one transaction, produce the
minimum set of sibling hashes needed to recompute the root and confirm that
transaction was included.
**Expected result:** Given `T2`, your proof (e.g. `H1` and `H34`) lets you
recompute the same root hash as the full tree, without needing `T1`, `T3`,
or `T4` directly.

---

## 4. Digital signatures

A **key pair** (private + public key) lets you prove you authorized a
transaction, without revealing your private key. Others can verify your
signature using only your public key.

```text
transaction data
        │
        │  sign with private key
        ▼
   signature
        │
        │  anyone can verify using the public key
        ▼
  valid / invalid
```

**Task:** Use a real signing library (e.g. Rust's `ed25519-dalek`) to
generate a key pair, sign a transaction, and verify the signature. Then
deliberately tamper with the transaction data after signing and confirm
verification now fails.
**Expected result:** Verification succeeds on the original signed data and
fails the moment you change even one byte of it.

---

## 5. Consensus: a simple proof-of-work

Recall Stage 9's problem: plain majority voting breaks down if nodes can
lie. **Proof-of-work** solves a related problem — making it *expensive* to
propose blocks, so an attacker would need more computing power than
everyone else combined to rewrite history.

```text
find a nonce such that:
   H(block_header + nonce)  starts with N zero bits

this requires trying many nonces (expensive) but verifying
a found solution is instant (cheap) — that asymmetry is the whole trick
```

**Task:** Implement a simple proof-of-work: given a block, search for a
nonce value such that the block's hash starts with a chosen number of zero
bits (start small — 8-12 bits, or it'll take a long time). Measure how long
it takes as you increase the difficulty.
**Expected result:** You see mining time grow roughly exponentially as you
increase the required number of leading zero bits, giving you a felt sense
of why proof-of-work is "expensive to do, cheap to check."

**Note on proof-of-stake:** worth reading about (see resources file) even
if you don't implement it — instead of computing power, validators put up
economic stake as collateral, and can lose it for dishonest behavior. It's
the mechanism most newer blockchains use instead of proof-of-work, mainly
for energy efficiency.

---

## 6. Putting it all together: a minimal blockchain node

**Task (capstone for this stage):** Combine everything: a node that (a)
maintains a chain of blocks with Merkle-tree transaction roots, (b) accepts
signed transactions from a simple CLI or script, (c) mines new blocks with
your proof-of-work, (d) broadcasts new blocks to peer nodes over your
Stage 9 P2P network, and (e) rejects invalid chains from peers (wrong
hashes, insufficient proof-of-work, or invalid signatures).
**Expected result:** Running 2-3 node instances, a transaction submitted to
one node eventually appears mined into a block that all other nodes accept
and agree on — and if you manually corrupt a block on one node, the other
nodes reject it when it's broadcast, instead of accepting bad data.

---

## Stage 10 checkpoint

- [ ] You understand and have used real cryptographic hashing and signing
- [ ] You built a tamper-evident chain of blocks
- [ ] You built a Merkle tree with inclusion proofs
- [ ] You implemented a working proof-of-work miner
- [ ] You have a minimal multi-node blockchain that rejects invalid data

Next: `11_stage11_frontend_framework.md` — the last major piece: Jeko's own
UI layer.
