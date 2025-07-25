// PackagesTable.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import PackagesTable from './PackagesTable';
import { Theme } from '@radix-ui/themes';

// Mock the hook
jest.mock('../../hooks/useFetchPackages', () => ({
  useFetchPackages: jest.fn(),
}));

import { useFetchPackages } from '../../hooks/useFetchPackages';

describe('PackagesTable', () => {
  const setSelectedPackage = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state', () => {
    (useFetchPackages as jest.Mock).mockReturnValue({
      isLoading: true,
      isError: false,
      data: undefined,
      error: null,
    });

    render(
      <Theme>
        <PackagesTable
          ecosystem='npm'
          setSelectedPackage={setSelectedPackage}
        />
      </Theme>
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('renders error state', () => {
    (useFetchPackages as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: true,
      data: undefined,
      error: {
        message: 'Failed to fetch packages',
        name: 'FetchError',
        status: 500,
      },
    });

    render(
      <Theme>
        <PackagesTable
          ecosystem='npm'
          setSelectedPackage={setSelectedPackage}
        />
      </Theme>
    );

    expect(screen.getByText(/Failed to fetch packages/i)).toBeInTheDocument();
  });

  it('renders table with packages and handles analyze button click', () => {
    (useFetchPackages as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      error: null,
      data: {
        packages: [
          { id: 'pkg-1', name: 'react', display_name: 'React' },
          { id: 'pkg-2', name: 'lodash', display_name: 'Lodash' },
        ],
        total: 2,
      },
    });

    render(
      <Theme>
        <PackagesTable
          ecosystem='npm'
          setSelectedPackage={setSelectedPackage}
        />
      </Theme>
    );

    expect(screen.getByText(/react/i)).toBeInTheDocument();
    expect(screen.getByText(/lodash/i)).toBeInTheDocument();

    fireEvent.click(screen.getAllByText(/analyze/i)[0]);

    expect(setSelectedPackage).toHaveBeenCalledWith('react');
  });

  it('disables Previous button on first page', () => {
    (useFetchPackages as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      error: null,
      data: { packages: [], total: 0 },
    });

    render(
      <Theme>
        <PackagesTable
          ecosystem='npm'
          setSelectedPackage={setSelectedPackage}
        />
      </Theme>
    );

    expect(screen.getByText('Previous')).toBeDisabled();
    expect(screen.getByText('Next')).toBeEnabled();
  });
});
