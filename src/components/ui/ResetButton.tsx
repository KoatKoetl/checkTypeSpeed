import { useStore } from "../../stores/store";

const ResetButton = () => {
  const { resetTest } = useStore();

  return (
    <button
      type="button"
      onClick={resetTest}
      className="border-primary-red hover:bg-primary-red rounded border px-2 py-1 transition-colors duration-200 sm:px-4 sm:py-2"
    >
      Restart
    </button>
  );
};

export default ResetButton;
