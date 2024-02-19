export const getRandom = (array: string[], number: number) => {
  const shuffled = array.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, number);

  return selected;
};

export const isAlmostSimilar = (word1: string, word2: string) => {
  const word1WithoutAccents = word1.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const word2WithoutAccents = word2.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

  if (word1WithoutAccents.length !== word2WithoutAccents.length) {
    return false;
  }

  let differences = 0;
  for (let i = 0; i < word1WithoutAccents.length; i++) {
    if (word1WithoutAccents[i] !== word2WithoutAccents[i]) {
      differences++;
    }

    if (differences > 1) {
      return false;
    }
  }

  return differences === 1;
};

export const areWordsIdentical = (word1: string, word2: string) => {
  const word1WithoutAccents = word1.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const word2WithoutAccents = word2.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

  return word1WithoutAccents === word2WithoutAccents;
};
