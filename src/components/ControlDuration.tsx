import { useStore } from "../stores/store";

const ControlDuration = () => {
  const { timer } = useStore();

  return <p className="text-md">Time: {timer}s</p>;
};

export default ControlDuration;
