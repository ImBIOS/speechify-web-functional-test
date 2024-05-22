import { useState } from "react";

import { PlayingState, createSpeechEngine } from "./speech";

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
		console.log("onBoundary", e);

		setCurrentWordRange([e.charIndex, e.charIndex + e.charLength]);
	};
	const onEnd = (e: SpeechSynthesisEvent) => {
		console.log("onEnd", e);

		const isSentenceNext = currentSentenceIdx < sentences.length;
		if (isSentenceNext) {
			const incremenetedIdx = currentSentenceIdx + 1;
			speechEngine.load(sentences[incremenetedIdx]);
			// speechEngine.play();
		}
	};
	const onStateUpdate = (state: PlayingState) => {
		console.log("onStateUpdate", state);
		setPlaybackState(state);

		if (state === "ended") {
			const isSentenceNext = currentSentenceIdx < sentences.length;
			console.log(currentSentenceIdx, sentences.length);
			if (isSentenceNext) {
				console.log("there's still sentences left", isSentenceNext);

				setCurrentSentenceIdx((prev) => prev + 1);
				setCurrentWordRange([0, 0]);
			} else {
				speechEngine.cancel();
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
	};

	return {
		currentSentenceIdx,
		currentWordRange,
		playbackState,
		play,
		pause,
	};
};

export { useSpeech };
