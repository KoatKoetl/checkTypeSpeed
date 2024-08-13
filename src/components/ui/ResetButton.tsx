import { useStore } from "../../stores/store";

const ResetButton = () => {
  const { resetTest } = useStore();

  return (
    <button
      type="button"
      onClick={resetTest}
      className="rounded border border-primary-red px-2 py-1 transition-colors duration-200 active:bg-primary-red sm:px-4 sm:py-2 sm:hover:bg-primary-red"
    >
      Restart
    </button>
  );
};

export default ResetButton;
