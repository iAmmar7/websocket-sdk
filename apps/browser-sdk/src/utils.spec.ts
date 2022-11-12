import { isJson } from './utils';

describe('utils', () => {
  describe('isJson', () => {
    it.each([
      { input: 'test', output: false },
      { input: 1_00, output: false },
      { input: JSON.stringify({ foo: 'bar' }), output: true },
    ])('should return true on json', ({ input, output }) => {
      expect(isJson(input)).toBe(output);
    });
  });
});
