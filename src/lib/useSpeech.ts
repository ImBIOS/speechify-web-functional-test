import { useEffect, useState } from "react";

import { PlayingState, SpeechEngineState, createSpeechEngine } from "./speech";

/*
  @description
  Implement a custom useSpeech hook that uses a speech engine defined in 'speech.ts'
  to play the sentences that have been fetched and parsed previously.

  This hook should return react friendly controls for playing, and pausing audio as well as provide information about
  the currently read word and sentence
*/
const useSpeech = (sentences: Array<string>) => {
	const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);
	const [currentWordRange, setCurrentWordRange] = useState<[number, number]>([
		0, 0,
	]);

	const [playbackState, setPlaybackState] = useState<PlayingState>("paused");

	const onBoundary = (e: SpeechSynthesisEvent) => {
		setCurrentWordRange([e.charIndex, e.charIndex + e.charLength]);
	};
	const onEnd = (e: SpeechSynthesisEvent) => {
		const isSentenceNext = currentSentenceIdx < sentences.length;
		if (isSentenceNext) {
			const incremenetedIdx = currentSentenceIdx + 1;
			speechEngine.load(sentences[incremenetedIdx]);
		}
	};
	const onStateUpdate = (state: PlayingState) => {
		setPlaybackState(state);

		if (state === "ended") {
			const isSentenceNext = currentSentenceIdx < sentences.length;
			if (isSentenceNext) {
				setCurrentSentenceIdx((prev) => prev + 1);
				setCurrentWordRange([0, 0]);
			} else {
				setCurrentSentenceIdx(0);
			}
		}
	};

	// Init speechEngine
	const speechEngine = createSpeechEngine({
		onBoundary,
		onEnd,
		onStateUpdate,
	});

	const play = () => {
		speechEngine.load(sentences[currentSentenceIdx]);
		speechEngine.play();
	};
	const pause = () => {
		speechEngine.pause();
		setCurrentWordRange([0, 0]);
	};

	// play opn each ended sentence
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const isSentenceNext = currentSentenceIdx < sentences.length;
		if (playbackState === "ended" && isSentenceNext) {
			play();
		} else {
			speechEngine.cancel();
		}
	}, [currentSentenceIdx]);

	// reset sentence index on each laod new content
	useEffect(() => {
		setCurrentSentenceIdx(0);
	}, []);

	return {
		currentSentenceIdx,
		currentWordRange,
		playbackState,
		play,
		pause,
	};
};

export { useSpeech };
