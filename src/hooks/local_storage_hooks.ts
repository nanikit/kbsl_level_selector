import { atom, useAtom } from 'jotai';
import { Difficulty } from '../services/beatsaver';

export type OneToOneStatus = {
  player1: string;
  player2: string;
  hasPlayer1Retry: boolean;
  hasPlayer2Retry: boolean;
  tournamentServer: string;
};

export type MatchMapStatus = 'normal' | 'banned' | 'picked' | 'p1_win' | 'p2_win';

export type MatchInformation = {
  title: string;
  host: string;
  description: string;
  titles: string[];
  levels: Level[];
  matchResult: MatchMapStatus[];
};

type Level = {
  hash: string;
  difficulty?: Difficulty;
};

const atomWithLocalStorage = <T>(key: string, initialValue: T) => {
  const getInitialValue = () => {
    const item = localStorage.getItem(key);
    if (item !== null) {
      return JSON.parse(item);
    }
    return initialValue;
  };

  const baseAtom = atom(getInitialValue());
  const derivedAtom = atom<T, T>(
    (get) => get(baseAtom),
    (_, set, update) => {
      set(baseAtom, update);
      localStorage.setItem(key, JSON.stringify(update));
    },
  );

  return derivedAtom;
};

const matchInformationAtom = atomWithLocalStorage('match', {
  title: '',
  host: '',
  description: '',
  titles: [],
  levels: [],
  matchResult: [],
} as MatchInformation);

function migrateConfiguration() {
  const json = localStorage.getItem('match');
  if (json === null) {
    return;
  }

  const obj = JSON.parse(json);
  if (![obj.levels, obj.matchResult, obj.titles].every(Array.isArray)) {
    debugger;
    localStorage.removeItem('match');
  }
}

migrateConfiguration();

const oneToOneAtom = atomWithLocalStorage('oneToOneStatus', {
  player1: '',
  player2: '',
  hasPlayer1Retry: true,
  hasPlayer2Retry: true,
  tournamentServer: '',
});

export function getMatchFromPlaylist(data: unknown): Partial<MatchInformation> {
  const playlist = data as any;
  const levels = playlist?.songs?.map((x: any) => ({
    hash: x.hash,
    difficulty: x.difficulties?.[0]?.name,
  }));
  const matchUpdate = {
    host: '한국 비트세이버 커뮤니티',
    title: '',
    description: playlist?.playlistDescription,
    titles: playlist?.songs?.map?.((x: any) => x.songName),
    levels,
  };
  return matchUpdate;
}

export function useOneToOneStatus() {
  return useAtom(oneToOneAtom);
}

export function useMatchInformation() {
  return useAtom(matchInformationAtom);
}
