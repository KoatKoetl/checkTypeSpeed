import { useStore } from "../../stores/store";

const CloseButton = () => {
  const { hideResults } = useStore();

  return (
    <button
      onClick={hideResults}
      className="mt-2 rounded border border-primary-red px-4 py-2 transition-colors duration-200 active:bg-primary-red sm:mt-4 sm:hover:bg-primary-red"
    >
      Close
    </button>
  );
};

export default CloseButton;
