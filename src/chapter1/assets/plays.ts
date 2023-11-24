/**
 * 극단이 공연할 공연 정보
 */
export type Plays = Record<
  string,
  {
    name: string;
    type: 'tragedy' | 'comedy';
  }
>;

export const plays: Plays = {
  hamlet: {
    name: 'Hamlet',
    type: 'tragedy',
  },
  'as-like': {
    name: 'As You Like It',
    type: 'comedy',
  },
  othello: {
    name: 'Othello',
    type: 'tragedy',
  },
};
