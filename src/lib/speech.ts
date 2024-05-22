export type SpeechEngineOptions = {
  onBoundary: (e: SpeechSynthesisEvent) => void;
  onEnd: (e: SpeechSynthesisEvent) => void;
  onStateUpdate: (state: PlayingState) => void;
};

export type PlayingState = "initialized" | "playing" | "paused" | "ended";

export type SpeechEngineState = {
  utterance: SpeechSynthesisUtterance | null;
  config: {
    rate: number;
    volume: number;
    voice: SpeechSynthesisVoice;
  };
};

export type SpeechEngine = ReturnType<typeof createSpeechEngine>;

/**
 * This speech engine is meant to be a simple adapter for using speech synthesis api.
 * This should generally be left for the candidate to use as the speech synthesis apis have a few nuances
 * that the candidate might not be familiar with.
 */
const createSpeechEngine = (options: SpeechEngineOptions) => {
  const state: SpeechEngineState = {
    utterance: null,
    config: {
      rate: 1,
      volume: 1,
      voice: window.speechSynthesis.getVoices()[0],
    },
  };

  window.speechSynthesis.onvoiceschanged = (e) => {
    state.config.voice = speechSynthesis.getVoices()[0];
  };

  const load = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = state.config.rate;
    utterance.volume = state.config.volume;
    utterance.voice = state.config.voice;
    // set up listeners
    utterance.onboundary = (e) => options.onBoundary(e);
    utterance.onend = (e) => {
      options.onStateUpdate("ended");
      options.onEnd(e);
    };

    // set it up as active utterance
    state.utterance = utterance;
  };

  const play = () => {
    if (!state.utterance) throw new Error("No active utterance found to play");
    state.utterance.onstart = () => {
      console.log('waiting for onstart')
      options.onStateUpdate("playing");
    };
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(state.utterance);
  };

  const pause = () => {
    options.onStateUpdate("paused");
    window.speechSynthesis.pause();
  };
  const cancel = () => {
    options.onStateUpdate("initialized");
    window.speechSynthesis.cancel();
  };

  return {
    state,
    play,
    pause,
    cancel,
    load,
  };
};

export { createSpeechEngine };
