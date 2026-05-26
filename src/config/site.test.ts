import { describe, it, expect } from 'vitest';
import { SITE } from '../config/site';

describe('SITE', () => {
  it('exposes brand and contact fields', () => {
    expect(SITE.name).toBe('harizma');
    expect(SITE.metro).toBe('м. Метро');
    expect(SITE.phone.href).toBe('tel:+79000000000');
    expect(SITE.phone.display).toBe('+79 000 000-00-00');
    expect(SITE.copyrightYear).toBe(2026);
    expect(SITE.locale).toBe('ru_RU');
    expect(SITE.ogImagePath).toBeTruthy();
    expect(SITE.keywords).toContain('harizma');
  });
});
