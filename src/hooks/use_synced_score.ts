import { useEffect, useReducer } from 'react';
import { User, User_PlayStates } from '../services/protos/models';
import { Push_RealtimeScore } from '../services/protos/packets';
import { timeout } from '../services/utils';

export function useSyncedScore({ player, score }: { player?: User; score?: Push_RealtimeScore }) {
  const delay = player?.streamDelayMs;

  type ScoreState = {
    score?: Push_RealtimeScore;
    queuedScore?: Push_RealtimeScore;
    playState?: User_PlayStates;
  };
  const [state, collect] = useReducer((state: ScoreState, message: ScoreState): ScoreState => {
    return { ...state, ...message };
  }, {});

  const waitDelay = async (streamDelay?: number) => {
    let delay = Math.max(0, Math.min(15000, (streamDelay ?? 0) - 34));
    const seemsNotStreamer = delay > 10000;
    if (seemsNotStreamer) {
      delay -= 5000;
    }
    if (delay) {
      await timeout(delay);
    }
  };

  useEffect(() => {
    if (player?.playState === state.playState) {
      return;
    }
    collect({ playState: player?.playState });
    if (player?.playState !== User_PlayStates.InGame) {
      return;
    }
    (async () => {
      await waitDelay(delay);
      collect({ score: undefined });
    })();
  }, [player?.playState, state.playState, delay]);

  useEffect(() => {
    if (state.queuedScore === score) {
      return;
    }
    (async () => {
      collect({ queuedScore: score });
      await waitDelay(delay);
      collect({ score });
    })();
  }, [state.queuedScore, score, delay]);

  return state.score;
}
