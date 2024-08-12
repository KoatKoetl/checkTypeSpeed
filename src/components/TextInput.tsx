import { useStore } from "../stores/store";

const TextInput = () => {
  const { inputText, setInputText, isInputDisabled, handleKeyDown } =
    useStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    handleKeyDown(e.key);
  };

  return (
    <div className="absolute left-0 top-0 z-0 flex h-full w-full items-center justify-center">
      <input
        type="text"
        id="text-input"
        value={inputText}
        autoComplete="off"
        autoCapitalize="off"
        autoCorrect="off"
        list="autocompleteOff"
        spellCheck="false"
        onKeyDown={handleKeyPress}
        onChange={handleChange}
        className="h-full w-full opacity-0"
        disabled={isInputDisabled}
      />
    </div>
  );
};

export default TextInput;
