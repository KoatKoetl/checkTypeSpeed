import ReactLoading from "react-loading";

const Loading = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <ReactLoading
        type="spinningBubbles"
        color="#ca4754"
        height={200}
        width={100}
      />
    </div>
  );
};

export default Loading;
