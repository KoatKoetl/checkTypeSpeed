import { useStore } from "../../stores/store";

const CloseButton = () => {
  const { hideResults } = useStore();

  return (
    <button
      onClick={hideResults}
      className="border-primary-red hover:bg-primary-red mt-2 rounded border px-4 py-2 transition-colors duration-200 sm:mt-4"
    >
      Close
    </button>
  );
};

export default CloseButton;
