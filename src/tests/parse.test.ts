import {
  describe,
  expect,
  expectTypeOf,
  it,
} from 'vitest';

import { parseContentIntoSentences } from '../lib/content';

const testCases = [
  {
    name: "Parses ssml with a single correctly formatted sentence",
    content: "<speak><s>This is a sentence.</s></speak>",
    expected: ["This is a sentence."],
  },
  {
    name: "Parses ssml wtih multiple correctly formatted ssml",
    content:
      "<speak><s>This is a sentence.</s><s>This is another sentence</s></speak>",
    expected: ["This is a sentence.", "This is another sentence"],
  },
  {
    name: "Parsed output ignores incorrectly formatted ssml",
    content:
      "<speak><s>This is a sentence.</s><s>This is another sentence</s>Some more text</speak>",
    expected: ["This is a sentence.", "This is another sentence"],
  },
  {
    name: "Parses output ignores incorrectly formatted ssml in between correctly formatted ssml",
    content:
      "<speak><s>This is a sentence.</s><s>This is another sentence</s>Some more text<s>This is a longer piece of content</s></speak>",
    expected: [
      "This is a sentence.",
      "This is another sentence",
      "This is a longer piece of content",
    ],
  },
  {
    name: "Parses correctly formatted ssml and ignores P tags",
    content: `<speak><p><s>This is a sentence.</s><s>This is another sentence.</s><p><speak>`,
    expected: ["This is a sentence.", "This is another sentence."],
  },
];

describe("parseContent Test Suite", () => {
  it("returns an array of sentences", () => {
    const sentences = parseContentIntoSentences(testCases[0].content);
    expectTypeOf(sentences).toBeArray;
  });

  it("throws an error when ssml is invalid i.e does not start with <speak>", () => {
    expect(() => parseContentIntoSentences("This is not valid ssml")).toThrow();
  });

  it.each(testCases)("$name", ({ name, content, expected }) => {
    const sentences = parseContentIntoSentences(content);
    expect(sentences).toEqual(expected);
  });
});
