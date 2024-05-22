import { setupWorker } from 'msw/browser';
import {
  beforeAll,
  describe,
  expect,
  it,
} from 'vitest';

import { fetchContent } from '../lib/content';
import { handlers } from './mocks/handlers';

const server = setupWorker();

describe("fetchContent Test Suite", () => {
  beforeAll(() => {
    server.start({ onUnhandledRequest: "error" });
    return () => server.stop();
  });

  it("fetches content from url and returns the content as string", async () => {
    server.use(...handlers.success);
    const content = await fetchContent();
    expect(content).toBeTypeOf("string");
    server.resetHandlers();
  });

  it('returns a fixed error string on failure "<speak><s>There was an error</s></speak>" ', async () => {
    server.use(...handlers.error);
    const content = await fetchContent();
    expect(content).equals("<speak><s>There was an error</s></speak>");
    server.resetHandlers();
  });
});
