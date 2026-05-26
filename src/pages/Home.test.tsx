import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Home from './Home';
import { SITE } from '../config/site';

vi.mock('gsap', () => {
  const chain = {
    fromTo: vi.fn().mockReturnThis(),
    to: vi.fn().mockReturnThis(),
  };
  return {
    default: {
      registerPlugin: vi.fn(),
      context: vi.fn(() => ({ revert: vi.fn() })),
      fromTo: vi.fn(),
      to: vi.fn(),
      timeline: vi.fn(() => ({
        defaults: vi.fn().mockReturnThis(),
        ...chain,
      })),
    },
  };
});

vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {},
}));

describe('Home', () => {
  it('renders brand name and phone from SITE', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const names = screen.getAllByText(SITE.name);
    expect(names.length).toBeGreaterThan(0);
    expect(screen.getAllByText(SITE.phone.display).length).toBeGreaterThan(0);
  });
});
