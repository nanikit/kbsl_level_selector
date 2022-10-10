export type Difficulty = 'Easy' | 'Normal' | 'Hard' | 'Expert' | 'ExpertPlus';
export type BeatsaverMap = {
  id: string;
  name: string;
  description: string;
  uploader: {
    id: number;
    name: string;
    uniqueSet: boolean;
    hash: string;
    avatar: string;
    type: string;
  };
  metadata: {
    bpm: number;
    duration: number;
    songName: string;
    songSubName: string;
    songAuthorName: string;
    levelAuthorName: string;
  };
  stats: {
    plays: number;
    downloads: number;
    upvotes: number;
    downvotes: number;
    score: number;
  };
  uploaded: string;
  automapper: boolean;
  ranked: boolean;
  qualified: boolean;
  versions: {
    hash: string;
    key: string;
    state: string;
    createdAt: string;
    sageScore: number;
    diffs: {
      njs: number;
      offset: number;
      notes: number;
      bombs: number;
      obstacles: number;
      nps: number;
      length: number;
      characteristic: string;
      difficulty: Difficulty;
      events: number;
      chroma: boolean;
      me: boolean;
      ne: boolean;
      cinema: boolean;
      seconds: number;
      paritySummary: {
        errors: number;
        warns: number;
        resets: number;
      };
      stars?: number;
    }[];
    downloadURL: string;
    coverURL: string;
    previewURL: string;
  }[];
  createdAt: string;
  updatedAt: string;
  lastPublishedAt: string;
};

export const getDataUrlFromHash = (hash: string) => `https://beatsaver.com/api/maps/hash/${hash}`;

export const getMapFromHash = async (hash: string): Promise<BeatsaverMap> => {
  const response = await fetch(getDataUrlFromHash(hash));
  return response.json();
};

export async function getDetailFromId(id: string): Promise<BeatsaverMap> {
  const response = await fetch(`https://beatsaver.com/api/maps/id/${id}`);
  return response.json();
}
