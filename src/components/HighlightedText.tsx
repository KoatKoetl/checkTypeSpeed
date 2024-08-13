import React, { useEffect, useMemo, useRef } from "react";
import TextInput from "../components/TextInput";
import { useStore } from "../stores/store";

const HighlightedText = () => {
  const { inputText, displayText, cursorPosition } = useStore();
  const textInputRef = useRef<HTMLInputElement | null>(null);

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

  // Effect to handle cursor positioning on input change
  useEffect(() => {
    const textInput = textInputRef.current;
    if (textInput && cursorPosition !== null) {
      textInput.setSelectionRange(cursorPosition, cursorPosition);
    }
  }, [cursorPosition]);

  // Handle input event to correctly manage cursor on mobile devices
  useEffect(() => {
    const handleInput = () => {
      if (textInputRef.current && cursorPosition !== null) {
        setTimeout(() => {
          textInputRef.current?.setSelectionRange(
            cursorPosition,
            cursorPosition,
          );
        }, 0); // Delay helps with mobile devices
      }
    };

    window.addEventListener("input", handleInput);

    return () => {
      window.removeEventListener("input", handleInput);
    };
  }, [cursorPosition]);

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
