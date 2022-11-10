import { useAtom } from 'jotai';
import { groupBy, pick } from 'lodash-es';
import { useEffect } from 'react';
import { useQueries, useQuery } from 'react-query';
import OneToOneMatchStatus from './components/one_to_one_match_status';
import { MapCard } from './containers/map_card';
import {
  getMatchFromPlaylist,
  Level,
  MatchMapStatus,
  presetCount,
  presetIndexAtom,
  useMatchInformation,
  useOneToOneStatus,
} from './hooks/local_storage_hooks';
import { useTournamentAssistant } from './hooks/use_tournament';
import { BeatsaverMap, Difficulty, getDataUrlFromHash } from './services/beatsaver';
import { Match } from './services/protos/models';

export function App() {
  const [, setPresetIndex] = useAtom(presetIndexAtom);
  const [match, saveMatch] = useMatchInformation();

  const [local] = useOneToOneStatus();
  const { player1, player2 } = local ?? {};
  const [tournament, { setMatch }] = useTournamentAssistant({
    player1,
    player2,
    server: local.tournamentServer,
  });

  const mapQueries = useQueries<BeatsaverMap[]>(
    match.levels?.map((level) => ({
      queryKey: [getDataUrlFromHash(level.hash ?? '')],
      enabled: !!level.hash,
      staleTime: Infinity,
    })),
  );

  const saveStatus = (status: MatchMapStatus, index: number) => {
    const matchResult = match.matchResult ?? [];
    if (status === 'picked') {
      for (let i = 0; i < matchResult.length; i++) {
        if (matchResult[i] === 'picked') {
          matchResult[i] = 'normal';
        }
      }
      const selectedMap = mapQueries[index].data as BeatsaverMap;
      if (tournament.match && selectedMap) {
        const match = composeTournamentMatch({
          selectedLevel: levels[index],
          selectedMap,
          existingMatch: tournament.match,
        });
        setMatch(match);
      }
    }
    matchResult[index] = status;
    saveMatch({ ...match, lastCursorIndex: index, matchResult });
  };

  useQuery(['./map_pool.json'], {
    onSuccess: (data) => {
      saveMatch({ ...match, ...getMatchFromPlaylist(data) });
    },
    enabled: !match.host,
  });

  useEffect(() => {
    function capture(ev: KeyboardEvent) {
      const code = ev.key.charCodeAt(0);
      const index = code - '1'[0].charCodeAt(0);
      if (0 <= index && index < presetCount) {
        setPresetIndex(index);
      }
    }

    document.body.addEventListener('keypress', capture);
    return () => {
      document.body.removeEventListener('keypress', capture);
    };
  }, [setPresetIndex]);

  const { title, description, host, levels, matchResult, lastCursorIndex } = match;
  const pickedIndex = matchResult?.findIndex((x) => x === 'picked');
  const pickedLevel = levels[pickedIndex];
  const tournamentMapHash = tournament.match?.selectedLevel?.levelId?.replace('custom_level_', '');
  const hash = pickedLevel?.hash ?? tournamentMapHash ?? '';
  const columnCounts = [
    [],
    [1],
    [2],
    [3],
    [2, 2],
    [3, 2],
    [3, 3],
    [2, 3, 2],
    [3, 2, 3],
    [3, 3, 3],
    [3, 4, 3],
    [3, 3, 3, 2],
    [4, 4, 4],
    [4, 3, 3, 3],
  ][levels.length];
  const columnSliceIndices = columnCounts.reduce(
    (acc, elem) => (acc.push(acc[acc.length - 1] + elem), acc),
    [0],
  );
  const has4Column = Math.max(...columnCounts) >= 4;

  return (
    <main>
      <div className='bg-[url(/bg.png)] w-full aspect-[16/9] bg-cover flex flex-col'>
        <div className='flex-[28_1_0] flex flex-col flex-nowrap items-center pt-2 text-white'>
          <p className='text-[2vw] mt-7'>{host}</p>
          <p className='text-[3.5vw] leading-[3.5vw] font-bold'>
            {title || (
              <>
                제3회 <span className='text-[#FFC6ED]'>전자칼잽이</span> 대전
              </>
            )}
          </p>
          <p className='text-[2.5vw] leading-[3vw]'>{description}</p>
        </div>

        <div
          className={`flex-[72_1_0] px-[4vw] flex flex-col justify-center ${
            columnCounts.length >= 4 ? 'pb-[2vw]' : 'pb-[6vw]'
          }`}
        >
          {columnCounts.map((_, rowIndex) => (
            <div key={rowIndex} className='flex h-[10.3vw] justify-center'>
              {levels
                .slice(columnSliceIndices[rowIndex], columnSliceIndices[rowIndex + 1])
                .map(({ hash, difficulty }, columnIndex) => {
                  const index = columnSliceIndices[rowIndex] + columnIndex;
                  return (
                    <div
                      key={`${hash}-${columnIndex}`}
                      className={`flex-[0_0] p-[0.5vw] ${has4Column ? 'basis-1/4' : 'basis-1/3'}`}
                    >
                      <MapCard
                        title={match.titles[index]}
                        hash={hash}
                        difficulty={difficulty}
                        status={matchResult?.[index]}
                        highlight={lastCursorIndex === index}
                        map={mapQueries[index]?.data as BeatsaverMap}
                        onStatusChanged={(status) => saveStatus(status, index)}
                      />
                    </div>
                  );
                })}
            </div>
          ))}
        </div>
      </div>
      <OneToOneMatchStatus
        tournament={tournament}
        title={pickedLevel && match.titles[pickedIndex]}
        mapHash={hash}
        goal={Math.ceil((levels.length - matchResult.filter((x) => x === 'banned').length) / 2)}
        p1Win={matchResult?.filter((x) => x === 'p1_win').length}
        p2Win={matchResult?.filter((x) => x === 'p2_win').length}
      />
    </main>
  );
}

function composeTournamentMatch({
  selectedLevel,
  selectedMap,
  existingMatch: match,
}: {
  selectedLevel: Level;
  selectedMap: BeatsaverMap;
  existingMatch: Match;
}): Match {
  const groups = groupBy(selectedMap.versions[0].diffs, (x) => x.characteristic);
  const characteristics = Object.entries(groups).map(([name, diffs]) => ({
    serializedName: name,
    difficulties: diffs.map((x) => difficultyToIndex(x.difficulty)),
  }));
  return {
    ...match,
    selectedLevel: {
      levelId: `custom_level_${selectedLevel?.hash}`,
      name: selectedMap?.metadata?.songName,
      characteristics,
    },
    selectedCharacteristic: characteristics.find(
      (x) => x.serializedName === selectedLevel?.characteristic,
    ),
    selectedDifficulty: difficultyToIndex(selectedLevel?.difficulty ?? 'Easy'),
  };
}

function difficultyToIndex(difficulty: Difficulty): number {
  switch (difficulty) {
    case 'Easy':
      return 0;
    case 'Normal':
      return 1;
    case 'Hard':
      return 2;
    case 'Expert':
      return 3;
    case 'ExpertPlus':
      return 4;
  }
}
