import { TextEncoder, TextDecoder } from 'util';
import '@testing-library/jest-dom';

Object.assign(global, { TextDecoder, TextEncoder });

global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
};

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  jest.restoreAllMocks();
});
