import { create } from "zustand";
import calculateIncorrectChars from "../utils/calculateIncorrectChars";
import { generateWords } from "../utils/generateWords";

const DEFAULT_WORD_COUNT = 15; // 15 words length on app start
const DEFAULT_DURATION = 15; // 15 seconds round on app start
const TIMER_SPEED = 1000; // 1 second delay

interface StoreState {
  displayText: string;
  inputText: string;
  startTime: number | null;
  cursorPosition: number;
  endTime: number | null;
  timer: number;
  selectedDuration: number;
  isTestStarted: boolean;
  wpm: number | null;
  isResultsVisible: boolean;
  isInputDisabled: boolean;
  incorrectChars: number;
  intervalID: number | null | NodeJS.Timeout;

  setInputText: (text: string) => void;
  setDisplayText: (text: string) => void;
  startTest: (duration: number) => void;
  endTest: () => void;
  setTimer: (time: number) => void;
  setSelectedDuration: (duration: number) => void;
  generateWords: (count: number) => void;
  setCursorPosition: (position: number) => void;
  handleKeyDown: (event: string) => void;
  calculateWPM: () => void;
  showResults: () => void;
  hideResults: () => void;
  resetTest: () => void;
}

const useStore = create<StoreState>((set, get) => ({
  inputText: "",
  displayText: generateWords(DEFAULT_WORD_COUNT),
  startTime: null,
  endTime: null,
  cursorPosition: 0,
  timer: DEFAULT_DURATION,
  selectedDuration: DEFAULT_DURATION,
  isTestStarted: false,
  wpm: null,
  isResultsVisible: false,
  isInputDisabled: false,
  incorrectChars: 0,
  intervalID: null,

  setInputText: (text) => {
    const state = get();
    if (state.isInputDisabled) return;

    const isTestComplete = text.length === state.displayText.length;
    if (!state.isTestStarted) {
      set({
        isTestStarted: true,
        startTime: Date.now(),
      });
      state.startTest(state.selectedDuration);
    }

    set({
      inputText: text,
      cursorPosition: text.length,
      incorrectChars: calculateIncorrectChars(text, state.displayText),
      ...(isTestComplete ? { isInputDisabled: true } : {}),
    });

    if (isTestComplete) {
      state.endTest();
    }
  },

  setDisplayText: (text) => set({ displayText: text }),

  setCursorPosition: (position) => set({ cursorPosition: position }),

  handleKeyDown: (key) => {
    const state = get();
    if (state.isInputDisabled) return;

    if (!state.isTestStarted) {
      set({
        isTestStarted: true,
        startTime: Date.now(),
      });
      state.startTest(state.selectedDuration);
    }

    let newCursorPosition = state.cursorPosition;
    let newInputText = state.inputText;

    switch (key) {
      case "ArrowLeft":
        newCursorPosition = Math.max(0, state.cursorPosition - 1);
        break;
      case "ArrowRight":
        newCursorPosition = Math.min(
          state.inputText.length,
          state.cursorPosition + 1,
        );
        break;
      case "Backspace":
        if (state.cursorPosition > 0) {
          newInputText =
            state.inputText.slice(0, state.cursorPosition - 1) +
            state.inputText.slice(state.cursorPosition);
          newCursorPosition -= 1;
        }
        break;
      default:
        if (key.length === 1) {
          newInputText =
            state.inputText.slice(0, state.cursorPosition) +
            key +
            state.inputText.slice(state.cursorPosition);
          newCursorPosition += 1;
        }
        break;
    }

    set({
      inputText: newInputText,
      cursorPosition: newCursorPosition,
    });
  },

  startTest: (duration: number = DEFAULT_DURATION) => {
    const state = get();
    if (state.intervalID) clearInterval(state.intervalID);

    const id = setInterval(() => {
      if (!state.intervalID) set({ intervalID: id });

      set((prev) => {
        if (prev.timer <= 0) {
          state.endTest();
          return { timer: 0 };
        }
        return { timer: prev.timer - 1 };
      });
    }, TIMER_SPEED);

    set({
      selectedDuration: duration,
      startTime: Date.now(),
      endTime: null,
      timer: duration,
      isTestStarted: true,
      isInputDisabled: false,
      incorrectChars: 0,
    });
  },

  endTest: () => {
    const state = get();
    if (state.intervalID) clearInterval(state.intervalID);

    state.calculateWPM();

    set({
      endTime: Date.now(),
      cursorPosition: 0,
      timer: state.selectedDuration,
      isTestStarted: false,
      isInputDisabled: true,
      intervalID: null,
    });
  },

  setTimer: (time) => set({ timer: time }),

  // Remembers the user selected duration
  setSelectedDuration: (time) => set({ selectedDuration: time }),

  generateWords: (count: number) => {
    set({ displayText: generateWords(count) });
  },

  calculateWPM: () => {
    const state = get();
    if (state.startTime) {
      const timeElapsed = (Date.now() - state.startTime) / 60000;
      const wordsTyped = state.inputText
        .trim()
        .split(" ")
        .filter(Boolean).length;
      const wpm = Math.round(wordsTyped / timeElapsed);
      set({ wpm });
    } else {
      set({ wpm: 0 });
    }
  },

  showResults: () => set({ isResultsVisible: true }),

  hideResults: () =>
    set((state) => ({
      inputText: "",
      startTime: null,
      endTime: null,
      timer: state.selectedDuration,
      isTestStarted: false,
      wpm: null,
      isResultsVisible: false,
      isInputDisabled: false,
    })),

  resetTest: () => {
    const state = get();
    if (state.intervalID) clearInterval(state.intervalID);

    set({
      inputText: "",
      cursorPosition: 0,
      startTime: null,
      endTime: null,
      timer: state.selectedDuration,
      isTestStarted: false,
      wpm: null,
      isInputDisabled: false,
      incorrectChars: 0,
      intervalID: null,
    });
  },
}));

export { useStore };
