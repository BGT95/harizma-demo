import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookingSteps from '../sections/BookingSteps';
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

describe('BookingSteps', () => {
  it('opens demo notice instead of Telegram when CTA is clicked', async () => {
    const user = userEvent.setup();
    render(<BookingSteps />);

    await user.click(screen.getByRole('button', { name: /открыть чат-бот/i }));

    expect(screen.getByText(SITE.demoNoticeMessage)).toBeInTheDocument();
  });
});
