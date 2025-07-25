import { render, screen } from '@testing-library/react';
import Header from './Header';
import { Theme } from '@radix-ui/themes';

describe('Header', () => {
  it('renders the logo image with correct alt text and link', () => {
    render(
      <Theme>
        <Header />
      </Theme>
    );

    // Check that the image with alt 'Vite logo' is in the document
    const logoImg = screen.getByAltText('safety logo');
    expect(logoImg).toBeInTheDocument();

    // Check image src contains 'safety.png' (the imported image)
    expect(logoImg).toHaveAttribute('src', 'test-file-stub');

    // Check that the image is wrapped in a link with correct href and target
    const link = logoImg.closest('a');
    expect(link).toHaveAttribute('href', 'https://www.getsafety.com/cli');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('renders the heading with correct text', () => {
    render(
      <Theme>
        <Header />
      </Theme>
    );

    expect(screen.getByRole('heading')).toHaveTextContent(
      'Safety Platform Package Scanner'
    );
  });
});
