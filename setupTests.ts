import { TextEncoder, TextDecoder } from 'util';
import '@testing-library/jest-dom';

Object.assign(global, { TextDecoder, TextEncoder });

global.console = {
  ...console,
  error: jest.fn(),
};

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  jest.restoreAllMocks();
});
