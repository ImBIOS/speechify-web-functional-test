import {
  http,
  HttpResponse,
} from 'msw';

const data = {
  content:
    "<speak><s>This is a sentence.</s><s>This is another sentence</s>Some more text<s>This is a longer piece of content</s></speak>",
};

export const handlers = {
  success: [
    http.get(
      "http://localhost:5174/content",
      ({ request, params, cookies }) => {
        return HttpResponse.json(data);
      }
    ),
  ],

  error: [
    http.get(
      "http://localhost:5174/content",
      ({ request, params, cookies }) => {
        return new HttpResponse(null, { status: 500 });
      }
    ),
  ],
};
