import '@testing-library/jest-dom';

const util = require('util');
const { TextEncoder, TextDecoder } = util;

Object.assign(global, { TextDecoder, TextEncoder });

// Set up window.TextEncoder/TextDecoder
if (typeof window !== 'undefined') {
  window.TextEncoder = TextEncoder;
  window.TextDecoder = TextDecoder;
}

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({})
  })
) as jest.Mock;
