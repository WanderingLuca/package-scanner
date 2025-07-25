import '@testing-library/jest-dom';

// 👇 Mock ResizeObserver for Radix and other UI libs
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  configurable: true,
  value: ResizeObserver,
});
