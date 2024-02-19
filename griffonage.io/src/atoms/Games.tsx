import { atom, type RecoilState } from 'recoil';

const Games : RecoilState<string[]> = atom({
  key: 'games',
  default: [''],
});

export default Games;
