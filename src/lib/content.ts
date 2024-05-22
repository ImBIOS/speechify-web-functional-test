const API_URL = "http://localhost:5174/content";

type Content = {
	content: string;
};

/**
 * Fetch the content from the api
 * In case of an error, return content as "<speak><s>There was an error</s></speak>"
 */
const fetchContent = async (url = API_URL): Promise<string> => {
	try {
		const res = await fetch(url);

		const response = (await res.json()) as Content;

		return response.content;
	} catch (e) {
		console.error(e);
		return "<speak><s>There was an error</s></speak>";
	}
};

/**
 * Parse the content into sentences, and return an array of sentences. Look at the Readme for sample input and expected output.
 * Avoid using DOMParser for implementing this function.
 */
const parseContentIntoSentences = (content: string) => {
	if (content.startsWith("<speak>") === false) {
		throw new Error("Invalid SSML");
	}

	const result = content
		.replaceAll("<speak>", "")
		.replaceAll("</speak>", "")
		.replaceAll("<p>", "")
		.replaceAll("</p>", "")
		.split("</s>")
		.slice(0, -1)
		// .reduce((prev, curr, idx, arr) => {
		// 	return curr.slice(curr.lastIndexOf("<s>") ?? 0);
		// }, "");
		.map((sentence) => sentence.slice(sentence.lastIndexOf("<s>") + 3));

	return result;
};

export { fetchContent, parseContentIntoSentences };
