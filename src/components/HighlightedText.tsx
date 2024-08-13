import React, { useMemo } from "react";
import TextInput from "../components/TextInput";
import { useStore } from "../stores/store";

const HighlightedText = () => {
  const { inputText, displayText, cursorPosition } = useStore();

  const highlightedText = useMemo(() => {
    return displayText.split("").map((char, index) => {
      let className = "text-primary-gray";

      if (index < inputText.length) {
        const isCorrect = inputText[index] === char;
        className = isCorrect ? "text-white" : "text-primary-red";
      }

      if (index === cursorPosition) {
        className +=
          " " +
          "underline decoration-2 underline-offset-4 sm:underline-offset-6 lg:animate-blink";
      }

      return (
        <span key={index} className={`${className}`}>
          {char}
        </span>
      );
    });
  }, [displayText, inputText, cursorPosition]);

  return (
    <div className="relative z-10 mx-auto max-h-44 max-w-96 py-2 text-lg font-bold sm:max-w-2xl">
      <label htmlFor="text-input">
        <p className="text-sm sm:text-lg lg:text-xl xl:text-2xl">
          {highlightedText}
        </p>
      </label>

      <TextInput />
    </div>
  );
};

const MemoizedHighlightedText = React.memo(HighlightedText);

export default MemoizedHighlightedText;
