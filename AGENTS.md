<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

## General Rules

- Always use Bun as the package manager. Do not use npm, yarn, or pnpm.
- Always use TypeScript. Avoid plain JavaScript unless explicitly requested.
- Write production-ready code. Do not produce placeholders, mock implementations, or incomplete logic.
- Ensure strict type safety. Avoid using `any` unless absolutely necessary.
- Prefer the most scalable and maintainable solution when multiple approaches exist.
- If the requirement is ambiguous or incomplete, ask clarifying questions before proceeding.
- Do not refactor existing code unless explicitly requested.
- Do not modify unrelated parts of the codebase.
- Do not assume missing context. Ask first.

## Code Quality & Maintainability

- Follow consistent naming conventions and existing project structure.
- Keep functions small, single-purpose, and readable.
- Avoid deeply nested logic; prefer clear and composable abstractions.
- Write code that is easy to test and reason about.
- Include necessary error handling and edge case coverage.

## Project Structure Guidelines

- Follow a simple, scalable structure suitable for low-to-mid scale applications.
- Use the `app/` directory for routing (App Router).
- Keep route-specific logic inside route folders using colocation:
  - `_components/` for UI specific to that route
  - `_hooks/` for local hooks
- Place reusable UI components in `components/ui`.
- Place shared layout components (e.g. Navbar, Layout) in `components/shared`.
- Use `providers/` for global providers and compose them in a single `Providers` component.
- Place reusable hooks in `hooks/`.
- Place infrastructure and integration logic inside `lib/`.
- Avoid placing business logic inside `page.tsx` or `layout.tsx`.

## Solana Integration Rules

- All Solana-related logic must be isolated inside `lib/solana/`.
- Separate concerns:
  - `connection.ts` for RPC connection
  - `wallet.ts` for wallet configuration
  - `helpers.ts` for utility functions
- Do not directly interact with Solana APIs inside components.
- Use hooks (e.g. `use-solana`) to access Solana state in components.
- Use a dedicated provider (`solana-provider.tsx`) to manage global Solana context.

## Theme System Rules

- Implement theme management using a dedicated provider (`theme-provider.tsx`).
- Access theme state via a custom hook (e.g. `use-theme`).
- Do not pass theme via props unnecessarily (avoid prop drilling).

## Hooks Guidelines

- Keep hooks focused and reusable.
- Do not mix UI logic and business logic inside hooks.
- Prefer custom hooks over duplicating logic across components.
- Hooks must follow React rules (top-level only, no conditional calls).

## Dependency Management

- Do not introduce new dependencies unless absolutely necessary.
- Prefer built-in APIs or existing project dependencies.
- If adding a dependency is required, justify the choice.

## Performance & Scalability

- Consider performance implications in all implementations.
- Avoid unnecessary re-renders, heavy computations, and redundant data fetching.
- Use efficient algorithms and data structures.
- Design solutions that scale with increasing data and usage.

## Next.js Rules

- Use App Router (`app/` directory) by default.
- Prefer Server Components unless client-side interactivity is required.
- Use native `fetch` with caching options instead of legacy data fetching methods.
- Follow the latest conventions from the official Next.js documentation.
- Do not use deprecated APIs or patterns.

## Safety & Scope Control

- Only implement what is explicitly requested.
- Do not over-engineer or add speculative features.
- Preserve existing logic unless modification is explicitly required.
- Clearly separate new code from existing code when making changes.

## Testing & Reliability

- Write code that is testable by design.
- When applicable, include basic test cases or validation logic.
- Ensure critical paths are reliable and handle failure scenarios gracefully.

<!-- END:nextjs-agent-rules -->
