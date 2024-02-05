import * as wordListData from './wordList.json';

export const getRandomWords = () => {
  const wordList = wordListData;
  const uniqueWords: Set<string> = new Set();
  const max = wordList.length;

  while (uniqueWords.size < 3) {
    const randomIndex = Math.floor(Math.random() * max);
    uniqueWords.add(wordList[randomIndex]);
  }

  return Array.from(uniqueWords);

}




  


