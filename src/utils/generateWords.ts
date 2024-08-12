import { words } from "../data/data";

export const generateWords = (count: number): string => {
  return Array.from({ length: count }, () => {
    const word = words[Math.floor(Math.random() * words.length)];

    // Randomly capitalize the first letter
    const shouldCapitalize = Math.random() > 0.5;
    return shouldCapitalize
      ? word.charAt(0).toUpperCase() + word.slice(1)
      : word;
  }).join(" ");
};
