import { useCallback } from "react";
import { useStore } from "../../stores/store";

type LengthButton = {
  length: number;
  isActive: boolean;
  styles?: string;
};

const LengthButton = ({ length, isActive, styles = "" }: LengthButton) => {
  const { generateWords, resetTest } = useStore();

  const setWordsLength = useCallback(() => {
    resetTest();
    generateWords(length);
  }, [length, resetTest, generateWords]);

  return (
    <button
      type="button"
      className={`rounded border-2 border-transparent px-4 py-1 transition-all duration-300 ${isActive ? "bg-primary-green" : "hover:border-primary-green"} sm:mx-4 ${styles}`}
      onClick={() => setWordsLength()}
    >
      {length}
    </button>
  );
};

export default LengthButton;
