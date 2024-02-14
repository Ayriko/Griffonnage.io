export type Line = {
  tool: string;
  points: (number | undefined)[];
  strokeWidth: number;
  strokeColor: string;
  closed: boolean;
  fill: (string | undefined);
};
