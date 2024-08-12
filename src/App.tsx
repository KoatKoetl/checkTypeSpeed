import { useEffect, useState } from "react";
import ControlDuration from "./components/ControlDuration";
import DurationNavigation from "./components/DurationNavigation";
import MemoizedHighlightedText from "./components/HighlightedText";
import LengthNavigation from "./components/LengthNavigation";
import Loading from "./components/Loading";
import TestResultsPopup from "./components/Results";
import TotalWords from "./components/TotalWords";
import ResetButton from "./components/ui/ResetButton";
import Wrapper from "./components/ui/Wrapper";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="h-full text-xs sm:flex sm:items-center sm:justify-center sm:text-sm lg:text-lg xl:text-lg">
      {isLoading ? (
        <Loading />
      ) : (
        <Wrapper styles="max-w-7xl sm:w-full grid mx-4 py-8">
          <Wrapper styles="flex justify-center">
            <DurationNavigation />
            <LengthNavigation />
          </Wrapper>

          <MemoizedHighlightedText />

          <Wrapper styles="flex flex-col items-center justify-center gap-2 self-center py-2 sm:flex-row sm:gap-8">
            <ResetButton />
            <ControlDuration />
            <TotalWords />
          </Wrapper>
          <TestResultsPopup />
        </Wrapper>
      )}
    </div>
  );
};

export default App;
