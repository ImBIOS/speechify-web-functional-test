import { useCallback, useEffect, useState } from "react";
import "./App.css";

import { Controls } from "./components/Controls";
import { CurrentlyReading } from "./components/CurrentlyReading";
import { fetchContent, parseContentIntoSentences } from "./lib/content";
import { useSpeech } from "./lib/useSpeech";

function App() {
	const [sentences, setSentences] = useState<Array<string>>([]);
	const { currentWordRange, currentSentenceIdx, play, pause, playbackState } =
		useSpeech(sentences);

	const loadNewContent = useCallback(async () => {
		const data = await fetchContent();
		const parsedData = parseContentIntoSentences(data);
		setSentences(parsedData);
	}, []);

	// Fetch first data
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		loadNewContent();
	}, []);

	return (
		<div className="App">
			<h1>Text to speech</h1>
			<div>
				<CurrentlyReading
					currentWordRange={currentWordRange}
					currentSentenceIdx={currentSentenceIdx}
					sentences={sentences}
				/>
			</div>
			<div>
				<Controls
					state={playbackState}
					play={play}
					pause={pause}
					loadNewContent={loadNewContent}
				/>
			</div>
		</div>
	);
}

export default App;
