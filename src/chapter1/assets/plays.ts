import { Performance } from './invoices';

/**
 * 극단이 공연할 공연 정보
 */
export type Play = {
  name: string;
  type: 'tragedy' | 'comedy';
};
export type Plays = Record<string, Play>;

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

/**
 * const play = plays[perf.playId];
 * 위 임시 변수를 질의 함수로 바꾸기
 *
 * @param aPerformance 공연
 */
export function playFor(aPerformance: Performance) {
  return plays[aPerformance.playId];
}
