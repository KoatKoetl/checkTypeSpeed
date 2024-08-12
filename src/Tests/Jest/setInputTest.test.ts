import { useStore } from "../../stores/store";
import calculateIncorrectChars from "../../utils/calculateIncorrectChars";

jest.mock("../../utils/calculateIncorrectChars", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("setInputText", () => {
  beforeEach(() => {
    // Reset any mocks before each test
    jest.clearAllMocks();
  });

  it("should update inputText and start the test", () => {
    const { setInputText } = useStore.getState();

    // Update the state by setting inputText
    setInputText("new text");

    // Assertions to check if state is updated correctly
    expect(useStore.getState().inputText).toBe("new text");
    expect(useStore.getState().isTestStarted).toBe(true);
    expect(useStore.getState().startTime).not.toBeNull();
  });

  const testCases = [
    { inputText: "hell", displayText: "hello", expectedIncorrectChars: 1 },
    {
      inputText: "hello",
      displayText: "hello world",
      expectedIncorrectChars: 6,
    },
    {
      inputText: "hello world",
      displayText: "hello world",
      expectedIncorrectChars: 0,
    },
    {
      inputText: "hi there",
      displayText: "hello world",
      expectedIncorrectChars: 9,
    },
    { inputText: "hello", displayText: "hell", expectedIncorrectChars: 1 },
  ];

  testCases.forEach(({ inputText, displayText, expectedIncorrectChars }) => {
    it(`should calculate ${expectedIncorrectChars} incorrect chars for input "${inputText}" and display "${displayText}"`, () => {
      const { setInputText, setDisplayText } = useStore.getState();

      setDisplayText(displayText);

      (calculateIncorrectChars as jest.Mock).mockReturnValueOnce(
        expectedIncorrectChars,
      );

      setInputText(inputText);

      expect(calculateIncorrectChars).toHaveBeenCalledWith(
        inputText,
        displayText,
      );
      expect(useStore.getState().incorrectChars).toBe(expectedIncorrectChars);
    });
  });
});
