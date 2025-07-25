// Why this pattern?
// It centralizes the source of truth for ecosystem strings and their display names.
// The Ecosystem object + Ecosystem type enforce type safety across your code.
// The ecosystemOptions array is perfect for components like Radix UI Select or any dropdown where you want to show readable labels but keep strict values internally.
// Helps prevent bugs from typos in string literals.

export const Ecosystem = {
  ACTIONS: 'actions',
  COMPOSER: 'composer',
  ERLANG: 'erlang',
  GO: 'go',
  MAVEN: 'maven',
  NPM: 'npm',
  NUGET: 'nuget',
  PUB: 'pub',
  PYPI: 'pypi',
  RUBYGEMS: 'rubygems',
  RUST: 'rust',
  SWIFT: 'swift',
} as const;

// Type for Ecosystem constants type
// To be used like, Ecosystem = 'actions' | 'composer' | 'erlang' | 'go' | 'maven' | 'npm' | 'nuget' | 'pub' | 'pypi' | 'rubygems' | 'rust' | 'swift';
export type Ecosystem = (typeof Ecosystem)[keyof typeof Ecosystem];

// Helper type for Radix UI Select
export type EcosystemOption = {
  value: Ecosystem;
  label: string;
};

// Options array for Radix UI Select
export const ecosystemOptions: EcosystemOption[] = [
  { value: Ecosystem.ACTIONS, label: 'GitHub Actions' },
  { value: Ecosystem.COMPOSER, label: 'PHP Composer' },
  { value: Ecosystem.ERLANG, label: 'Erlang' },
  { value: Ecosystem.GO, label: 'Go Modules' },
  { value: Ecosystem.MAVEN, label: 'Java Maven' },
  { value: Ecosystem.NPM, label: 'JavaScript NPM' },
  { value: Ecosystem.NUGET, label: '.NET NuGet' },
  { value: Ecosystem.PUB, label: 'Dart Pub' },
  { value: Ecosystem.PYPI, label: 'Python PyPI' },
  { value: Ecosystem.RUBYGEMS, label: 'Ruby Gems' },
  { value: Ecosystem.RUST, label: 'Rust Cargo' },
  { value: Ecosystem.SWIFT, label: 'Swift Package Manager' },
];
