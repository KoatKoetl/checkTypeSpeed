import { useCallback } from "react";
import { useStore } from "../../stores/store";

type DurationButtonProps = {
  duration: number;
  isActive: boolean;
  styles?: string;
};

const DurationButton = ({
  duration,
  isActive,
  styles = "",
}: DurationButtonProps) => {
  const { setTimer, setSelectedDuration, resetTest } = useStore();

  const handleStart = useCallback(() => {
    resetTest();
    setTimer(duration);
    setSelectedDuration(duration);
  }, [duration, resetTest, setSelectedDuration, setTimer]);

  return (
    <button
      type="button"
      className={`rounded border-2 border-transparent px-4 py-1 transition-all duration-300 ${isActive ? "bg-primary-green" : "hover:border-primary-green"} sm:mx-4 ${styles}`}
      onClick={() => handleStart()}
    >
      {duration}s
    </button>
  );
};

export default DurationButton;
