/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Channel, Guild } from "./discord";

export const protobufPackage = "proto.models";

export interface Characteristic {
  serializedName?: string;
  difficulties?: number[];
}

export interface Beatmap {
  name?: string;
  levelId?: string;
  characteristic?: Characteristic;
  difficulty?: number;
}

export interface PreviewBeatmapLevel {
  levelId?: string;
  name?: string;
  characteristics?: Characteristic[];
  loaded?: boolean;
}

export interface GameplayModifiers {
  options?: GameplayModifiers_GameOptions;
}

export enum GameplayModifiers_GameOptions {
  None = 0,
  /** NoFail - Negative modifiers */
  NoFail = 1,
  NoBombs = 2,
  NoArrows = 4,
  NoObstacles = 8,
  SlowSong = 16,
  /** InstaFail - Positive Modifiers */
  InstaFail = 32,
  FailOnClash = 64,
  BatteryEnergy = 128,
  FastNotes = 256,
  FastSong = 512,
  DisappearingArrows = 1024,
  GhostNotes = 2048,
  /** DemoNoFail - 1.12.2 Additions */
  DemoNoFail = 4096,
  DemoNoObstacles = 8192,
  StrictAngles = 16384,
  /** ProMode - 1.13.4 Additions */
  ProMode = 32768,
  ZenMode = 65536,
  SmallCubes = 131072,
  SuperFastSong = 262144,
  UNRECOGNIZED = -1,
}

export function gameplayModifiers_GameOptionsFromJSON(object: any): GameplayModifiers_GameOptions {
  switch (object) {
    case 0:
    case "None":
      return GameplayModifiers_GameOptions.None;
    case 1:
    case "NoFail":
      return GameplayModifiers_GameOptions.NoFail;
    case 2:
    case "NoBombs":
      return GameplayModifiers_GameOptions.NoBombs;
    case 4:
    case "NoArrows":
      return GameplayModifiers_GameOptions.NoArrows;
    case 8:
    case "NoObstacles":
      return GameplayModifiers_GameOptions.NoObstacles;
    case 16:
    case "SlowSong":
      return GameplayModifiers_GameOptions.SlowSong;
    case 32:
    case "InstaFail":
      return GameplayModifiers_GameOptions.InstaFail;
    case 64:
    case "FailOnClash":
      return GameplayModifiers_GameOptions.FailOnClash;
    case 128:
    case "BatteryEnergy":
      return GameplayModifiers_GameOptions.BatteryEnergy;
    case 256:
    case "FastNotes":
      return GameplayModifiers_GameOptions.FastNotes;
    case 512:
    case "FastSong":
      return GameplayModifiers_GameOptions.FastSong;
    case 1024:
    case "DisappearingArrows":
      return GameplayModifiers_GameOptions.DisappearingArrows;
    case 2048:
    case "GhostNotes":
      return GameplayModifiers_GameOptions.GhostNotes;
    case 4096:
    case "DemoNoFail":
      return GameplayModifiers_GameOptions.DemoNoFail;
    case 8192:
    case "DemoNoObstacles":
      return GameplayModifiers_GameOptions.DemoNoObstacles;
    case 16384:
    case "StrictAngles":
      return GameplayModifiers_GameOptions.StrictAngles;
    case 32768:
    case "ProMode":
      return GameplayModifiers_GameOptions.ProMode;
    case 65536:
    case "ZenMode":
      return GameplayModifiers_GameOptions.ZenMode;
    case 131072:
    case "SmallCubes":
      return GameplayModifiers_GameOptions.SmallCubes;
    case 262144:
    case "SuperFastSong":
      return GameplayModifiers_GameOptions.SuperFastSong;
    case -1:
    case "UNRECOGNIZED":
    default:
      return GameplayModifiers_GameOptions.UNRECOGNIZED;
  }
}

export function gameplayModifiers_GameOptionsToJSON(object: GameplayModifiers_GameOptions): string {
  switch (object) {
    case GameplayModifiers_GameOptions.None:
      return "None";
    case GameplayModifiers_GameOptions.NoFail:
      return "NoFail";
    case GameplayModifiers_GameOptions.NoBombs:
      return "NoBombs";
    case GameplayModifiers_GameOptions.NoArrows:
      return "NoArrows";
    case GameplayModifiers_GameOptions.NoObstacles:
      return "NoObstacles";
    case GameplayModifiers_GameOptions.SlowSong:
      return "SlowSong";
    case GameplayModifiers_GameOptions.InstaFail:
      return "InstaFail";
    case GameplayModifiers_GameOptions.FailOnClash:
      return "FailOnClash";
    case GameplayModifiers_GameOptions.BatteryEnergy:
      return "BatteryEnergy";
    case GameplayModifiers_GameOptions.FastNotes:
      return "FastNotes";
    case GameplayModifiers_GameOptions.FastSong:
      return "FastSong";
    case GameplayModifiers_GameOptions.DisappearingArrows:
      return "DisappearingArrows";
    case GameplayModifiers_GameOptions.GhostNotes:
      return "GhostNotes";
    case GameplayModifiers_GameOptions.DemoNoFail:
      return "DemoNoFail";
    case GameplayModifiers_GameOptions.DemoNoObstacles:
      return "DemoNoObstacles";
    case GameplayModifiers_GameOptions.StrictAngles:
      return "StrictAngles";
    case GameplayModifiers_GameOptions.ProMode:
      return "ProMode";
    case GameplayModifiers_GameOptions.ZenMode:
      return "ZenMode";
    case GameplayModifiers_GameOptions.SmallCubes:
      return "SmallCubes";
    case GameplayModifiers_GameOptions.SuperFastSong:
      return "SuperFastSong";
    case GameplayModifiers_GameOptions.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface PlayerSpecificSettings {
  playerHeight?: number;
  sfxVolume?: number;
  saberTrailIntensity?: number;
  noteJumpStartBeatOffset?: number;
  noteJumpFixedDuration?: number;
  options?: PlayerSpecificSettings_PlayerOptions;
  noteJumpDurationTypeSettings?: PlayerSpecificSettings_NoteJumpDurationTypeSettings;
}

export enum PlayerSpecificSettings_PlayerOptions {
  None = 0,
  LeftHanded = 1,
  StaticLights = 2,
  NoHud = 4,
  AdvancedHud = 8,
  ReduceDebris = 16,
  AutoPlayerHeight = 32,
  NoFailEffects = 64,
  AutoRestart = 128,
  HideNoteSpawnEffect = 256,
  AdaptiveSfx = 512,
  UNRECOGNIZED = -1,
}

export function playerSpecificSettings_PlayerOptionsFromJSON(object: any): PlayerSpecificSettings_PlayerOptions {
  switch (object) {
    case 0:
    case "None":
      return PlayerSpecificSettings_PlayerOptions.None;
    case 1:
    case "LeftHanded":
      return PlayerSpecificSettings_PlayerOptions.LeftHanded;
    case 2:
    case "StaticLights":
      return PlayerSpecificSettings_PlayerOptions.StaticLights;
    case 4:
    case "NoHud":
      return PlayerSpecificSettings_PlayerOptions.NoHud;
    case 8:
    case "AdvancedHud":
      return PlayerSpecificSettings_PlayerOptions.AdvancedHud;
    case 16:
    case "ReduceDebris":
      return PlayerSpecificSettings_PlayerOptions.ReduceDebris;
    case 32:
    case "AutoPlayerHeight":
      return PlayerSpecificSettings_PlayerOptions.AutoPlayerHeight;
    case 64:
    case "NoFailEffects":
      return PlayerSpecificSettings_PlayerOptions.NoFailEffects;
    case 128:
    case "AutoRestart":
      return PlayerSpecificSettings_PlayerOptions.AutoRestart;
    case 256:
    case "HideNoteSpawnEffect":
      return PlayerSpecificSettings_PlayerOptions.HideNoteSpawnEffect;
    case 512:
    case "AdaptiveSfx":
      return PlayerSpecificSettings_PlayerOptions.AdaptiveSfx;
    case -1:
    case "UNRECOGNIZED":
    default:
      return PlayerSpecificSettings_PlayerOptions.UNRECOGNIZED;
  }
}

export function playerSpecificSettings_PlayerOptionsToJSON(object: PlayerSpecificSettings_PlayerOptions): string {
  switch (object) {
    case PlayerSpecificSettings_PlayerOptions.None:
      return "None";
    case PlayerSpecificSettings_PlayerOptions.LeftHanded:
      return "LeftHanded";
    case PlayerSpecificSettings_PlayerOptions.StaticLights:
      return "StaticLights";
    case PlayerSpecificSettings_PlayerOptions.NoHud:
      return "NoHud";
    case PlayerSpecificSettings_PlayerOptions.AdvancedHud:
      return "AdvancedHud";
    case PlayerSpecificSettings_PlayerOptions.ReduceDebris:
      return "ReduceDebris";
    case PlayerSpecificSettings_PlayerOptions.AutoPlayerHeight:
      return "AutoPlayerHeight";
    case PlayerSpecificSettings_PlayerOptions.NoFailEffects:
      return "NoFailEffects";
    case PlayerSpecificSettings_PlayerOptions.AutoRestart:
      return "AutoRestart";
    case PlayerSpecificSettings_PlayerOptions.HideNoteSpawnEffect:
      return "HideNoteSpawnEffect";
    case PlayerSpecificSettings_PlayerOptions.AdaptiveSfx:
      return "AdaptiveSfx";
    case PlayerSpecificSettings_PlayerOptions.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum PlayerSpecificSettings_NoteJumpDurationTypeSettings {
  Dynamic = 0,
  Static = 1,
  UNRECOGNIZED = -1,
}

export function playerSpecificSettings_NoteJumpDurationTypeSettingsFromJSON(
  object: any,
): PlayerSpecificSettings_NoteJumpDurationTypeSettings {
  switch (object) {
    case 0:
    case "Dynamic":
      return PlayerSpecificSettings_NoteJumpDurationTypeSettings.Dynamic;
    case 1:
    case "Static":
      return PlayerSpecificSettings_NoteJumpDurationTypeSettings.Static;
    case -1:
    case "UNRECOGNIZED":
    default:
      return PlayerSpecificSettings_NoteJumpDurationTypeSettings.UNRECOGNIZED;
  }
}

export function playerSpecificSettings_NoteJumpDurationTypeSettingsToJSON(
  object: PlayerSpecificSettings_NoteJumpDurationTypeSettings,
): string {
  switch (object) {
    case PlayerSpecificSettings_NoteJumpDurationTypeSettings.Dynamic:
      return "Dynamic";
    case PlayerSpecificSettings_NoteJumpDurationTypeSettings.Static:
      return "Static";
    case PlayerSpecificSettings_NoteJumpDurationTypeSettings.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface GameplayParameters {
  beatmap?: Beatmap;
  playerSettings?: PlayerSpecificSettings;
  gameplayModifiers?: GameplayModifiers;
}

export interface Team {
  id?: string;
  name?: string;
}

export interface ServerSettings {
  serverName?: string;
  password?: string;
  enableTeams?: boolean;
  teams?: Team[];
  scoreUpdateFrequency?: number;
  bannedMods?: string[];
}

export interface SongList {
  levels?: PreviewBeatmapLevel[];
}

export interface User {
  guid?: string;
  name?: string;
  userId?: string;
  clientType?: User_ClientTypes;
  team?: Team;
  playState?: User_PlayStates;
  downloadState?: User_DownloadStates;
  modList?: string[];
  streamScreenCoordinates?: User_Point;
  streamDelayMs?: number;
  streamSyncStartMs?: number;
}

export enum User_PlayStates {
  Waiting = 0,
  InGame = 1,
  UNRECOGNIZED = -1,
}

export function user_PlayStatesFromJSON(object: any): User_PlayStates {
  switch (object) {
    case 0:
    case "Waiting":
      return User_PlayStates.Waiting;
    case 1:
    case "InGame":
      return User_PlayStates.InGame;
    case -1:
    case "UNRECOGNIZED":
    default:
      return User_PlayStates.UNRECOGNIZED;
  }
}

export function user_PlayStatesToJSON(object: User_PlayStates): string {
  switch (object) {
    case User_PlayStates.Waiting:
      return "Waiting";
    case User_PlayStates.InGame:
      return "InGame";
    case User_PlayStates.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum User_DownloadStates {
  None = 0,
  Downloading = 1,
  Downloaded = 2,
  DownloadError = 3,
  UNRECOGNIZED = -1,
}

export function user_DownloadStatesFromJSON(object: any): User_DownloadStates {
  switch (object) {
    case 0:
    case "None":
      return User_DownloadStates.None;
    case 1:
    case "Downloading":
      return User_DownloadStates.Downloading;
    case 2:
    case "Downloaded":
      return User_DownloadStates.Downloaded;
    case 3:
    case "DownloadError":
      return User_DownloadStates.DownloadError;
    case -1:
    case "UNRECOGNIZED":
    default:
      return User_DownloadStates.UNRECOGNIZED;
  }
}

export function user_DownloadStatesToJSON(object: User_DownloadStates): string {
  switch (object) {
    case User_DownloadStates.None:
      return "None";
    case User_DownloadStates.Downloading:
      return "Downloading";
    case User_DownloadStates.Downloaded:
      return "Downloaded";
    case User_DownloadStates.DownloadError:
      return "DownloadError";
    case User_DownloadStates.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum User_ClientTypes {
  Player = 0,
  Coordinator = 1,
  TemporaryConnection = 2,
  WebsocketConnection = 3,
  UNRECOGNIZED = -1,
}

export function user_ClientTypesFromJSON(object: any): User_ClientTypes {
  switch (object) {
    case 0:
    case "Player":
      return User_ClientTypes.Player;
    case 1:
    case "Coordinator":
      return User_ClientTypes.Coordinator;
    case 2:
    case "TemporaryConnection":
      return User_ClientTypes.TemporaryConnection;
    case 3:
    case "WebsocketConnection":
      return User_ClientTypes.WebsocketConnection;
    case -1:
    case "UNRECOGNIZED":
    default:
      return User_ClientTypes.UNRECOGNIZED;
  }
}

export function user_ClientTypesToJSON(object: User_ClientTypes): string {
  switch (object) {
    case User_ClientTypes.Player:
      return "Player";
    case User_ClientTypes.Coordinator:
      return "Coordinator";
    case User_ClientTypes.TemporaryConnection:
      return "TemporaryConnection";
    case User_ClientTypes.WebsocketConnection:
      return "WebsocketConnection";
    case User_ClientTypes.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface User_Point {
  x?: number;
  y?: number;
}

export interface Match {
  guid?: string;
  associatedUsers?: string[];
  leader?: string;
  selectedLevel?: PreviewBeatmapLevel;
  selectedCharacteristic?: Characteristic;
  selectedDifficulty?: number;
  startTime?: string;
}

export interface QualifierEvent {
  guid?: string;
  name?: string;
  guild?: Guild;
  infoChannel?: Channel;
  qualifierMaps?: GameplayParameters[];
  sendScoresToInfoChannel?: boolean;
  flags?: number;
}

export enum QualifierEvent_EventSettings {
  None = 0,
  HideScoresFromPlayers = 1,
  DisableScoresaberSubmission = 2,
  EnableLeaderboardMessage = 4,
  UNRECOGNIZED = -1,
}

export function qualifierEvent_EventSettingsFromJSON(object: any): QualifierEvent_EventSettings {
  switch (object) {
    case 0:
    case "None":
      return QualifierEvent_EventSettings.None;
    case 1:
    case "HideScoresFromPlayers":
      return QualifierEvent_EventSettings.HideScoresFromPlayers;
    case 2:
    case "DisableScoresaberSubmission":
      return QualifierEvent_EventSettings.DisableScoresaberSubmission;
    case 4:
    case "EnableLeaderboardMessage":
      return QualifierEvent_EventSettings.EnableLeaderboardMessage;
    case -1:
    case "UNRECOGNIZED":
    default:
      return QualifierEvent_EventSettings.UNRECOGNIZED;
  }
}

export function qualifierEvent_EventSettingsToJSON(object: QualifierEvent_EventSettings): string {
  switch (object) {
    case QualifierEvent_EventSettings.None:
      return "None";
    case QualifierEvent_EventSettings.HideScoresFromPlayers:
      return "HideScoresFromPlayers";
    case QualifierEvent_EventSettings.DisableScoresaberSubmission:
      return "DisableScoresaberSubmission";
    case QualifierEvent_EventSettings.EnableLeaderboardMessage:
      return "EnableLeaderboardMessage";
    case QualifierEvent_EventSettings.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface CoreServer {
  name?: string;
  address?: string;
  port?: number;
}

export interface State {
  serverSettings?: ServerSettings;
  users?: User[];
  matches?: Match[];
  events?: QualifierEvent[];
  knownHosts?: CoreServer[];
}

export interface LeaderboardScore {
  eventId?: string;
  parameters?: GameplayParameters;
  userId?: string;
  username?: string;
  score?: number;
  fullCombo?: boolean;
  color?: string;
}

export interface ModalOption {
  label?: string;
  value?: string;
}

export interface ScoreTrackerHand {
  hit?: number;
  miss?: number;
  badCut?: number;
  avgCut?: number[];
}

export interface ScoreTracker {
  notesMissed?: number;
  badCuts?: number;
  bombHits?: number;
  wallHits?: number;
  maxCombo?: number;
  leftHand?: ScoreTrackerHand;
  rightHand?: ScoreTrackerHand;
}

function createBaseCharacteristic(): Characteristic {
  return { serializedName: "", difficulties: [] };
}

export const Characteristic = {
  encode(message: Characteristic, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.serializedName !== undefined && message.serializedName !== "") {
      writer.uint32(10).string(message.serializedName);
    }
    if (message.difficulties !== undefined && message.difficulties.length !== 0) {
      writer.uint32(18).fork();
      for (const v of message.difficulties) {
        writer.int32(v);
      }
      writer.ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Characteristic {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCharacteristic();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.serializedName = reader.string();
          break;
        case 2:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.difficulties!.push(reader.int32());
            }
          } else {
            message.difficulties!.push(reader.int32());
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Characteristic {
    return {
      serializedName: isSet(object.serializedName) ? String(object.serializedName) : "",
      difficulties: Array.isArray(object?.difficulties) ? object.difficulties.map((e: any) => Number(e)) : [],
    };
  },

  toJSON(message: Characteristic): unknown {
    const obj: any = {};
    message.serializedName !== undefined && (obj.serializedName = message.serializedName);
    if (message.difficulties) {
      obj.difficulties = message.difficulties.map((e) => Math.round(e));
    } else {
      obj.difficulties = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Characteristic>, I>>(object: I): Characteristic {
    const message = createBaseCharacteristic();
    message.serializedName = object.serializedName ?? "";
    message.difficulties = object.difficulties?.map((e) => e) || [];
    return message;
  },
};

function createBaseBeatmap(): Beatmap {
  return { name: "", levelId: "", characteristic: undefined, difficulty: 0 };
}

export const Beatmap = {
  encode(message: Beatmap, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.levelId !== undefined && message.levelId !== "") {
      writer.uint32(18).string(message.levelId);
    }
    if (message.characteristic !== undefined) {
      Characteristic.encode(message.characteristic, writer.uint32(26).fork()).ldelim();
    }
    if (message.difficulty !== undefined && message.difficulty !== 0) {
      writer.uint32(32).int32(message.difficulty);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Beatmap {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBeatmap();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.levelId = reader.string();
          break;
        case 3:
          message.characteristic = Characteristic.decode(reader, reader.uint32());
          break;
        case 4:
          message.difficulty = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Beatmap {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      levelId: isSet(object.levelId) ? String(object.levelId) : "",
      characteristic: isSet(object.characteristic) ? Characteristic.fromJSON(object.characteristic) : undefined,
      difficulty: isSet(object.difficulty) ? Number(object.difficulty) : 0,
    };
  },

  toJSON(message: Beatmap): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.levelId !== undefined && (obj.levelId = message.levelId);
    message.characteristic !== undefined &&
      (obj.characteristic = message.characteristic ? Characteristic.toJSON(message.characteristic) : undefined);
    message.difficulty !== undefined && (obj.difficulty = Math.round(message.difficulty));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Beatmap>, I>>(object: I): Beatmap {
    const message = createBaseBeatmap();
    message.name = object.name ?? "";
    message.levelId = object.levelId ?? "";
    message.characteristic = (object.characteristic !== undefined && object.characteristic !== null)
      ? Characteristic.fromPartial(object.characteristic)
      : undefined;
    message.difficulty = object.difficulty ?? 0;
    return message;
  },
};

function createBasePreviewBeatmapLevel(): PreviewBeatmapLevel {
  return { levelId: "", name: "", characteristics: [], loaded: false };
}

export const PreviewBeatmapLevel = {
  encode(message: PreviewBeatmapLevel, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.levelId !== undefined && message.levelId !== "") {
      writer.uint32(10).string(message.levelId);
    }
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.characteristics !== undefined && message.characteristics.length !== 0) {
      for (const v of message.characteristics) {
        Characteristic.encode(v!, writer.uint32(26).fork()).ldelim();
      }
    }
    if (message.loaded === true) {
      writer.uint32(32).bool(message.loaded);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PreviewBeatmapLevel {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePreviewBeatmapLevel();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.levelId = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.characteristics!.push(Characteristic.decode(reader, reader.uint32()));
          break;
        case 4:
          message.loaded = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PreviewBeatmapLevel {
    return {
      levelId: isSet(object.levelId) ? String(object.levelId) : "",
      name: isSet(object.name) ? String(object.name) : "",
      characteristics: Array.isArray(object?.characteristics)
        ? object.characteristics.map((e: any) => Characteristic.fromJSON(e))
        : [],
      loaded: isSet(object.loaded) ? Boolean(object.loaded) : false,
    };
  },

  toJSON(message: PreviewBeatmapLevel): unknown {
    const obj: any = {};
    message.levelId !== undefined && (obj.levelId = message.levelId);
    message.name !== undefined && (obj.name = message.name);
    if (message.characteristics) {
      obj.characteristics = message.characteristics.map((e) => e ? Characteristic.toJSON(e) : undefined);
    } else {
      obj.characteristics = [];
    }
    message.loaded !== undefined && (obj.loaded = message.loaded);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PreviewBeatmapLevel>, I>>(object: I): PreviewBeatmapLevel {
    const message = createBasePreviewBeatmapLevel();
    message.levelId = object.levelId ?? "";
    message.name = object.name ?? "";
    message.characteristics = object.characteristics?.map((e) => Characteristic.fromPartial(e)) || [];
    message.loaded = object.loaded ?? false;
    return message;
  },
};

function createBaseGameplayModifiers(): GameplayModifiers {
  return { options: 0 };
}

export const GameplayModifiers = {
  encode(message: GameplayModifiers, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.options !== undefined && message.options !== 0) {
      writer.uint32(8).int32(message.options);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GameplayModifiers {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGameplayModifiers();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.options = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GameplayModifiers {
    return { options: isSet(object.options) ? gameplayModifiers_GameOptionsFromJSON(object.options) : 0 };
  },

  toJSON(message: GameplayModifiers): unknown {
    const obj: any = {};
    message.options !== undefined && (obj.options = gameplayModifiers_GameOptionsToJSON(message.options));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GameplayModifiers>, I>>(object: I): GameplayModifiers {
    const message = createBaseGameplayModifiers();
    message.options = object.options ?? 0;
    return message;
  },
};

function createBasePlayerSpecificSettings(): PlayerSpecificSettings {
  return {
    playerHeight: 0,
    sfxVolume: 0,
    saberTrailIntensity: 0,
    noteJumpStartBeatOffset: 0,
    noteJumpFixedDuration: 0,
    options: 0,
    noteJumpDurationTypeSettings: 0,
  };
}

export const PlayerSpecificSettings = {
  encode(message: PlayerSpecificSettings, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.playerHeight !== undefined && message.playerHeight !== 0) {
      writer.uint32(13).float(message.playerHeight);
    }
    if (message.sfxVolume !== undefined && message.sfxVolume !== 0) {
      writer.uint32(21).float(message.sfxVolume);
    }
    if (message.saberTrailIntensity !== undefined && message.saberTrailIntensity !== 0) {
      writer.uint32(29).float(message.saberTrailIntensity);
    }
    if (message.noteJumpStartBeatOffset !== undefined && message.noteJumpStartBeatOffset !== 0) {
      writer.uint32(37).float(message.noteJumpStartBeatOffset);
    }
    if (message.noteJumpFixedDuration !== undefined && message.noteJumpFixedDuration !== 0) {
      writer.uint32(45).float(message.noteJumpFixedDuration);
    }
    if (message.options !== undefined && message.options !== 0) {
      writer.uint32(48).int32(message.options);
    }
    if (message.noteJumpDurationTypeSettings !== undefined && message.noteJumpDurationTypeSettings !== 0) {
      writer.uint32(56).int32(message.noteJumpDurationTypeSettings);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PlayerSpecificSettings {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePlayerSpecificSettings();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.playerHeight = reader.float();
          break;
        case 2:
          message.sfxVolume = reader.float();
          break;
        case 3:
          message.saberTrailIntensity = reader.float();
          break;
        case 4:
          message.noteJumpStartBeatOffset = reader.float();
          break;
        case 5:
          message.noteJumpFixedDuration = reader.float();
          break;
        case 6:
          message.options = reader.int32() as any;
          break;
        case 7:
          message.noteJumpDurationTypeSettings = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PlayerSpecificSettings {
    return {
      playerHeight: isSet(object.playerHeight) ? Number(object.playerHeight) : 0,
      sfxVolume: isSet(object.sfxVolume) ? Number(object.sfxVolume) : 0,
      saberTrailIntensity: isSet(object.saberTrailIntensity) ? Number(object.saberTrailIntensity) : 0,
      noteJumpStartBeatOffset: isSet(object.noteJumpStartBeatOffset) ? Number(object.noteJumpStartBeatOffset) : 0,
      noteJumpFixedDuration: isSet(object.noteJumpFixedDuration) ? Number(object.noteJumpFixedDuration) : 0,
      options: isSet(object.options) ? playerSpecificSettings_PlayerOptionsFromJSON(object.options) : 0,
      noteJumpDurationTypeSettings: isSet(object.noteJumpDurationTypeSettings)
        ? playerSpecificSettings_NoteJumpDurationTypeSettingsFromJSON(object.noteJumpDurationTypeSettings)
        : 0,
    };
  },

  toJSON(message: PlayerSpecificSettings): unknown {
    const obj: any = {};
    message.playerHeight !== undefined && (obj.playerHeight = message.playerHeight);
    message.sfxVolume !== undefined && (obj.sfxVolume = message.sfxVolume);
    message.saberTrailIntensity !== undefined && (obj.saberTrailIntensity = message.saberTrailIntensity);
    message.noteJumpStartBeatOffset !== undefined && (obj.noteJumpStartBeatOffset = message.noteJumpStartBeatOffset);
    message.noteJumpFixedDuration !== undefined && (obj.noteJumpFixedDuration = message.noteJumpFixedDuration);
    message.options !== undefined && (obj.options = playerSpecificSettings_PlayerOptionsToJSON(message.options));
    message.noteJumpDurationTypeSettings !== undefined &&
      (obj.noteJumpDurationTypeSettings = playerSpecificSettings_NoteJumpDurationTypeSettingsToJSON(
        message.noteJumpDurationTypeSettings,
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PlayerSpecificSettings>, I>>(object: I): PlayerSpecificSettings {
    const message = createBasePlayerSpecificSettings();
    message.playerHeight = object.playerHeight ?? 0;
    message.sfxVolume = object.sfxVolume ?? 0;
    message.saberTrailIntensity = object.saberTrailIntensity ?? 0;
    message.noteJumpStartBeatOffset = object.noteJumpStartBeatOffset ?? 0;
    message.noteJumpFixedDuration = object.noteJumpFixedDuration ?? 0;
    message.options = object.options ?? 0;
    message.noteJumpDurationTypeSettings = object.noteJumpDurationTypeSettings ?? 0;
    return message;
  },
};

function createBaseGameplayParameters(): GameplayParameters {
  return { beatmap: undefined, playerSettings: undefined, gameplayModifiers: undefined };
}

export const GameplayParameters = {
  encode(message: GameplayParameters, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.beatmap !== undefined) {
      Beatmap.encode(message.beatmap, writer.uint32(10).fork()).ldelim();
    }
    if (message.playerSettings !== undefined) {
      PlayerSpecificSettings.encode(message.playerSettings, writer.uint32(18).fork()).ldelim();
    }
    if (message.gameplayModifiers !== undefined) {
      GameplayModifiers.encode(message.gameplayModifiers, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GameplayParameters {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGameplayParameters();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.beatmap = Beatmap.decode(reader, reader.uint32());
          break;
        case 2:
          message.playerSettings = PlayerSpecificSettings.decode(reader, reader.uint32());
          break;
        case 3:
          message.gameplayModifiers = GameplayModifiers.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GameplayParameters {
    return {
      beatmap: isSet(object.beatmap) ? Beatmap.fromJSON(object.beatmap) : undefined,
      playerSettings: isSet(object.playerSettings) ? PlayerSpecificSettings.fromJSON(object.playerSettings) : undefined,
      gameplayModifiers: isSet(object.gameplayModifiers)
        ? GameplayModifiers.fromJSON(object.gameplayModifiers)
        : undefined,
    };
  },

  toJSON(message: GameplayParameters): unknown {
    const obj: any = {};
    message.beatmap !== undefined && (obj.beatmap = message.beatmap ? Beatmap.toJSON(message.beatmap) : undefined);
    message.playerSettings !== undefined &&
      (obj.playerSettings = message.playerSettings ? PlayerSpecificSettings.toJSON(message.playerSettings) : undefined);
    message.gameplayModifiers !== undefined && (obj.gameplayModifiers = message.gameplayModifiers
      ? GameplayModifiers.toJSON(message.gameplayModifiers)
      : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GameplayParameters>, I>>(object: I): GameplayParameters {
    const message = createBaseGameplayParameters();
    message.beatmap = (object.beatmap !== undefined && object.beatmap !== null)
      ? Beatmap.fromPartial(object.beatmap)
      : undefined;
    message.playerSettings = (object.playerSettings !== undefined && object.playerSettings !== null)
      ? PlayerSpecificSettings.fromPartial(object.playerSettings)
      : undefined;
    message.gameplayModifiers = (object.gameplayModifiers !== undefined && object.gameplayModifiers !== null)
      ? GameplayModifiers.fromPartial(object.gameplayModifiers)
      : undefined;
    return message;
  },
};

function createBaseTeam(): Team {
  return { id: "", name: "" };
}

export const Team = {
  encode(message: Team, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined && message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Team {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTeam();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Team {
    return { id: isSet(object.id) ? String(object.id) : "", name: isSet(object.name) ? String(object.name) : "" };
  },

  toJSON(message: Team): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Team>, I>>(object: I): Team {
    const message = createBaseTeam();
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    return message;
  },
};

function createBaseServerSettings(): ServerSettings {
  return { serverName: "", password: "", enableTeams: false, teams: [], scoreUpdateFrequency: 0, bannedMods: [] };
}

export const ServerSettings = {
  encode(message: ServerSettings, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.serverName !== undefined && message.serverName !== "") {
      writer.uint32(10).string(message.serverName);
    }
    if (message.password !== undefined && message.password !== "") {
      writer.uint32(18).string(message.password);
    }
    if (message.enableTeams === true) {
      writer.uint32(24).bool(message.enableTeams);
    }
    if (message.teams !== undefined && message.teams.length !== 0) {
      for (const v of message.teams) {
        Team.encode(v!, writer.uint32(34).fork()).ldelim();
      }
    }
    if (message.scoreUpdateFrequency !== undefined && message.scoreUpdateFrequency !== 0) {
      writer.uint32(40).int32(message.scoreUpdateFrequency);
    }
    if (message.bannedMods !== undefined && message.bannedMods.length !== 0) {
      for (const v of message.bannedMods) {
        writer.uint32(50).string(v!);
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ServerSettings {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseServerSettings();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.serverName = reader.string();
          break;
        case 2:
          message.password = reader.string();
          break;
        case 3:
          message.enableTeams = reader.bool();
          break;
        case 4:
          message.teams!.push(Team.decode(reader, reader.uint32()));
          break;
        case 5:
          message.scoreUpdateFrequency = reader.int32();
          break;
        case 6:
          message.bannedMods!.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ServerSettings {
    return {
      serverName: isSet(object.serverName) ? String(object.serverName) : "",
      password: isSet(object.password) ? String(object.password) : "",
      enableTeams: isSet(object.enableTeams) ? Boolean(object.enableTeams) : false,
      teams: Array.isArray(object?.teams) ? object.teams.map((e: any) => Team.fromJSON(e)) : [],
      scoreUpdateFrequency: isSet(object.scoreUpdateFrequency) ? Number(object.scoreUpdateFrequency) : 0,
      bannedMods: Array.isArray(object?.bannedMods) ? object.bannedMods.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: ServerSettings): unknown {
    const obj: any = {};
    message.serverName !== undefined && (obj.serverName = message.serverName);
    message.password !== undefined && (obj.password = message.password);
    message.enableTeams !== undefined && (obj.enableTeams = message.enableTeams);
    if (message.teams) {
      obj.teams = message.teams.map((e) => e ? Team.toJSON(e) : undefined);
    } else {
      obj.teams = [];
    }
    message.scoreUpdateFrequency !== undefined && (obj.scoreUpdateFrequency = Math.round(message.scoreUpdateFrequency));
    if (message.bannedMods) {
      obj.bannedMods = message.bannedMods.map((e) => e);
    } else {
      obj.bannedMods = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ServerSettings>, I>>(object: I): ServerSettings {
    const message = createBaseServerSettings();
    message.serverName = object.serverName ?? "";
    message.password = object.password ?? "";
    message.enableTeams = object.enableTeams ?? false;
    message.teams = object.teams?.map((e) => Team.fromPartial(e)) || [];
    message.scoreUpdateFrequency = object.scoreUpdateFrequency ?? 0;
    message.bannedMods = object.bannedMods?.map((e) => e) || [];
    return message;
  },
};

function createBaseSongList(): SongList {
  return { levels: [] };
}

export const SongList = {
  encode(message: SongList, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.levels !== undefined && message.levels.length !== 0) {
      for (const v of message.levels) {
        PreviewBeatmapLevel.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SongList {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSongList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.levels!.push(PreviewBeatmapLevel.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SongList {
    return {
      levels: Array.isArray(object?.levels) ? object.levels.map((e: any) => PreviewBeatmapLevel.fromJSON(e)) : [],
    };
  },

  toJSON(message: SongList): unknown {
    const obj: any = {};
    if (message.levels) {
      obj.levels = message.levels.map((e) => e ? PreviewBeatmapLevel.toJSON(e) : undefined);
    } else {
      obj.levels = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SongList>, I>>(object: I): SongList {
    const message = createBaseSongList();
    message.levels = object.levels?.map((e) => PreviewBeatmapLevel.fromPartial(e)) || [];
    return message;
  },
};

function createBaseUser(): User {
  return {
    guid: "",
    name: "",
    userId: "",
    clientType: 0,
    team: undefined,
    playState: 0,
    downloadState: 0,
    modList: [],
    streamScreenCoordinates: undefined,
    streamDelayMs: 0,
    streamSyncStartMs: 0,
  };
}

export const User = {
  encode(message: User, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.guid !== undefined && message.guid !== "") {
      writer.uint32(10).string(message.guid);
    }
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.userId !== undefined && message.userId !== "") {
      writer.uint32(26).string(message.userId);
    }
    if (message.clientType !== undefined && message.clientType !== 0) {
      writer.uint32(32).int32(message.clientType);
    }
    if (message.team !== undefined) {
      Team.encode(message.team, writer.uint32(42).fork()).ldelim();
    }
    if (message.playState !== undefined && message.playState !== 0) {
      writer.uint32(48).int32(message.playState);
    }
    if (message.downloadState !== undefined && message.downloadState !== 0) {
      writer.uint32(56).int32(message.downloadState);
    }
    if (message.modList !== undefined && message.modList.length !== 0) {
      for (const v of message.modList) {
        writer.uint32(66).string(v!);
      }
    }
    if (message.streamScreenCoordinates !== undefined) {
      User_Point.encode(message.streamScreenCoordinates, writer.uint32(74).fork()).ldelim();
    }
    if (message.streamDelayMs !== undefined && message.streamDelayMs !== 0) {
      writer.uint32(80).int64(message.streamDelayMs);
    }
    if (message.streamSyncStartMs !== undefined && message.streamSyncStartMs !== 0) {
      writer.uint32(88).int64(message.streamSyncStartMs);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): User {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUser();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guid = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.userId = reader.string();
          break;
        case 4:
          message.clientType = reader.int32() as any;
          break;
        case 5:
          message.team = Team.decode(reader, reader.uint32());
          break;
        case 6:
          message.playState = reader.int32() as any;
          break;
        case 7:
          message.downloadState = reader.int32() as any;
          break;
        case 8:
          message.modList!.push(reader.string());
          break;
        case 9:
          message.streamScreenCoordinates = User_Point.decode(reader, reader.uint32());
          break;
        case 10:
          message.streamDelayMs = longToNumber(reader.int64() as Long);
          break;
        case 11:
          message.streamSyncStartMs = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): User {
    return {
      guid: isSet(object.guid) ? String(object.guid) : "",
      name: isSet(object.name) ? String(object.name) : "",
      userId: isSet(object.userId) ? String(object.userId) : "",
      clientType: isSet(object.clientType) ? user_ClientTypesFromJSON(object.clientType) : 0,
      team: isSet(object.team) ? Team.fromJSON(object.team) : undefined,
      playState: isSet(object.playState) ? user_PlayStatesFromJSON(object.playState) : 0,
      downloadState: isSet(object.downloadState) ? user_DownloadStatesFromJSON(object.downloadState) : 0,
      modList: Array.isArray(object?.modList) ? object.modList.map((e: any) => String(e)) : [],
      streamScreenCoordinates: isSet(object.streamScreenCoordinates)
        ? User_Point.fromJSON(object.streamScreenCoordinates)
        : undefined,
      streamDelayMs: isSet(object.streamDelayMs) ? Number(object.streamDelayMs) : 0,
      streamSyncStartMs: isSet(object.streamSyncStartMs) ? Number(object.streamSyncStartMs) : 0,
    };
  },

  toJSON(message: User): unknown {
    const obj: any = {};
    message.guid !== undefined && (obj.guid = message.guid);
    message.name !== undefined && (obj.name = message.name);
    message.userId !== undefined && (obj.userId = message.userId);
    message.clientType !== undefined && (obj.clientType = user_ClientTypesToJSON(message.clientType));
    message.team !== undefined && (obj.team = message.team ? Team.toJSON(message.team) : undefined);
    message.playState !== undefined && (obj.playState = user_PlayStatesToJSON(message.playState));
    message.downloadState !== undefined && (obj.downloadState = user_DownloadStatesToJSON(message.downloadState));
    if (message.modList) {
      obj.modList = message.modList.map((e) => e);
    } else {
      obj.modList = [];
    }
    message.streamScreenCoordinates !== undefined && (obj.streamScreenCoordinates = message.streamScreenCoordinates
      ? User_Point.toJSON(message.streamScreenCoordinates)
      : undefined);
    message.streamDelayMs !== undefined && (obj.streamDelayMs = Math.round(message.streamDelayMs));
    message.streamSyncStartMs !== undefined && (obj.streamSyncStartMs = Math.round(message.streamSyncStartMs));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<User>, I>>(object: I): User {
    const message = createBaseUser();
    message.guid = object.guid ?? "";
    message.name = object.name ?? "";
    message.userId = object.userId ?? "";
    message.clientType = object.clientType ?? 0;
    message.team = (object.team !== undefined && object.team !== null) ? Team.fromPartial(object.team) : undefined;
    message.playState = object.playState ?? 0;
    message.downloadState = object.downloadState ?? 0;
    message.modList = object.modList?.map((e) => e) || [];
    message.streamScreenCoordinates =
      (object.streamScreenCoordinates !== undefined && object.streamScreenCoordinates !== null)
        ? User_Point.fromPartial(object.streamScreenCoordinates)
        : undefined;
    message.streamDelayMs = object.streamDelayMs ?? 0;
    message.streamSyncStartMs = object.streamSyncStartMs ?? 0;
    return message;
  },
};

function createBaseUser_Point(): User_Point {
  return { x: 0, y: 0 };
}

export const User_Point = {
  encode(message: User_Point, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.x !== undefined && message.x !== 0) {
      writer.uint32(8).int32(message.x);
    }
    if (message.y !== undefined && message.y !== 0) {
      writer.uint32(16).int32(message.y);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): User_Point {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUser_Point();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.x = reader.int32();
          break;
        case 2:
          message.y = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): User_Point {
    return { x: isSet(object.x) ? Number(object.x) : 0, y: isSet(object.y) ? Number(object.y) : 0 };
  },

  toJSON(message: User_Point): unknown {
    const obj: any = {};
    message.x !== undefined && (obj.x = Math.round(message.x));
    message.y !== undefined && (obj.y = Math.round(message.y));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<User_Point>, I>>(object: I): User_Point {
    const message = createBaseUser_Point();
    message.x = object.x ?? 0;
    message.y = object.y ?? 0;
    return message;
  },
};

function createBaseMatch(): Match {
  return {
    guid: "",
    associatedUsers: [],
    leader: "",
    selectedLevel: undefined,
    selectedCharacteristic: undefined,
    selectedDifficulty: 0,
    startTime: "",
  };
}

export const Match = {
  encode(message: Match, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.guid !== undefined && message.guid !== "") {
      writer.uint32(10).string(message.guid);
    }
    if (message.associatedUsers !== undefined && message.associatedUsers.length !== 0) {
      for (const v of message.associatedUsers) {
        writer.uint32(18).string(v!);
      }
    }
    if (message.leader !== undefined && message.leader !== "") {
      writer.uint32(26).string(message.leader);
    }
    if (message.selectedLevel !== undefined) {
      PreviewBeatmapLevel.encode(message.selectedLevel, writer.uint32(42).fork()).ldelim();
    }
    if (message.selectedCharacteristic !== undefined) {
      Characteristic.encode(message.selectedCharacteristic, writer.uint32(50).fork()).ldelim();
    }
    if (message.selectedDifficulty !== undefined && message.selectedDifficulty !== 0) {
      writer.uint32(56).int32(message.selectedDifficulty);
    }
    if (message.startTime !== undefined && message.startTime !== "") {
      writer.uint32(66).string(message.startTime);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Match {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMatch();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guid = reader.string();
          break;
        case 2:
          message.associatedUsers!.push(reader.string());
          break;
        case 3:
          message.leader = reader.string();
          break;
        case 5:
          message.selectedLevel = PreviewBeatmapLevel.decode(reader, reader.uint32());
          break;
        case 6:
          message.selectedCharacteristic = Characteristic.decode(reader, reader.uint32());
          break;
        case 7:
          message.selectedDifficulty = reader.int32();
          break;
        case 8:
          message.startTime = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Match {
    return {
      guid: isSet(object.guid) ? String(object.guid) : "",
      associatedUsers: Array.isArray(object?.associatedUsers) ? object.associatedUsers.map((e: any) => String(e)) : [],
      leader: isSet(object.leader) ? String(object.leader) : "",
      selectedLevel: isSet(object.selectedLevel) ? PreviewBeatmapLevel.fromJSON(object.selectedLevel) : undefined,
      selectedCharacteristic: isSet(object.selectedCharacteristic)
        ? Characteristic.fromJSON(object.selectedCharacteristic)
        : undefined,
      selectedDifficulty: isSet(object.selectedDifficulty) ? Number(object.selectedDifficulty) : 0,
      startTime: isSet(object.startTime) ? String(object.startTime) : "",
    };
  },

  toJSON(message: Match): unknown {
    const obj: any = {};
    message.guid !== undefined && (obj.guid = message.guid);
    if (message.associatedUsers) {
      obj.associatedUsers = message.associatedUsers.map((e) => e);
    } else {
      obj.associatedUsers = [];
    }
    message.leader !== undefined && (obj.leader = message.leader);
    message.selectedLevel !== undefined &&
      (obj.selectedLevel = message.selectedLevel ? PreviewBeatmapLevel.toJSON(message.selectedLevel) : undefined);
    message.selectedCharacteristic !== undefined && (obj.selectedCharacteristic = message.selectedCharacteristic
      ? Characteristic.toJSON(message.selectedCharacteristic)
      : undefined);
    message.selectedDifficulty !== undefined && (obj.selectedDifficulty = Math.round(message.selectedDifficulty));
    message.startTime !== undefined && (obj.startTime = message.startTime);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Match>, I>>(object: I): Match {
    const message = createBaseMatch();
    message.guid = object.guid ?? "";
    message.associatedUsers = object.associatedUsers?.map((e) => e) || [];
    message.leader = object.leader ?? "";
    message.selectedLevel = (object.selectedLevel !== undefined && object.selectedLevel !== null)
      ? PreviewBeatmapLevel.fromPartial(object.selectedLevel)
      : undefined;
    message.selectedCharacteristic =
      (object.selectedCharacteristic !== undefined && object.selectedCharacteristic !== null)
        ? Characteristic.fromPartial(object.selectedCharacteristic)
        : undefined;
    message.selectedDifficulty = object.selectedDifficulty ?? 0;
    message.startTime = object.startTime ?? "";
    return message;
  },
};

function createBaseQualifierEvent(): QualifierEvent {
  return {
    guid: "",
    name: "",
    guild: undefined,
    infoChannel: undefined,
    qualifierMaps: [],
    sendScoresToInfoChannel: false,
    flags: 0,
  };
}

export const QualifierEvent = {
  encode(message: QualifierEvent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.guid !== undefined && message.guid !== "") {
      writer.uint32(10).string(message.guid);
    }
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.guild !== undefined) {
      Guild.encode(message.guild, writer.uint32(26).fork()).ldelim();
    }
    if (message.infoChannel !== undefined) {
      Channel.encode(message.infoChannel, writer.uint32(34).fork()).ldelim();
    }
    if (message.qualifierMaps !== undefined && message.qualifierMaps.length !== 0) {
      for (const v of message.qualifierMaps) {
        GameplayParameters.encode(v!, writer.uint32(42).fork()).ldelim();
      }
    }
    if (message.sendScoresToInfoChannel === true) {
      writer.uint32(48).bool(message.sendScoresToInfoChannel);
    }
    if (message.flags !== undefined && message.flags !== 0) {
      writer.uint32(56).int32(message.flags);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QualifierEvent {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQualifierEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guid = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.guild = Guild.decode(reader, reader.uint32());
          break;
        case 4:
          message.infoChannel = Channel.decode(reader, reader.uint32());
          break;
        case 5:
          message.qualifierMaps!.push(GameplayParameters.decode(reader, reader.uint32()));
          break;
        case 6:
          message.sendScoresToInfoChannel = reader.bool();
          break;
        case 7:
          message.flags = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QualifierEvent {
    return {
      guid: isSet(object.guid) ? String(object.guid) : "",
      name: isSet(object.name) ? String(object.name) : "",
      guild: isSet(object.guild) ? Guild.fromJSON(object.guild) : undefined,
      infoChannel: isSet(object.infoChannel) ? Channel.fromJSON(object.infoChannel) : undefined,
      qualifierMaps: Array.isArray(object?.qualifierMaps)
        ? object.qualifierMaps.map((e: any) => GameplayParameters.fromJSON(e))
        : [],
      sendScoresToInfoChannel: isSet(object.sendScoresToInfoChannel) ? Boolean(object.sendScoresToInfoChannel) : false,
      flags: isSet(object.flags) ? Number(object.flags) : 0,
    };
  },

  toJSON(message: QualifierEvent): unknown {
    const obj: any = {};
    message.guid !== undefined && (obj.guid = message.guid);
    message.name !== undefined && (obj.name = message.name);
    message.guild !== undefined && (obj.guild = message.guild ? Guild.toJSON(message.guild) : undefined);
    message.infoChannel !== undefined &&
      (obj.infoChannel = message.infoChannel ? Channel.toJSON(message.infoChannel) : undefined);
    if (message.qualifierMaps) {
      obj.qualifierMaps = message.qualifierMaps.map((e) => e ? GameplayParameters.toJSON(e) : undefined);
    } else {
      obj.qualifierMaps = [];
    }
    message.sendScoresToInfoChannel !== undefined && (obj.sendScoresToInfoChannel = message.sendScoresToInfoChannel);
    message.flags !== undefined && (obj.flags = Math.round(message.flags));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QualifierEvent>, I>>(object: I): QualifierEvent {
    const message = createBaseQualifierEvent();
    message.guid = object.guid ?? "";
    message.name = object.name ?? "";
    message.guild = (object.guild !== undefined && object.guild !== null) ? Guild.fromPartial(object.guild) : undefined;
    message.infoChannel = (object.infoChannel !== undefined && object.infoChannel !== null)
      ? Channel.fromPartial(object.infoChannel)
      : undefined;
    message.qualifierMaps = object.qualifierMaps?.map((e) => GameplayParameters.fromPartial(e)) || [];
    message.sendScoresToInfoChannel = object.sendScoresToInfoChannel ?? false;
    message.flags = object.flags ?? 0;
    return message;
  },
};

function createBaseCoreServer(): CoreServer {
  return { name: "", address: "", port: 0 };
}

export const CoreServer = {
  encode(message: CoreServer, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.address !== undefined && message.address !== "") {
      writer.uint32(18).string(message.address);
    }
    if (message.port !== undefined && message.port !== 0) {
      writer.uint32(24).int32(message.port);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CoreServer {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCoreServer();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.address = reader.string();
          break;
        case 3:
          message.port = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CoreServer {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      address: isSet(object.address) ? String(object.address) : "",
      port: isSet(object.port) ? Number(object.port) : 0,
    };
  },

  toJSON(message: CoreServer): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.address !== undefined && (obj.address = message.address);
    message.port !== undefined && (obj.port = Math.round(message.port));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CoreServer>, I>>(object: I): CoreServer {
    const message = createBaseCoreServer();
    message.name = object.name ?? "";
    message.address = object.address ?? "";
    message.port = object.port ?? 0;
    return message;
  },
};

function createBaseState(): State {
  return { serverSettings: undefined, users: [], matches: [], events: [], knownHosts: [] };
}

export const State = {
  encode(message: State, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.serverSettings !== undefined) {
      ServerSettings.encode(message.serverSettings, writer.uint32(10).fork()).ldelim();
    }
    if (message.users !== undefined && message.users.length !== 0) {
      for (const v of message.users) {
        User.encode(v!, writer.uint32(18).fork()).ldelim();
      }
    }
    if (message.matches !== undefined && message.matches.length !== 0) {
      for (const v of message.matches) {
        Match.encode(v!, writer.uint32(34).fork()).ldelim();
      }
    }
    if (message.events !== undefined && message.events.length !== 0) {
      for (const v of message.events) {
        QualifierEvent.encode(v!, writer.uint32(42).fork()).ldelim();
      }
    }
    if (message.knownHosts !== undefined && message.knownHosts.length !== 0) {
      for (const v of message.knownHosts) {
        CoreServer.encode(v!, writer.uint32(50).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): State {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.serverSettings = ServerSettings.decode(reader, reader.uint32());
          break;
        case 2:
          message.users!.push(User.decode(reader, reader.uint32()));
          break;
        case 4:
          message.matches!.push(Match.decode(reader, reader.uint32()));
          break;
        case 5:
          message.events!.push(QualifierEvent.decode(reader, reader.uint32()));
          break;
        case 6:
          message.knownHosts!.push(CoreServer.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): State {
    return {
      serverSettings: isSet(object.serverSettings) ? ServerSettings.fromJSON(object.serverSettings) : undefined,
      users: Array.isArray(object?.users) ? object.users.map((e: any) => User.fromJSON(e)) : [],
      matches: Array.isArray(object?.matches) ? object.matches.map((e: any) => Match.fromJSON(e)) : [],
      events: Array.isArray(object?.events) ? object.events.map((e: any) => QualifierEvent.fromJSON(e)) : [],
      knownHosts: Array.isArray(object?.knownHosts) ? object.knownHosts.map((e: any) => CoreServer.fromJSON(e)) : [],
    };
  },

  toJSON(message: State): unknown {
    const obj: any = {};
    message.serverSettings !== undefined &&
      (obj.serverSettings = message.serverSettings ? ServerSettings.toJSON(message.serverSettings) : undefined);
    if (message.users) {
      obj.users = message.users.map((e) => e ? User.toJSON(e) : undefined);
    } else {
      obj.users = [];
    }
    if (message.matches) {
      obj.matches = message.matches.map((e) => e ? Match.toJSON(e) : undefined);
    } else {
      obj.matches = [];
    }
    if (message.events) {
      obj.events = message.events.map((e) => e ? QualifierEvent.toJSON(e) : undefined);
    } else {
      obj.events = [];
    }
    if (message.knownHosts) {
      obj.knownHosts = message.knownHosts.map((e) => e ? CoreServer.toJSON(e) : undefined);
    } else {
      obj.knownHosts = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<State>, I>>(object: I): State {
    const message = createBaseState();
    message.serverSettings = (object.serverSettings !== undefined && object.serverSettings !== null)
      ? ServerSettings.fromPartial(object.serverSettings)
      : undefined;
    message.users = object.users?.map((e) => User.fromPartial(e)) || [];
    message.matches = object.matches?.map((e) => Match.fromPartial(e)) || [];
    message.events = object.events?.map((e) => QualifierEvent.fromPartial(e)) || [];
    message.knownHosts = object.knownHosts?.map((e) => CoreServer.fromPartial(e)) || [];
    return message;
  },
};

function createBaseLeaderboardScore(): LeaderboardScore {
  return { eventId: "", parameters: undefined, userId: "", username: "", score: 0, fullCombo: false, color: "" };
}

export const LeaderboardScore = {
  encode(message: LeaderboardScore, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.eventId !== undefined && message.eventId !== "") {
      writer.uint32(10).string(message.eventId);
    }
    if (message.parameters !== undefined) {
      GameplayParameters.encode(message.parameters, writer.uint32(18).fork()).ldelim();
    }
    if (message.userId !== undefined && message.userId !== "") {
      writer.uint32(26).string(message.userId);
    }
    if (message.username !== undefined && message.username !== "") {
      writer.uint32(34).string(message.username);
    }
    if (message.score !== undefined && message.score !== 0) {
      writer.uint32(40).int32(message.score);
    }
    if (message.fullCombo === true) {
      writer.uint32(48).bool(message.fullCombo);
    }
    if (message.color !== undefined && message.color !== "") {
      writer.uint32(58).string(message.color);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LeaderboardScore {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLeaderboardScore();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.eventId = reader.string();
          break;
        case 2:
          message.parameters = GameplayParameters.decode(reader, reader.uint32());
          break;
        case 3:
          message.userId = reader.string();
          break;
        case 4:
          message.username = reader.string();
          break;
        case 5:
          message.score = reader.int32();
          break;
        case 6:
          message.fullCombo = reader.bool();
          break;
        case 7:
          message.color = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LeaderboardScore {
    return {
      eventId: isSet(object.eventId) ? String(object.eventId) : "",
      parameters: isSet(object.parameters) ? GameplayParameters.fromJSON(object.parameters) : undefined,
      userId: isSet(object.userId) ? String(object.userId) : "",
      username: isSet(object.username) ? String(object.username) : "",
      score: isSet(object.score) ? Number(object.score) : 0,
      fullCombo: isSet(object.fullCombo) ? Boolean(object.fullCombo) : false,
      color: isSet(object.color) ? String(object.color) : "",
    };
  },

  toJSON(message: LeaderboardScore): unknown {
    const obj: any = {};
    message.eventId !== undefined && (obj.eventId = message.eventId);
    message.parameters !== undefined &&
      (obj.parameters = message.parameters ? GameplayParameters.toJSON(message.parameters) : undefined);
    message.userId !== undefined && (obj.userId = message.userId);
    message.username !== undefined && (obj.username = message.username);
    message.score !== undefined && (obj.score = Math.round(message.score));
    message.fullCombo !== undefined && (obj.fullCombo = message.fullCombo);
    message.color !== undefined && (obj.color = message.color);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<LeaderboardScore>, I>>(object: I): LeaderboardScore {
    const message = createBaseLeaderboardScore();
    message.eventId = object.eventId ?? "";
    message.parameters = (object.parameters !== undefined && object.parameters !== null)
      ? GameplayParameters.fromPartial(object.parameters)
      : undefined;
    message.userId = object.userId ?? "";
    message.username = object.username ?? "";
    message.score = object.score ?? 0;
    message.fullCombo = object.fullCombo ?? false;
    message.color = object.color ?? "";
    return message;
  },
};

function createBaseModalOption(): ModalOption {
  return { label: "", value: "" };
}

export const ModalOption = {
  encode(message: ModalOption, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.label !== undefined && message.label !== "") {
      writer.uint32(10).string(message.label);
    }
    if (message.value !== undefined && message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ModalOption {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseModalOption();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.label = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ModalOption {
    return {
      label: isSet(object.label) ? String(object.label) : "",
      value: isSet(object.value) ? String(object.value) : "",
    };
  },

  toJSON(message: ModalOption): unknown {
    const obj: any = {};
    message.label !== undefined && (obj.label = message.label);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ModalOption>, I>>(object: I): ModalOption {
    const message = createBaseModalOption();
    message.label = object.label ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseScoreTrackerHand(): ScoreTrackerHand {
  return { hit: 0, miss: 0, badCut: 0, avgCut: [] };
}

export const ScoreTrackerHand = {
  encode(message: ScoreTrackerHand, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.hit !== undefined && message.hit !== 0) {
      writer.uint32(8).int32(message.hit);
    }
    if (message.miss !== undefined && message.miss !== 0) {
      writer.uint32(16).int32(message.miss);
    }
    if (message.badCut !== undefined && message.badCut !== 0) {
      writer.uint32(24).int32(message.badCut);
    }
    if (message.avgCut !== undefined && message.avgCut.length !== 0) {
      writer.uint32(34).fork();
      for (const v of message.avgCut) {
        writer.float(v);
      }
      writer.ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ScoreTrackerHand {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseScoreTrackerHand();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hit = reader.int32();
          break;
        case 2:
          message.miss = reader.int32();
          break;
        case 3:
          message.badCut = reader.int32();
          break;
        case 4:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.avgCut!.push(reader.float());
            }
          } else {
            message.avgCut!.push(reader.float());
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ScoreTrackerHand {
    return {
      hit: isSet(object.hit) ? Number(object.hit) : 0,
      miss: isSet(object.miss) ? Number(object.miss) : 0,
      badCut: isSet(object.badCut) ? Number(object.badCut) : 0,
      avgCut: Array.isArray(object?.avgCut) ? object.avgCut.map((e: any) => Number(e)) : [],
    };
  },

  toJSON(message: ScoreTrackerHand): unknown {
    const obj: any = {};
    message.hit !== undefined && (obj.hit = Math.round(message.hit));
    message.miss !== undefined && (obj.miss = Math.round(message.miss));
    message.badCut !== undefined && (obj.badCut = Math.round(message.badCut));
    if (message.avgCut) {
      obj.avgCut = message.avgCut.map((e) => e);
    } else {
      obj.avgCut = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ScoreTrackerHand>, I>>(object: I): ScoreTrackerHand {
    const message = createBaseScoreTrackerHand();
    message.hit = object.hit ?? 0;
    message.miss = object.miss ?? 0;
    message.badCut = object.badCut ?? 0;
    message.avgCut = object.avgCut?.map((e) => e) || [];
    return message;
  },
};

function createBaseScoreTracker(): ScoreTracker {
  return {
    notesMissed: 0,
    badCuts: 0,
    bombHits: 0,
    wallHits: 0,
    maxCombo: 0,
    leftHand: undefined,
    rightHand: undefined,
  };
}

export const ScoreTracker = {
  encode(message: ScoreTracker, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.notesMissed !== undefined && message.notesMissed !== 0) {
      writer.uint32(8).int32(message.notesMissed);
    }
    if (message.badCuts !== undefined && message.badCuts !== 0) {
      writer.uint32(16).int32(message.badCuts);
    }
    if (message.bombHits !== undefined && message.bombHits !== 0) {
      writer.uint32(24).int32(message.bombHits);
    }
    if (message.wallHits !== undefined && message.wallHits !== 0) {
      writer.uint32(32).int32(message.wallHits);
    }
    if (message.maxCombo !== undefined && message.maxCombo !== 0) {
      writer.uint32(40).int32(message.maxCombo);
    }
    if (message.leftHand !== undefined) {
      ScoreTrackerHand.encode(message.leftHand, writer.uint32(50).fork()).ldelim();
    }
    if (message.rightHand !== undefined) {
      ScoreTrackerHand.encode(message.rightHand, writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ScoreTracker {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseScoreTracker();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.notesMissed = reader.int32();
          break;
        case 2:
          message.badCuts = reader.int32();
          break;
        case 3:
          message.bombHits = reader.int32();
          break;
        case 4:
          message.wallHits = reader.int32();
          break;
        case 5:
          message.maxCombo = reader.int32();
          break;
        case 6:
          message.leftHand = ScoreTrackerHand.decode(reader, reader.uint32());
          break;
        case 7:
          message.rightHand = ScoreTrackerHand.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ScoreTracker {
    return {
      notesMissed: isSet(object.notesMissed) ? Number(object.notesMissed) : 0,
      badCuts: isSet(object.badCuts) ? Number(object.badCuts) : 0,
      bombHits: isSet(object.bombHits) ? Number(object.bombHits) : 0,
      wallHits: isSet(object.wallHits) ? Number(object.wallHits) : 0,
      maxCombo: isSet(object.maxCombo) ? Number(object.maxCombo) : 0,
      leftHand: isSet(object.leftHand) ? ScoreTrackerHand.fromJSON(object.leftHand) : undefined,
      rightHand: isSet(object.rightHand) ? ScoreTrackerHand.fromJSON(object.rightHand) : undefined,
    };
  },

  toJSON(message: ScoreTracker): unknown {
    const obj: any = {};
    message.notesMissed !== undefined && (obj.notesMissed = Math.round(message.notesMissed));
    message.badCuts !== undefined && (obj.badCuts = Math.round(message.badCuts));
    message.bombHits !== undefined && (obj.bombHits = Math.round(message.bombHits));
    message.wallHits !== undefined && (obj.wallHits = Math.round(message.wallHits));
    message.maxCombo !== undefined && (obj.maxCombo = Math.round(message.maxCombo));
    message.leftHand !== undefined &&
      (obj.leftHand = message.leftHand ? ScoreTrackerHand.toJSON(message.leftHand) : undefined);
    message.rightHand !== undefined &&
      (obj.rightHand = message.rightHand ? ScoreTrackerHand.toJSON(message.rightHand) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ScoreTracker>, I>>(object: I): ScoreTracker {
    const message = createBaseScoreTracker();
    message.notesMissed = object.notesMissed ?? 0;
    message.badCuts = object.badCuts ?? 0;
    message.bombHits = object.bombHits ?? 0;
    message.wallHits = object.wallHits ?? 0;
    message.maxCombo = object.maxCombo ?? 0;
    message.leftHand = (object.leftHand !== undefined && object.leftHand !== null)
      ? ScoreTrackerHand.fromPartial(object.leftHand)
      : undefined;
    message.rightHand = (object.rightHand !== undefined && object.rightHand !== null)
      ? ScoreTrackerHand.fromPartial(object.rightHand)
      : undefined;
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
