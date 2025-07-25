# Technology Decisions & Rationale

This project was built with a focus on performance, developer experience, and scalability. Below is an explanation of the key technologies used and the rationale behind their selection.

## Why Vite + React (and not Next.js)?

For this exercise, a standard client-side React application built with Vite was the most direct and efficient choice. The project requirements call for a "Package Vulnerability Explorer" that fetches data from a public, third-party API, which defines it as a pure Client-Side Application (CSA).

Frameworks like Next.js are powerful, but their primary advantages lie in features that were not needed for this specific problem:

- Server-Side Rendering (SSR) & Static Site Generation (SSG): The application's content is entirely dynamic and dependent on user interaction (selecting an ecosystem and package). There was no requirement for pre-rendered pages for SEO or initial load performance, as the data is fetched live.

- API Routes: The application consumes an existing external API provided by Safety CLI. We did not need to build our own backend endpoints or serverless functions, which is a core feature of Next.js.

- Added Complexity: Using Next.js would introduce additional complexity (e.g., file-based routing, server components) that is unnecessary for a project that functions entirely in the browser.

In summary, Vite provides an extremely fast development environment and a simple, optimized build process that is perfectly suited for creating a client-rendered React application. This choice reflects a pragmatic approach: selecting the right tool for the job without adding unnecessary overhead.

### ⚡ Vite

**Vite** was chosen as the build tool for its blazing-fast development server, instant module hot reloading, and optimized build pipeline. Vite uses native ES modules in development and leverages `esbuild` under the hood for lightning-fast transpilation, making it a perfect fit for modern React projects.

### Radix UI / Radix Themes

**Radix UI** and **Radix Themes** offer a collection of accessible, unstyled primitives and a consistent design system for building high-quality UIs without getting locked into a specific styling approach. This allows full design flexibility while guaranteeing accessibility best practices.

**Radix Themes** were used for styling because:

- They provide a themeable, responsive design layer.
- They enable consistent spacing, typography, and color tokens out of the box.
- Great for projects that aim to scale or integrate design tokens later.

### TanStack Query (React Query)

**TanStack Query** (formerly React Query) was selected to handle all server state logic, including:

- Fetching, caching, and syncing remote data.
- Powerful data transformations via `select` functions.
- Background data refetching and stale state handling.

This eliminated the need for boilerplate API handling logic and provided automatic cache updates, retry behavior, and granular control over request lifecycles. In this project, `React Query` acted as the API layer and remote state manager without needing a dedicated state management library.

### Why No Global State Library (Redux, Zustand, etc.)?

For this scope, a dedicated state management library was unnecessary. The app primarily deals with server state (API data), which is efficiently handled by **TanStack Query**.

If future requirements introduce:

- Cross-component UI state,
- Modal or panel controls,
- Auth session state across modules,

We can extend the architecture using:

- `React Context` for local/global compound state (e.g., filters, UI settings).
- `Redux` or `Zustand` for complex app-wide shared state.
- Compound components pattern to manage scoped shared behavior elegantly.

### react-json-tree

Used to visualize raw API responses in a readable and interactive JSON format. This is especially helpful given that the primary users of the Package Security Scanner are developers who are already familiar with JSON structures. This approach may evolve in the future if a more tailored UI for data presentation is introduced.
