const calculateIncorrectChars = (
  inputText: string,
  displayText: string,
): number => {
  let incorrectChars = 0;

  for (let i = 0; i < inputText.length; i++) {
    if (inputText[i] !== displayText[i]) {
      incorrectChars++;
    }
  }

  return incorrectChars;
};

export default calculateIncorrectChars;
