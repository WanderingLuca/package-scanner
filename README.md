# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh (✅ Used In this project)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

<br/>
<br/>

# React + TypeScript + Vite – Vulnerability Viewer App

This project provides a fast, modern React application setup using [Vite](https://vitejs.dev/), [TypeScript](https://www.typescriptlang.org/), and [Radix UI](https://www.radix-ui.com/). It is designed to display vulnerability data for npm packages using a customizable UI.

---

### Technologies Used

```bash
React + TypeScript
TanStack Query – API communication and caching
Vite
Radix UI / Theme
Jest + Testing Library
ESLint & Type-aware linting
react-json-tree (mocked in tests)
```

## Additional Documentation

- [Technology Decisions & Rationale](./TECHNOLOGY-DECISIONS.md)

## Getting Started

To run this app locally:

### **Install Node.js**

- Use **Node.js version 22 or higher**.
- We recommend using [nvm](https://github.com/nvm-sh/nvm) to manage versions:

```bash
nvm install 22.12.0
nvm use 22.12.0
```

### Install Dependencies

```bash
npm install
```

### Run the App

```bash
npm run dev
```

### Running Tests

```bash
npm run test

// Generate Test Coverage Report
npm run coverage
```

### Testing Strategy

This project uses React Testing Library (RTL) as the primary tool for component and integration testing.

#### Why React Testing Library?

React Testing Library focuses on testing components the way users interact with them, rather than testing internal implementation details like component methods or state. This leads to tests that are more robust, maintainable, and aligned with real-world usage.

Key Benefits:

- User-Centric Testing
  RTL encourages you to write tests that reflect how users interact with your app (e.g., clicking buttons, filling out forms, reading text), not how components are implemented internally.

- Reduces Fragile Tests
  By avoiding reliance on class names, component internals, or mocked state, your tests become less likely to break when UI code is refactored.

- Better Coverage of Accessibility & Semantics
  RTL promotes querying elements by accessible roles, labels, and text content—ensuring your UI is testable and accessible.

- Great for Integration Tests
  RTL is ideal for testing how components work together (e.g., form inputs + API calls + UI feedback), not just isolated logic.

When Function-Level Testing Is Still Useful
Although RTL is preferred for testing user behavior, there may still be use cases for unit testing pure functions, like:

- Data transformation logic
- Utility functions
- Business rules not tied to UI
- For those, standard vitest or jest test cases are used outside of component tests.

### Test Coverage

| File                                 | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s |
| ------------------------------------ | ------- | -------- | ------- | ------- | ----------------- |
| All files                            | 90.47   | 95.45    | 69.23   | 95      |
| src/components/EcosystemSelect       | 100     | 100      | 100     | 100     |
| EcosystemSelect.tsx                  | 100     | 100      | 100     | 100     |
| src/components/Header                | 100     | 100      | 100     | 100     |
| Header.tsx                           | 100     | 100      | 100     | 100     |
| src/components/PackagesTable         | 75      | 100      | 50      | 85.71   | 75-80             |
| src/components/VulnerabilitiesViewer | 100     | 92.85    | 100     | 100     | 33                |
| src/constants                        | 100     | 100      | 100     | 100     |
| ecosystem.ts                         | 100     | 100      | 100     | 100     |
| test/mocks                           | 100     | 100      | 100     | 100     |
| fileMock.js                          | 100     | 100      | 100     | 100     |

### Project Structure

```bash
src/
├── components/ # React components
│ ├── EcosystemSelect/
│ ├── Header/
│ ├── PackagesTable/
│ └── VulnerabilitiesViewer/
├── constants/ # Static configuration (ecosystems, etc.)
├── hooks/ # Custom React hooks
├── pages/ # Pages - For Router configuration
│ ├── HomePage/
├── assets/ # Static assets (e.g. images)
test/
└── mocks/ # Jest/asset mocks
```

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

- [More Information](./ESLINT.md)

<br />
<br />

# Trade-offs made due to time constraints

- Components and tests were generated using AI (GPT-4o and Claude 3.5, both available in VS Code).
- Fetch hooks were designed following TanStack Query best practices and generated with the help of AI, using documentation as reference.
- Tests for the hooks were not included due to time constraints.
- Interfaces and types could be separated into their own small library, potentially auto-generated from Swagger.
- A proper UI color palette and more structured, standardized UI components (e.g., using styled-components) were not implemented.

# What you would improve with more time

1. Pagination, Infinite Scroll or Virtualization
   The current implementation loads up to 100 vulnerabilities at once.
   With more time:
   Implement proper pagination or infinite scroll using TanStack Query’s useInfiniteQuery.
   For large datasets, add virtualized lists (e.g., react-virtual) to maintain UI responsiveness.

P.S. The current API does not support pagination. Although limit and offset parameters are available, they return the same data regardless of the values provided.

2. Full Accessibility (a11y) Audit. Use tools like axe-core or Lighthouse to audit accessibility. Ensure all interactive elements are keyboard-navigable and screen-reader-friendly. Add focus management for dynamic content.

3. Filter/Sort State Persistence. Store selected filters or sort orders in URL query params or localStorage to preserve state on refresh or share.

4. Unit & Edge Case Test Coverage. Add more edge case tests: error boundaries, empty states, retry behavior, long package names, missing fields, etc.
   Add integration tests to simulate real-world flows like “Select Ecosystem → View Packages → See Vulnerabilities”.

5. Better Error Handling & User Feedback. Add toast notifications or banners for API errors and loading retries.

6. UI Polish & Skeleton States. Add loading skeletons instead of spinners to improve perceived performance. Refine spacing, responsiveness, and empty states (e.g., “No vulnerable packages found”).

7. Modular Design for Team Scalability. Introduce feature folders and service layer abstraction (e.g., api/ or services/) for easier scale and testing. Introducing Routing and lazy loading.
   Prepare the ground for React Context or state libraries (Redux/Zustand) only if cross-module state grows.

8. Deployment & CI. Add basic CI setup with GitHub Actions: linting, testing, and build verification.
