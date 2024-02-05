export const getRandom = (array: any[], number: number) => {

  const shuffled = array.sort(() => 0.5 - Math.random());
  let selected = shuffled.slice(0, number);

  return selected;
}






  


