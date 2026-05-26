import { describe, it, expect } from 'vitest';
import { HALLS } from './halls';

describe('HALLS', () => {
  it('has four halls and hall 4 uses hall-5 image', () => {
    expect(HALLS).toHaveLength(4);
    const hall4 = HALLS.find((h) => h.id === '4');
    expect(hall4?.name).toBe('HALL №4');
    expect(hall4?.image).toBe('/images/hall-5.jpg');
    expect(HALLS.some((h) => h.id === '5')).toBe(false);
  });
});
