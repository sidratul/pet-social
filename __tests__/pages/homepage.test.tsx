import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Homepage } from '@/containers/Hompege';

describe('Home', () => {
  it('renders homepage', () => {
    render(<Homepage />);

    const heading = screen.getByRole('heading', {
      name: /Please Add Favorite Dog Breed/i,
    });

    expect(heading).toBeInTheDocument();
  });
});

