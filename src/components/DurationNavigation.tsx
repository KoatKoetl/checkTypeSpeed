import { useStore } from "../stores/store";
import DurationButton from "./ui/DurationButton";
import Wrapper from "./ui/Wrapper";

const DurationNavigation = () => {
  const { selectedDuration } = useStore();

  return (
    <div className="flex flex-col items-center justify-between p-2 sm:justify-center">
      <h2 className="text-md mb-2 text-center">Test duration</h2>

      <Wrapper styles="flex flex-wrap justify-center">
        <DurationButton duration={10} isActive={selectedDuration === 10} />
        <DurationButton duration={15} isActive={selectedDuration === 15} />
        <DurationButton duration={20} isActive={selectedDuration === 20} />
        <DurationButton duration={30} isActive={selectedDuration === 30} />
      </Wrapper>
    </div>
  );
};

export default DurationNavigation;
