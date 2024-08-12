import { useMemo } from "react";
import { useStore } from "../stores/store";
import LengthButton from "./ui/LengthButton";
import Wrapper from "./ui/Wrapper";

const LengthNavigation = () => {
  const { displayText } = useStore();

  const displayWords = useMemo(
    () => displayText.trim().split(/\s+/),
    [displayText],
  );

  return (
    <div className="flex flex-col items-center justify-between p-2 sm:justify-center">
      <h2 className="text-md mb-2 text-center">Text length (in words)</h2>

      <Wrapper styles="flex flex-wrap justify-center">
        <LengthButton length={5} isActive={displayWords.length === 5} />
        <LengthButton length={10} isActive={displayWords.length === 10} />
        <LengthButton length={15} isActive={displayWords.length === 15} />
        <LengthButton length={20} isActive={displayWords.length === 20} />
      </Wrapper>
    </div>
  );
};

export default LengthNavigation;
