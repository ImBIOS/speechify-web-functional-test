import {
  describe,
  expect,
  it,
} from 'vitest';

import {
  act,
  renderHook,
} from '@testing-library/react';

import { useSpeech } from '../lib/useSpeech';

describe("useSpeech Test Suite", () => {
  it("should return current sentence idx and current word range as well as playback state", () => {
    const sentences = ["This is a sentence.", "This is another sentence."];
    const { result } = renderHook(() => useSpeech(sentences));
    expect(result.current.currentSentenceIdx).toBe(0);
    expect(result.current.currentWordRange).toEqual([0, 0]);
    expect(result.current.playbackState).toBe("paused");
  });
});
