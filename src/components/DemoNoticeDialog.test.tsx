import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import DemoNoticeDialog from '../components/DemoNoticeDialog';
import { SITE } from '../config/site';

describe('DemoNoticeDialog', () => {
  it('renders demo copy when open', () => {
    render(<DemoNoticeDialog open onOpenChange={() => {}} />);
    expect(screen.getByText(SITE.demoDialogTitle)).toBeInTheDocument();
    expect(screen.getByText(SITE.demoNoticeMessage)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Понятно' })).toBeInTheDocument();
  });
});
