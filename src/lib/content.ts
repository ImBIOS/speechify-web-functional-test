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
		return e as string;
	}
};

/**
 * Parse the content into sentences, and return an array of sentences. Look at the Readme for sample input and expected output.
 * Avoid using DOMParser for implementing this function.
 */
const parseContentIntoSentences = (content: string) => {};

export { fetchContent, parseContentIntoSentences };
