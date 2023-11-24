/**
 * 공연료 청구서
 */
export type Performance = {
  playId: string;
  audience: number;
};

export type Invoice = {
  customer: string;
  performances: Performance[];
};

export const invoices: Invoice[] = [
  {
    customer: 'BigCo',
    performances: [
      {
        playId: 'hamlet',
        audience: 55,
      },
      {
        playId: 'as-like',
        audience: 35,
      },
      {
        playId: 'othello',
        audience: 40,
      },
    ],
  },
];
