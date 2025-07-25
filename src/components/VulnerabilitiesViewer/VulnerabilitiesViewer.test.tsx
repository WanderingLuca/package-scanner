import React from 'react';
import { render, screen } from '@testing-library/react';
import VulnerabilitiesViewer from './VulnerabilitiesViewer';
import { Theme } from '@radix-ui/themes';

jest.mock('react-json-tree', () => ({
  JSONTree: () => <div data-testid='json-tree'>Mocked JSONTree</div>,
}));

const renderWithTheme = (ui: React.ReactElement) => render(<Theme>{ui}</Theme>);

describe('VulnerabilitiesViewer', () => {
  it('shows loading state', () => {
    renderWithTheme(
      <VulnerabilitiesViewer data={undefined} isLoading={true} error={null} />
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('shows error state', () => {
    renderWithTheme(
      <VulnerabilitiesViewer
        data={undefined}
        isLoading={false}
        error={{ message: 'Failed to fetch', status: 500, name: '' }}
      />
    );

    expect(screen.getByText(/error: failed to fetch/i)).toBeInTheDocument();
  });

  it('shows empty state when no data and no error', () => {
    renderWithTheme(
      <VulnerabilitiesViewer data={undefined} isLoading={false} error={null} />
    );

    expect(
      screen.getByText(/select a package to view vulnerabilities/i)
    ).toBeInTheDocument();
  });

  it('renders vulnerabilities data', () => {
    const mockData = {
      vulnerabilities: [
        {
          safety_id: 'SFTY-20250211-65565',
          summary:
            'Ash Authentication has flawed token revocation checking logic',
          risk_type: 'vulnerability',
          legacy_safety_id: null,
          first_patched_versions: ['4.4.9'],
          vulnerable_version_ranges: ['>= 4.1.0, < 4.4.9'],
          cvss_score: null,
        },
      ],
    };

    renderWithTheme(
      <VulnerabilitiesViewer data={mockData} isLoading={false} error={null} />
    );

    expect(
      screen.getByText(/safety id: SFTY-20250211-65565/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/ash authentication has flawed token/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/response:/i)).toBeInTheDocument();
  });

  it('renders "No Id" and "No description" fallbacks when data is missing', () => {
    const mockData = {
      vulnerabilities: [
        {
          safety_id: '',
          summary: '',
          risk_type: 'vulnerability',
          legacy_safety_id: null,
          first_patched_versions: [],
          vulnerable_version_ranges: [],
          cvss_score: null,
        },
      ],
    };

    renderWithTheme(
      <VulnerabilitiesViewer data={mockData} isLoading={false} error={null} />
    );

    expect(
      screen.getByText(/safety id: no id for this vulnerability/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/no description/i)).toBeInTheDocument();
  });

  it('renders "detail" message if present in data', () => {
    const mockData = {
      detail: 'Custom detail message from server',
      vulnerabilities: [],
    };

    renderWithTheme(
      <VulnerabilitiesViewer data={mockData} isLoading={false} error={null} />
    );

    expect(
      screen.getByText(/custom detail message from server/i)
    ).toBeInTheDocument();
  });
});
