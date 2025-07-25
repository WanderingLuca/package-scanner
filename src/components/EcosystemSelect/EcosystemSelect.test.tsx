import { render, screen, fireEvent } from '@testing-library/react';
import EcosystemSelect from './EcosystemSelect';
import { ecosystemOptions } from '../../constants/ecosystem';
import { Theme } from '@radix-ui/themes';

// Mock scrollIntoView for all elements
window.HTMLElement.prototype.scrollIntoView = function () {};

describe('EcosystemSelect', () => {
  it('renders the select trigger with placeholder', () => {
    render(
      <Theme>
        <EcosystemSelect onEcosystemChange={() => {}} />
      </Theme>
    );

    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('shows all ecosystem options when opened', async () => {
    render(
      <Theme>
        <EcosystemSelect onEcosystemChange={() => {}} />
      </Theme>
    );

    const trigger = screen.getByRole('combobox');
    fireEvent.click(trigger);

    for (const option of ecosystemOptions) {
      expect(await screen.findByText(option.label)).toBeInTheDocument();
    }
  });

  it('calls onEcosystemChange with the selected value', async () => {
    const mockOnChange = jest.fn();

    render(
      <Theme>
        <EcosystemSelect onEcosystemChange={mockOnChange} />
      </Theme>
    );

    const trigger = screen.getByRole('combobox');
    fireEvent.click(trigger);

    const firstOption = await screen.findByText(ecosystemOptions[0].label);
    fireEvent.click(firstOption);

    expect(mockOnChange).toHaveBeenCalledWith(ecosystemOptions[0].value);
  });
});
