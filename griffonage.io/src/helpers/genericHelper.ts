export const getRandom = (array: string[], number: number) => {
  const shuffled = array.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, number);

  return selected;
};

export default getRandom;
