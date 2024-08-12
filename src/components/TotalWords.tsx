import { useStore } from "../stores/store";

const TotalWords = () => {
  const { displayText } = useStore();

  const displayWords = displayText.trim().split(" ");

  return <p>Total words: {displayWords.length}</p>;
};

export default TotalWords;
