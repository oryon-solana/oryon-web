# Oryon — Cross-Merchant Points Swap

**Solana Colosseum Hackathon submission** · Frontend web app for the Oryon protocol.

Oryon enables users to swap loyalty points across different merchants on Solana. Instead of letting points sit unused in one merchant's ecosystem, users can convert them into another merchant's points at a defined exchange rate — all on-chain, non-custodial, via a single transaction.

---

## What it does

- Connect a Phantom wallet
- Select a **from** merchant and a **to** merchant
- Input the amount of points to swap
- Confirm the transaction — the program burns the source tokens and mints the destination tokens atomically
- Each merchant's backend is notified via webhook with the user's updated point balance

---

## How it works

### On-chain

The swap is executed by an Anchor program deployed on Solana Devnet. The `convert_points` instruction:

1. Burns `amount` of the user's from-merchant SPL tokens
2. Mints the equivalent `toAmt` (based on the exchange rate) of the to-merchant SPL tokens to the user

Each merchant is represented by a `MerchantState` PDA that holds the points mint address, earn rate, and point IDR value. The frontend reads these accounts directly from the chain to populate the swap UI.

### Webhook notification

After a transaction is confirmed, Oryon notifies each merchant's backend:

| Target | `points` field |
|---|---|
| From merchant | `current_balance - amount_swapped` |
| To merchant | `current_balance + amount_received` |

This lets merchant backends stay in sync without polling the chain.

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4, shadcn/ui |
| Wallet | Phantom React SDK |
| Solana | `@solana/web3.js`, `@solana/spl-token` |
| Network | Solana Devnet |

---

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variable

```env
NEXT_PUBLIC_PROGRAM_ID=<your deployed Anchor program ID>
```

If omitted, defaults to `39Vs9sUx7gUY29PQtbKewaXaHQQnEHhqxyZ8kc7hoJQw`.

---

## Project structure

```
src/features/swap/
├── components/      # UI components (SwapCard, SwapModal, BrandDropdown)
├── hooks/           # useSwap, useWalletBalances, useMerchants
├── lib/
│   ├── convertPoints.ts   # builds & sends the on-chain transaction + webhooks
│   ├── merchants.tsx      # fetches & decodes MerchantState PDAs
│   ├── rates.ts           # exchange rate calculation
│   ├── webhooks.ts        # merchant pubkey → webhook URL mapping
│   └── brands.tsx         # brand helpers
└── types.ts
```
