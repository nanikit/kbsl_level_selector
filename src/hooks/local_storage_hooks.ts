import { useLocalStorage } from 'react-use';

export type OneToOneStatus = {
  player1: string;
  player2: string;
  hasPlayer1Retry: boolean;
  hasPlayer2Retry: boolean;
};

export type MatchMapStatus = 'normal' | 'banned' | 'picked' | 'p1_win' | 'p2_win';

const oneToOneKey = 'oneToOneStatus';
const matchKey = 'matchStatus';

export function useOneToOneStatus() {
  return useLocalStorage<OneToOneStatus>(oneToOneKey, {
    player1: '',
    player2: '',
    hasPlayer1Retry: true,
    hasPlayer2Retry: true,
  });
}

export function useMatchStatus() {
  return useLocalStorage(matchKey, [] as MatchMapStatus[]);
}
