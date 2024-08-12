import { useMemo } from "react";
import { useStore } from "../stores/store";
import CloseButton from "./ui/CloseButton";
import Wrapper from "./ui/Wrapper";

const TestResultsPopup = () => {
  const { wpm, inputText, displayText, endTime, incorrectChars } = useStore();

  const displayWords = useMemo(() => {
    if (!endTime) return [];
    return displayText.trim().split(/\s+/);
  }, [displayText, endTime]);

  const inputWords = useMemo(() => {
    if (!endTime) return [];
    return inputText.trim().split(/\s+/);
  }, [inputText, endTime]);

  const correctWordsCount = useMemo(() => {
    if (!endTime) return 0;
    const displayWordsSet = new Set(displayWords);
    return inputWords.reduce((count, word) => {
      if (displayWordsSet.has(word)) {
        displayWordsSet.delete(word);
        return count + 1;
      }
      return count;
    }, 0);
  }, [inputWords, displayWords, endTime]);

  const totalWords = useMemo(() => {
    if (!endTime) return 0;
    return displayWords.length;
  }, [displayWords, endTime]);

  const accuracy = useMemo(() => {
    if (!endTime || totalWords === 0) return "0.00";
    return ((correctWordsCount / totalWords) * 100).toFixed(2);
  }, [correctWordsCount, totalWords, endTime]);

  if (!endTime) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <Wrapper styles="bg-primary-gray mx-4 w-full max-w-96 rounded p-2 shadow-lg sm:max-w-xl sm:p-6">
        <h2 className="mb-4 text-xl font-semibold">Test Results</h2>
        <p>
          <strong>WPM:</strong> {wpm}
        </p>
        <p>
          <strong>Words Typed:</strong> {correctWordsCount} / {totalWords}
        </p>
        <p>
          <strong>Accuracy:</strong> {accuracy}%
        </p>
        <p>
          <strong>Incorrect typed characters:</strong> {incorrectChars}
        </p>
        <CloseButton />
      </Wrapper>
    </div>
  );
};

export default TestResultsPopup;
