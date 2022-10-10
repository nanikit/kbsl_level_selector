import { atom, useAtom } from 'jotai';

export type OneToOneStatus = {
  player1: string;
  player2: string;
  hasPlayer1Retry: boolean;
  hasPlayer2Retry: boolean;
};

export type MatchMapStatus = 'normal' | 'banned' | 'picked' | 'p1_win' | 'p2_win';

export type MatchInformation = {
  title: string;
  host: string;
  description: string;
  titles: string[];
  hashes: string[];
  matchResult: MatchMapStatus[];
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
  hashes: [],
  matchResult: [],
} as MatchInformation);

const oneToOneAtom = atomWithLocalStorage('oneToOneStatus', {
  player1: '',
  player2: '',
  hasPlayer1Retry: true,
  hasPlayer2Retry: true,
});

export function getMatchFromPlaylist(data: unknown) {
  const playlist = data as any;
  const hashes = playlist?.songs?.map((x: any) => x?.hash).filter(Boolean);
  const matchUpdate = {
    host: '한국 비트세이버 커뮤니티',
    title: '',
    description: playlist?.playlistDescription,
    titles: playlist?.songs?.map?.((x: any) => x.songName),
    hashes,
  };
  return matchUpdate;
}

export function useOneToOneStatus() {
  return useAtom(oneToOneAtom);
}

export function useMatchInformation() {
  return useAtom(matchInformationAtom);
}
