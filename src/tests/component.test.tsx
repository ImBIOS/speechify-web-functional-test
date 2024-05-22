import React from 'react';

import {
  afterEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import {
  cleanup,
  render,
  screen,
} from '@testing-library/react';

import { Controls } from '../components/Controls';
import { CurrentlyReading } from '../components/CurrentlyReading';

const sentences = [
  "This is a sentence.",
  "This is another sentence.",
  "This is a third sentence.",
];

const wordRange: [number, number] = [0, 4];

describe("Currently Reading Component", () => {
  afterEach(cleanup);
  it("Should render all the sentences", () => {
    render(
      <CurrentlyReading
        currentWordRange={wordRange}
        currentSentenceIdx={0}
        sentences={sentences}
      />
    );

    sentences.forEach((sentence) => {
      expect(
        screen.getByText(sentence, {
          normalizer: (text) => text.trim(),
          exact: false,
        })
      ).toBeDefined();
    });
  });

  it("Should render the current sentence", () => {
    const { rerender } = render(
      <CurrentlyReading
        currentWordRange={wordRange}
        currentSentenceIdx={0}
        sentences={sentences}
      />
    );

    expect(screen.getByTestId("current-sentence")).toBeDefined();
    expect(screen.getByTestId("current-sentence").textContent).toBe(
      sentences[0]
    );

    rerender(
      <CurrentlyReading
        currentWordRange={wordRange}
        currentSentenceIdx={1}
        sentences={sentences}
      />
    );

    expect(screen.getByTestId("current-sentence")).toBeDefined();
    expect(screen.getByTestId("current-sentence").textContent).toBe(
      sentences[1]
    );
  });

  it("Should render the current word", () => {
    const { rerender } = render(
      <CurrentlyReading
        currentWordRange={wordRange}
        currentSentenceIdx={0}
        sentences={sentences}
      />
    );
    const currentWord = screen.getByTestId("current-word");
    expect(currentWord).toBeDefined();
    expect(currentWord.textContent).toBe(sentences[0].slice(0, 4));

    rerender(
      <CurrentlyReading
        currentWordRange={[5, 7]}
        currentSentenceIdx={1}
        sentences={sentences}
      />
    );
    const updatedWord = screen.getByTestId("current-word");
    expect(updatedWord.textContent).toBe(sentences[1].slice(5, 7));
  });
});

describe("Controls Component", () => {
  afterEach(cleanup);
  it("Should render the play/pause button and load new content button", () => {
    const { rerender } = render(
      <Controls
        play={() => {}}
        pause={() => {}}
        loadNewContent={() => {}}
        state="paused"
      />
    );

    expect(screen.getByText("Play")).toBeDefined();
    expect(screen.getByText("Load new content")).toBeDefined();

    rerender(
      <Controls
        play={() => {}}
        pause={() => {}}
        loadNewContent={() => {}}
        state="playing"
      />
    );

    expect(screen.getByText("Pause")).toBeDefined();
  });

  it("Should call the play function when the play button is clicked", () => {
    const play = vi.fn();
    render(
      <Controls
        play={play}
        pause={() => {}}
        loadNewContent={() => {}}
        state="paused"
      />
    );

    screen.getByText("Play").click();
    expect(play).toHaveBeenCalled();
  });

  it("Should call the loadNewContent function when Load new content is clicked", () => {
    const loadNewContent = vi.fn();
    render(
      <Controls
        play={() => {}}
        pause={() => {}}
        loadNewContent={loadNewContent}
        state="paused"
      />
    );

    screen.getByText("Load new content").click();
    expect(loadNewContent).toHaveBeenCalled();
  });

  
  it("Should call the pause function when pause  is clicked", () => {
    const pause = vi.fn();
    render(
      <Controls
        play={() => {}}
        pause={pause}
        loadNewContent={() => {}}
        state="playing"
      />
    );

    screen.getByText("Pause").click();
    expect(pause).toHaveBeenCalled();
  });
});
