export enum RoleEnum {
  ARTIST = 'artist',
  GUESSER = 'guesser'
}

export type User = {
  id: number,
  username: string,
  role: RoleEnum,
  isMaster: boolean,
  score: number,
  guessed: boolean,
}
