/**
 * Implement the CurrentlyReading component here
 * This component should have the following,
 * - A container tag with text containing all sentences supplied
 * - A p tag containing the current sentence with testID "current-sentence"
 * - A span tag inside the p tag containing the current word with testID "current-word"
 *
 * See example.gif for an example of how the component should look like, feel free to style it however you want as long as the testID exists
 */
export const CurrentlyReading = ({
	currentWordRange,
	currentSentenceIdx,
	sentences,
}: {
	currentWordRange: [number, number];
	currentSentenceIdx: number;
	sentences: string[];
}) => {
	const sentencesStr = sentences.join(" ");

	const currentSentenceStr = sentences[currentSentenceIdx] ?? "";
	const currentSentenceStartStr = currentSentenceStr.slice(
		0,
		currentWordRange[0],
	);
	const currentSentenceEndStr = currentSentenceStr.slice(currentWordRange[1]);
	const currentSentenceReadStr = currentSentenceStr.slice(
		currentWordRange[0],
		currentWordRange[1],
	);

	return (
		<div>
			<h2 data-testid="current-sentence">
				{currentSentenceStartStr}
				<span style={{ color: "red" }} data-testid="current-word">
					{currentSentenceReadStr}
				</span>
				{currentSentenceEndStr}
			</h2>
			<p>{sentencesStr}</p>
		</div>
	);
};
