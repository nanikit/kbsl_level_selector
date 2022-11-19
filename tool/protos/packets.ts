/* eslint-disable */
import _m0 from "https://esm.sh/protobufjs@7.1.2";
import { Channel } from "./discord.ts";
import {
  Beatmap,
  CoreServer,
  GameplayParameters,
  LeaderboardScore,
  Match,
  ModalOption,
  PreviewBeatmapLevel,
  QualifierEvent,
  ScoreTracker,
  State,
  User,
} from "./models.ts";

export const protobufPackage = "proto.packet";

/** ---- Commands (DO something!) ---- // */
export interface Command {
  /** Is this really a command? */
  heartbeat?: boolean | undefined;
  returnToMenu?: boolean | undefined;
  delayTestFinish?: boolean | undefined;
  streamSyncShowImage?: boolean | undefined;
  loadSong?: Command_LoadSong | undefined;
  playSong?: Command_PlaySong | undefined;
  sendBotMessage?: Command_SendBotMessage | undefined;
  showModal?: Command_ShowModal | undefined;
}

export interface Command_LoadSong {
  levelId?: string;
  customHostUrl?: string;
}

export interface Command_PlaySong {
  gameplayParameters?: GameplayParameters;
  floatingScoreboard?: boolean;
  streamSync?: boolean;
  disableFail?: boolean;
  disablePause?: boolean;
  disableScoresaberSubmission?: boolean;
  showNormalNotesOnStream?: boolean;
}

export interface Command_SendBotMessage {
  channel?: Channel;
  message?: string;
}

export interface Command_ShowModal {
  modalId?: string;
  messageTitle?: string;
  messageText?: string;
  canClose?: boolean;
  option1?: ModalOption;
  option2?: ModalOption;
}

/** ---- Pushes (SUBMIT something!) ---- // */
export interface Push {
  leaderboardScore?: Push_LeaderboardScore | undefined;
  realtimeScore?: Push_RealtimeScore | undefined;
  songFinished?: Push_SongFinished | undefined;
}

export interface Push_LeaderboardScore {
  score?: LeaderboardScore;
}

export interface Push_RealtimeScore {
  userGuid?: string;
  score?: number;
  scoreWithModifiers?: number;
  maxScore?: number;
  maxScoreWithModifiers?: number;
  combo?: number;
  playerHealth?: number;
  accuracy?: number;
  songPosition?: number;
  scoreTracker?: ScoreTracker;
}

export interface Push_SongFinished {
  player?: User;
  beatmap?: Beatmap;
  type?: Push_SongFinished_CompletionType;
  score?: number;
}

export enum Push_SongFinished_CompletionType {
  Passed = 0,
  Failed = 1,
  Quit = 2,
  UNRECOGNIZED = -1,
}

export function push_SongFinished_CompletionTypeFromJSON(object: any): Push_SongFinished_CompletionType {
  switch (object) {
    case 0:
    case "Passed":
      return Push_SongFinished_CompletionType.Passed;
    case 1:
    case "Failed":
      return Push_SongFinished_CompletionType.Failed;
    case 2:
    case "Quit":
      return Push_SongFinished_CompletionType.Quit;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Push_SongFinished_CompletionType.UNRECOGNIZED;
  }
}

export function push_SongFinished_CompletionTypeToJSON(object: Push_SongFinished_CompletionType): string {
  switch (object) {
    case Push_SongFinished_CompletionType.Passed:
      return "Passed";
    case Push_SongFinished_CompletionType.Failed:
      return "Failed";
    case Push_SongFinished_CompletionType.Quit:
      return "Quit";
    case Push_SongFinished_CompletionType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** ---- Requests (GET (or do?) something where you need a response!) ---- // */
export interface Request {
  connect?: Request_Connect | undefined;
  leaderboardScore?: Request_LeaderboardScore | undefined;
  preloadImageForStreamSync?: Request_PreloadImageForStreamSync | undefined;
}

export interface Request_Connect {
  user?: User;
  password?: string;
  clientVersion?: number;
}

export interface Request_LeaderboardScore {
  eventId?: string;
  parameters?: GameplayParameters;
}

export interface Request_PreloadImageForStreamSync {
  fileId?: string;
  compressed?: boolean;
  data?: Uint8Array;
}

/** ---- Responses ---- // */
export interface Response {
  type?: Response_ResponseType;
  respondingToPacketId?: string;
  connect?: Response_Connect | undefined;
  leaderboardScores?: Response_LeaderboardScores | undefined;
  loadedSong?: Response_LoadedSong | undefined;
  modal?: Response_Modal | undefined;
  modifyQualifier?: Response_ModifyQualifier | undefined;
  imagePreloaded?: Response_ImagePreloaded | undefined;
}

export enum Response_ResponseType {
  Fail = 0,
  Success = 1,
  UNRECOGNIZED = -1,
}

export function response_ResponseTypeFromJSON(object: any): Response_ResponseType {
  switch (object) {
    case 0:
    case "Fail":
      return Response_ResponseType.Fail;
    case 1:
    case "Success":
      return Response_ResponseType.Success;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Response_ResponseType.UNRECOGNIZED;
  }
}

export function response_ResponseTypeToJSON(object: Response_ResponseType): string {
  switch (object) {
    case Response_ResponseType.Fail:
      return "Fail";
    case Response_ResponseType.Success:
      return "Success";
    case Response_ResponseType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface Response_Connect {
  state?: State;
  selfGuid?: string;
  serverVersion?: number;
  message?: string;
}

export interface Response_LeaderboardScores {
  scores?: LeaderboardScore[];
}

export interface Response_LoadedSong {
  level?: PreviewBeatmapLevel;
}

export interface Response_Modal {
  modalId?: string;
  value?: string;
}

export interface Response_ModifyQualifier {
  message?: string;
}

export interface Response_ImagePreloaded {
  fileId?: string;
}

/** ---- Backbone ---- // */
export interface Acknowledgement {
  packetId?: string;
  type?: Acknowledgement_AcknowledgementType;
}

export enum Acknowledgement_AcknowledgementType {
  MessageReceived = 0,
  UNRECOGNIZED = -1,
}

export function acknowledgement_AcknowledgementTypeFromJSON(object: any): Acknowledgement_AcknowledgementType {
  switch (object) {
    case 0:
    case "MessageReceived":
      return Acknowledgement_AcknowledgementType.MessageReceived;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Acknowledgement_AcknowledgementType.UNRECOGNIZED;
  }
}

export function acknowledgement_AcknowledgementTypeToJSON(object: Acknowledgement_AcknowledgementType): string {
  switch (object) {
    case Acknowledgement_AcknowledgementType.MessageReceived:
      return "MessageReceived";
    case Acknowledgement_AcknowledgementType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface ForwardingPacket {
  forwardTo?: string[];
  packet?: Packet;
}

export interface Event {
  userAddedEvent?: Event_UserAddedEvent | undefined;
  userUpdatedEvent?: Event_UserUpdatedEvent | undefined;
  userLeftEvent?: Event_UserLeftEvent | undefined;
  matchCreatedEvent?: Event_MatchCreatedEvent | undefined;
  matchUpdatedEvent?: Event_MatchUpdatedEvent | undefined;
  matchDeletedEvent?: Event_MatchDeletedEvent | undefined;
  qualifierCreatedEvent?: Event_QualifierCreatedEvent | undefined;
  qualifierUpdatedEvent?: Event_QualifierUpdatedEvent | undefined;
  qualifierDeletedEvent?: Event_QualifierDeletedEvent | undefined;
  hostAddedEvent?: Event_HostAddedEvent | undefined;
  hostDeletedEvent?: Event_HostDeletedEvent | undefined;
}

export interface Event_UserAddedEvent {
  user?: User;
}

export interface Event_UserUpdatedEvent {
  user?: User;
}

export interface Event_UserLeftEvent {
  user?: User;
}

export interface Event_MatchCreatedEvent {
  match?: Match;
}

export interface Event_MatchUpdatedEvent {
  match?: Match;
}

export interface Event_MatchDeletedEvent {
  match?: Match;
}

export interface Event_QualifierCreatedEvent {
  event?: QualifierEvent;
}

export interface Event_QualifierUpdatedEvent {
  event?: QualifierEvent;
}

export interface Event_QualifierDeletedEvent {
  event?: QualifierEvent;
}

export interface Event_HostAddedEvent {
  server?: CoreServer;
}

export interface Event_HostDeletedEvent {
  server?: CoreServer;
}

export interface Packet {
  id?: string;
  from?: string;
  acknowledgement?: Acknowledgement | undefined;
  forwardingPacket?: ForwardingPacket | undefined;
  command?: Command | undefined;
  push?: Push | undefined;
  request?: Request | undefined;
  response?: Response | undefined;
  event?: Event | undefined;
}

function createBaseCommand(): Command {
  return {
    heartbeat: undefined,
    returnToMenu: undefined,
    delayTestFinish: undefined,
    streamSyncShowImage: undefined,
    loadSong: undefined,
    playSong: undefined,
    sendBotMessage: undefined,
    showModal: undefined,
  };
}

export const Command = {
  encode(message: Command, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.heartbeat !== undefined) {
      writer.uint32(8).bool(message.heartbeat);
    }
    if (message.returnToMenu !== undefined) {
      writer.uint32(16).bool(message.returnToMenu);
    }
    if (message.delayTestFinish !== undefined) {
      writer.uint32(24).bool(message.delayTestFinish);
    }
    if (message.streamSyncShowImage !== undefined) {
      writer.uint32(32).bool(message.streamSyncShowImage);
    }
    if (message.loadSong !== undefined) {
      Command_LoadSong.encode(message.loadSong, writer.uint32(42).fork()).ldelim();
    }
    if (message.playSong !== undefined) {
      Command_PlaySong.encode(message.playSong, writer.uint32(50).fork()).ldelim();
    }
    if (message.sendBotMessage !== undefined) {
      Command_SendBotMessage.encode(message.sendBotMessage, writer.uint32(58).fork()).ldelim();
    }
    if (message.showModal !== undefined) {
      Command_ShowModal.encode(message.showModal, writer.uint32(66).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Command {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommand();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.heartbeat = reader.bool();
          break;
        case 2:
          message.returnToMenu = reader.bool();
          break;
        case 3:
          message.delayTestFinish = reader.bool();
          break;
        case 4:
          message.streamSyncShowImage = reader.bool();
          break;
        case 5:
          message.loadSong = Command_LoadSong.decode(reader, reader.uint32());
          break;
        case 6:
          message.playSong = Command_PlaySong.decode(reader, reader.uint32());
          break;
        case 7:
          message.sendBotMessage = Command_SendBotMessage.decode(reader, reader.uint32());
          break;
        case 8:
          message.showModal = Command_ShowModal.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Command {
    return {
      heartbeat: isSet(object.heartbeat) ? Boolean(object.heartbeat) : undefined,
      returnToMenu: isSet(object.returnToMenu) ? Boolean(object.returnToMenu) : undefined,
      delayTestFinish: isSet(object.delayTestFinish) ? Boolean(object.delayTestFinish) : undefined,
      streamSyncShowImage: isSet(object.streamSyncShowImage) ? Boolean(object.streamSyncShowImage) : undefined,
      loadSong: isSet(object.loadSong) ? Command_LoadSong.fromJSON(object.loadSong) : undefined,
      playSong: isSet(object.playSong) ? Command_PlaySong.fromJSON(object.playSong) : undefined,
      sendBotMessage: isSet(object.sendBotMessage) ? Command_SendBotMessage.fromJSON(object.sendBotMessage) : undefined,
      showModal: isSet(object.showModal) ? Command_ShowModal.fromJSON(object.showModal) : undefined,
    };
  },

  toJSON(message: Command): unknown {
    const obj: any = {};
    message.heartbeat !== undefined && (obj.heartbeat = message.heartbeat);
    message.returnToMenu !== undefined && (obj.returnToMenu = message.returnToMenu);
    message.delayTestFinish !== undefined && (obj.delayTestFinish = message.delayTestFinish);
    message.streamSyncShowImage !== undefined && (obj.streamSyncShowImage = message.streamSyncShowImage);
    message.loadSong !== undefined &&
      (obj.loadSong = message.loadSong ? Command_LoadSong.toJSON(message.loadSong) : undefined);
    message.playSong !== undefined &&
      (obj.playSong = message.playSong ? Command_PlaySong.toJSON(message.playSong) : undefined);
    message.sendBotMessage !== undefined &&
      (obj.sendBotMessage = message.sendBotMessage ? Command_SendBotMessage.toJSON(message.sendBotMessage) : undefined);
    message.showModal !== undefined &&
      (obj.showModal = message.showModal ? Command_ShowModal.toJSON(message.showModal) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Command>, I>>(object: I): Command {
    const message = createBaseCommand();
    message.heartbeat = object.heartbeat ?? undefined;
    message.returnToMenu = object.returnToMenu ?? undefined;
    message.delayTestFinish = object.delayTestFinish ?? undefined;
    message.streamSyncShowImage = object.streamSyncShowImage ?? undefined;
    message.loadSong = (object.loadSong !== undefined && object.loadSong !== null)
      ? Command_LoadSong.fromPartial(object.loadSong)
      : undefined;
    message.playSong = (object.playSong !== undefined && object.playSong !== null)
      ? Command_PlaySong.fromPartial(object.playSong)
      : undefined;
    message.sendBotMessage = (object.sendBotMessage !== undefined && object.sendBotMessage !== null)
      ? Command_SendBotMessage.fromPartial(object.sendBotMessage)
      : undefined;
    message.showModal = (object.showModal !== undefined && object.showModal !== null)
      ? Command_ShowModal.fromPartial(object.showModal)
      : undefined;
    return message;
  },
};

function createBaseCommand_LoadSong(): Command_LoadSong {
  return { levelId: "", customHostUrl: "" };
}

export const Command_LoadSong = {
  encode(message: Command_LoadSong, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.levelId !== undefined && message.levelId !== "") {
      writer.uint32(10).string(message.levelId);
    }
    if (message.customHostUrl !== undefined && message.customHostUrl !== "") {
      writer.uint32(18).string(message.customHostUrl);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Command_LoadSong {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommand_LoadSong();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.levelId = reader.string();
          break;
        case 2:
          message.customHostUrl = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Command_LoadSong {
    return {
      levelId: isSet(object.levelId) ? String(object.levelId) : "",
      customHostUrl: isSet(object.customHostUrl) ? String(object.customHostUrl) : "",
    };
  },

  toJSON(message: Command_LoadSong): unknown {
    const obj: any = {};
    message.levelId !== undefined && (obj.levelId = message.levelId);
    message.customHostUrl !== undefined && (obj.customHostUrl = message.customHostUrl);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Command_LoadSong>, I>>(object: I): Command_LoadSong {
    const message = createBaseCommand_LoadSong();
    message.levelId = object.levelId ?? "";
    message.customHostUrl = object.customHostUrl ?? "";
    return message;
  },
};

function createBaseCommand_PlaySong(): Command_PlaySong {
  return {
    gameplayParameters: undefined,
    floatingScoreboard: false,
    streamSync: false,
    disableFail: false,
    disablePause: false,
    disableScoresaberSubmission: false,
    showNormalNotesOnStream: false,
  };
}

export const Command_PlaySong = {
  encode(message: Command_PlaySong, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.gameplayParameters !== undefined) {
      GameplayParameters.encode(message.gameplayParameters, writer.uint32(10).fork()).ldelim();
    }
    if (message.floatingScoreboard === true) {
      writer.uint32(24).bool(message.floatingScoreboard);
    }
    if (message.streamSync === true) {
      writer.uint32(32).bool(message.streamSync);
    }
    if (message.disableFail === true) {
      writer.uint32(40).bool(message.disableFail);
    }
    if (message.disablePause === true) {
      writer.uint32(48).bool(message.disablePause);
    }
    if (message.disableScoresaberSubmission === true) {
      writer.uint32(56).bool(message.disableScoresaberSubmission);
    }
    if (message.showNormalNotesOnStream === true) {
      writer.uint32(64).bool(message.showNormalNotesOnStream);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Command_PlaySong {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommand_PlaySong();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.gameplayParameters = GameplayParameters.decode(reader, reader.uint32());
          break;
        case 3:
          message.floatingScoreboard = reader.bool();
          break;
        case 4:
          message.streamSync = reader.bool();
          break;
        case 5:
          message.disableFail = reader.bool();
          break;
        case 6:
          message.disablePause = reader.bool();
          break;
        case 7:
          message.disableScoresaberSubmission = reader.bool();
          break;
        case 8:
          message.showNormalNotesOnStream = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Command_PlaySong {
    return {
      gameplayParameters: isSet(object.gameplayParameters)
        ? GameplayParameters.fromJSON(object.gameplayParameters)
        : undefined,
      floatingScoreboard: isSet(object.floatingScoreboard) ? Boolean(object.floatingScoreboard) : false,
      streamSync: isSet(object.streamSync) ? Boolean(object.streamSync) : false,
      disableFail: isSet(object.disableFail) ? Boolean(object.disableFail) : false,
      disablePause: isSet(object.disablePause) ? Boolean(object.disablePause) : false,
      disableScoresaberSubmission: isSet(object.disableScoresaberSubmission)
        ? Boolean(object.disableScoresaberSubmission)
        : false,
      showNormalNotesOnStream: isSet(object.showNormalNotesOnStream) ? Boolean(object.showNormalNotesOnStream) : false,
    };
  },

  toJSON(message: Command_PlaySong): unknown {
    const obj: any = {};
    message.gameplayParameters !== undefined && (obj.gameplayParameters = message.gameplayParameters
      ? GameplayParameters.toJSON(message.gameplayParameters)
      : undefined);
    message.floatingScoreboard !== undefined && (obj.floatingScoreboard = message.floatingScoreboard);
    message.streamSync !== undefined && (obj.streamSync = message.streamSync);
    message.disableFail !== undefined && (obj.disableFail = message.disableFail);
    message.disablePause !== undefined && (obj.disablePause = message.disablePause);
    message.disableScoresaberSubmission !== undefined &&
      (obj.disableScoresaberSubmission = message.disableScoresaberSubmission);
    message.showNormalNotesOnStream !== undefined && (obj.showNormalNotesOnStream = message.showNormalNotesOnStream);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Command_PlaySong>, I>>(object: I): Command_PlaySong {
    const message = createBaseCommand_PlaySong();
    message.gameplayParameters = (object.gameplayParameters !== undefined && object.gameplayParameters !== null)
      ? GameplayParameters.fromPartial(object.gameplayParameters)
      : undefined;
    message.floatingScoreboard = object.floatingScoreboard ?? false;
    message.streamSync = object.streamSync ?? false;
    message.disableFail = object.disableFail ?? false;
    message.disablePause = object.disablePause ?? false;
    message.disableScoresaberSubmission = object.disableScoresaberSubmission ?? false;
    message.showNormalNotesOnStream = object.showNormalNotesOnStream ?? false;
    return message;
  },
};

function createBaseCommand_SendBotMessage(): Command_SendBotMessage {
  return { channel: undefined, message: "" };
}

export const Command_SendBotMessage = {
  encode(message: Command_SendBotMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.channel !== undefined) {
      Channel.encode(message.channel, writer.uint32(10).fork()).ldelim();
    }
    if (message.message !== undefined && message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Command_SendBotMessage {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommand_SendBotMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.channel = Channel.decode(reader, reader.uint32());
          break;
        case 2:
          message.message = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Command_SendBotMessage {
    return {
      channel: isSet(object.channel) ? Channel.fromJSON(object.channel) : undefined,
      message: isSet(object.message) ? String(object.message) : "",
    };
  },

  toJSON(message: Command_SendBotMessage): unknown {
    const obj: any = {};
    message.channel !== undefined && (obj.channel = message.channel ? Channel.toJSON(message.channel) : undefined);
    message.message !== undefined && (obj.message = message.message);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Command_SendBotMessage>, I>>(object: I): Command_SendBotMessage {
    const message = createBaseCommand_SendBotMessage();
    message.channel = (object.channel !== undefined && object.channel !== null)
      ? Channel.fromPartial(object.channel)
      : undefined;
    message.message = object.message ?? "";
    return message;
  },
};

function createBaseCommand_ShowModal(): Command_ShowModal {
  return { modalId: "", messageTitle: "", messageText: "", canClose: false, option1: undefined, option2: undefined };
}

export const Command_ShowModal = {
  encode(message: Command_ShowModal, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.modalId !== undefined && message.modalId !== "") {
      writer.uint32(10).string(message.modalId);
    }
    if (message.messageTitle !== undefined && message.messageTitle !== "") {
      writer.uint32(18).string(message.messageTitle);
    }
    if (message.messageText !== undefined && message.messageText !== "") {
      writer.uint32(26).string(message.messageText);
    }
    if (message.canClose === true) {
      writer.uint32(32).bool(message.canClose);
    }
    if (message.option1 !== undefined) {
      ModalOption.encode(message.option1, writer.uint32(42).fork()).ldelim();
    }
    if (message.option2 !== undefined) {
      ModalOption.encode(message.option2, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Command_ShowModal {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommand_ShowModal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.modalId = reader.string();
          break;
        case 2:
          message.messageTitle = reader.string();
          break;
        case 3:
          message.messageText = reader.string();
          break;
        case 4:
          message.canClose = reader.bool();
          break;
        case 5:
          message.option1 = ModalOption.decode(reader, reader.uint32());
          break;
        case 6:
          message.option2 = ModalOption.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Command_ShowModal {
    return {
      modalId: isSet(object.modalId) ? String(object.modalId) : "",
      messageTitle: isSet(object.messageTitle) ? String(object.messageTitle) : "",
      messageText: isSet(object.messageText) ? String(object.messageText) : "",
      canClose: isSet(object.canClose) ? Boolean(object.canClose) : false,
      option1: isSet(object.option1) ? ModalOption.fromJSON(object.option1) : undefined,
      option2: isSet(object.option2) ? ModalOption.fromJSON(object.option2) : undefined,
    };
  },

  toJSON(message: Command_ShowModal): unknown {
    const obj: any = {};
    message.modalId !== undefined && (obj.modalId = message.modalId);
    message.messageTitle !== undefined && (obj.messageTitle = message.messageTitle);
    message.messageText !== undefined && (obj.messageText = message.messageText);
    message.canClose !== undefined && (obj.canClose = message.canClose);
    message.option1 !== undefined && (obj.option1 = message.option1 ? ModalOption.toJSON(message.option1) : undefined);
    message.option2 !== undefined && (obj.option2 = message.option2 ? ModalOption.toJSON(message.option2) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Command_ShowModal>, I>>(object: I): Command_ShowModal {
    const message = createBaseCommand_ShowModal();
    message.modalId = object.modalId ?? "";
    message.messageTitle = object.messageTitle ?? "";
    message.messageText = object.messageText ?? "";
    message.canClose = object.canClose ?? false;
    message.option1 = (object.option1 !== undefined && object.option1 !== null)
      ? ModalOption.fromPartial(object.option1)
      : undefined;
    message.option2 = (object.option2 !== undefined && object.option2 !== null)
      ? ModalOption.fromPartial(object.option2)
      : undefined;
    return message;
  },
};

function createBasePush(): Push {
  return { leaderboardScore: undefined, realtimeScore: undefined, songFinished: undefined };
}

export const Push = {
  encode(message: Push, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.leaderboardScore !== undefined) {
      Push_LeaderboardScore.encode(message.leaderboardScore, writer.uint32(10).fork()).ldelim();
    }
    if (message.realtimeScore !== undefined) {
      Push_RealtimeScore.encode(message.realtimeScore, writer.uint32(18).fork()).ldelim();
    }
    if (message.songFinished !== undefined) {
      Push_SongFinished.encode(message.songFinished, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Push {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePush();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.leaderboardScore = Push_LeaderboardScore.decode(reader, reader.uint32());
          break;
        case 2:
          message.realtimeScore = Push_RealtimeScore.decode(reader, reader.uint32());
          break;
        case 3:
          message.songFinished = Push_SongFinished.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Push {
    return {
      leaderboardScore: isSet(object.leaderboardScore)
        ? Push_LeaderboardScore.fromJSON(object.leaderboardScore)
        : undefined,
      realtimeScore: isSet(object.realtimeScore) ? Push_RealtimeScore.fromJSON(object.realtimeScore) : undefined,
      songFinished: isSet(object.songFinished) ? Push_SongFinished.fromJSON(object.songFinished) : undefined,
    };
  },

  toJSON(message: Push): unknown {
    const obj: any = {};
    message.leaderboardScore !== undefined && (obj.leaderboardScore = message.leaderboardScore
      ? Push_LeaderboardScore.toJSON(message.leaderboardScore)
      : undefined);
    message.realtimeScore !== undefined &&
      (obj.realtimeScore = message.realtimeScore ? Push_RealtimeScore.toJSON(message.realtimeScore) : undefined);
    message.songFinished !== undefined &&
      (obj.songFinished = message.songFinished ? Push_SongFinished.toJSON(message.songFinished) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Push>, I>>(object: I): Push {
    const message = createBasePush();
    message.leaderboardScore = (object.leaderboardScore !== undefined && object.leaderboardScore !== null)
      ? Push_LeaderboardScore.fromPartial(object.leaderboardScore)
      : undefined;
    message.realtimeScore = (object.realtimeScore !== undefined && object.realtimeScore !== null)
      ? Push_RealtimeScore.fromPartial(object.realtimeScore)
      : undefined;
    message.songFinished = (object.songFinished !== undefined && object.songFinished !== null)
      ? Push_SongFinished.fromPartial(object.songFinished)
      : undefined;
    return message;
  },
};

function createBasePush_LeaderboardScore(): Push_LeaderboardScore {
  return { score: undefined };
}

export const Push_LeaderboardScore = {
  encode(message: Push_LeaderboardScore, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.score !== undefined) {
      LeaderboardScore.encode(message.score, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Push_LeaderboardScore {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePush_LeaderboardScore();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.score = LeaderboardScore.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Push_LeaderboardScore {
    return { score: isSet(object.score) ? LeaderboardScore.fromJSON(object.score) : undefined };
  },

  toJSON(message: Push_LeaderboardScore): unknown {
    const obj: any = {};
    message.score !== undefined && (obj.score = message.score ? LeaderboardScore.toJSON(message.score) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Push_LeaderboardScore>, I>>(object: I): Push_LeaderboardScore {
    const message = createBasePush_LeaderboardScore();
    message.score = (object.score !== undefined && object.score !== null)
      ? LeaderboardScore.fromPartial(object.score)
      : undefined;
    return message;
  },
};

function createBasePush_RealtimeScore(): Push_RealtimeScore {
  return {
    userGuid: "",
    score: 0,
    scoreWithModifiers: 0,
    maxScore: 0,
    maxScoreWithModifiers: 0,
    combo: 0,
    playerHealth: 0,
    accuracy: 0,
    songPosition: 0,
    scoreTracker: undefined,
  };
}

export const Push_RealtimeScore = {
  encode(message: Push_RealtimeScore, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userGuid !== undefined && message.userGuid !== "") {
      writer.uint32(10).string(message.userGuid);
    }
    if (message.score !== undefined && message.score !== 0) {
      writer.uint32(16).int32(message.score);
    }
    if (message.scoreWithModifiers !== undefined && message.scoreWithModifiers !== 0) {
      writer.uint32(24).int32(message.scoreWithModifiers);
    }
    if (message.maxScore !== undefined && message.maxScore !== 0) {
      writer.uint32(32).int32(message.maxScore);
    }
    if (message.maxScoreWithModifiers !== undefined && message.maxScoreWithModifiers !== 0) {
      writer.uint32(40).int32(message.maxScoreWithModifiers);
    }
    if (message.combo !== undefined && message.combo !== 0) {
      writer.uint32(48).int32(message.combo);
    }
    if (message.playerHealth !== undefined && message.playerHealth !== 0) {
      writer.uint32(61).float(message.playerHealth);
    }
    if (message.accuracy !== undefined && message.accuracy !== 0) {
      writer.uint32(69).float(message.accuracy);
    }
    if (message.songPosition !== undefined && message.songPosition !== 0) {
      writer.uint32(77).float(message.songPosition);
    }
    if (message.scoreTracker !== undefined) {
      ScoreTracker.encode(message.scoreTracker, writer.uint32(82).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Push_RealtimeScore {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePush_RealtimeScore();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.userGuid = reader.string();
          break;
        case 2:
          message.score = reader.int32();
          break;
        case 3:
          message.scoreWithModifiers = reader.int32();
          break;
        case 4:
          message.maxScore = reader.int32();
          break;
        case 5:
          message.maxScoreWithModifiers = reader.int32();
          break;
        case 6:
          message.combo = reader.int32();
          break;
        case 7:
          message.playerHealth = reader.float();
          break;
        case 8:
          message.accuracy = reader.float();
          break;
        case 9:
          message.songPosition = reader.float();
          break;
        case 10:
          message.scoreTracker = ScoreTracker.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Push_RealtimeScore {
    return {
      userGuid: isSet(object.userGuid) ? String(object.userGuid) : "",
      score: isSet(object.score) ? Number(object.score) : 0,
      scoreWithModifiers: isSet(object.scoreWithModifiers) ? Number(object.scoreWithModifiers) : 0,
      maxScore: isSet(object.maxScore) ? Number(object.maxScore) : 0,
      maxScoreWithModifiers: isSet(object.maxScoreWithModifiers) ? Number(object.maxScoreWithModifiers) : 0,
      combo: isSet(object.combo) ? Number(object.combo) : 0,
      playerHealth: isSet(object.playerHealth) ? Number(object.playerHealth) : 0,
      accuracy: isSet(object.accuracy) ? Number(object.accuracy) : 0,
      songPosition: isSet(object.songPosition) ? Number(object.songPosition) : 0,
      scoreTracker: isSet(object.scoreTracker) ? ScoreTracker.fromJSON(object.scoreTracker) : undefined,
    };
  },

  toJSON(message: Push_RealtimeScore): unknown {
    const obj: any = {};
    message.userGuid !== undefined && (obj.userGuid = message.userGuid);
    message.score !== undefined && (obj.score = Math.round(message.score));
    message.scoreWithModifiers !== undefined && (obj.scoreWithModifiers = Math.round(message.scoreWithModifiers));
    message.maxScore !== undefined && (obj.maxScore = Math.round(message.maxScore));
    message.maxScoreWithModifiers !== undefined &&
      (obj.maxScoreWithModifiers = Math.round(message.maxScoreWithModifiers));
    message.combo !== undefined && (obj.combo = Math.round(message.combo));
    message.playerHealth !== undefined && (obj.playerHealth = message.playerHealth);
    message.accuracy !== undefined && (obj.accuracy = message.accuracy);
    message.songPosition !== undefined && (obj.songPosition = message.songPosition);
    message.scoreTracker !== undefined &&
      (obj.scoreTracker = message.scoreTracker ? ScoreTracker.toJSON(message.scoreTracker) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Push_RealtimeScore>, I>>(object: I): Push_RealtimeScore {
    const message = createBasePush_RealtimeScore();
    message.userGuid = object.userGuid ?? "";
    message.score = object.score ?? 0;
    message.scoreWithModifiers = object.scoreWithModifiers ?? 0;
    message.maxScore = object.maxScore ?? 0;
    message.maxScoreWithModifiers = object.maxScoreWithModifiers ?? 0;
    message.combo = object.combo ?? 0;
    message.playerHealth = object.playerHealth ?? 0;
    message.accuracy = object.accuracy ?? 0;
    message.songPosition = object.songPosition ?? 0;
    message.scoreTracker = (object.scoreTracker !== undefined && object.scoreTracker !== null)
      ? ScoreTracker.fromPartial(object.scoreTracker)
      : undefined;
    return message;
  },
};

function createBasePush_SongFinished(): Push_SongFinished {
  return { player: undefined, beatmap: undefined, type: 0, score: 0 };
}

export const Push_SongFinished = {
  encode(message: Push_SongFinished, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.player !== undefined) {
      User.encode(message.player, writer.uint32(10).fork()).ldelim();
    }
    if (message.beatmap !== undefined) {
      Beatmap.encode(message.beatmap, writer.uint32(18).fork()).ldelim();
    }
    if (message.type !== undefined && message.type !== 0) {
      writer.uint32(24).int32(message.type);
    }
    if (message.score !== undefined && message.score !== 0) {
      writer.uint32(32).int32(message.score);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Push_SongFinished {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePush_SongFinished();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.player = User.decode(reader, reader.uint32());
          break;
        case 2:
          message.beatmap = Beatmap.decode(reader, reader.uint32());
          break;
        case 3:
          message.type = reader.int32() as any;
          break;
        case 4:
          message.score = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Push_SongFinished {
    return {
      player: isSet(object.player) ? User.fromJSON(object.player) : undefined,
      beatmap: isSet(object.beatmap) ? Beatmap.fromJSON(object.beatmap) : undefined,
      type: isSet(object.type) ? push_SongFinished_CompletionTypeFromJSON(object.type) : 0,
      score: isSet(object.score) ? Number(object.score) : 0,
    };
  },

  toJSON(message: Push_SongFinished): unknown {
    const obj: any = {};
    message.player !== undefined && (obj.player = message.player ? User.toJSON(message.player) : undefined);
    message.beatmap !== undefined && (obj.beatmap = message.beatmap ? Beatmap.toJSON(message.beatmap) : undefined);
    message.type !== undefined && (obj.type = push_SongFinished_CompletionTypeToJSON(message.type));
    message.score !== undefined && (obj.score = Math.round(message.score));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Push_SongFinished>, I>>(object: I): Push_SongFinished {
    const message = createBasePush_SongFinished();
    message.player = (object.player !== undefined && object.player !== null)
      ? User.fromPartial(object.player)
      : undefined;
    message.beatmap = (object.beatmap !== undefined && object.beatmap !== null)
      ? Beatmap.fromPartial(object.beatmap)
      : undefined;
    message.type = object.type ?? 0;
    message.score = object.score ?? 0;
    return message;
  },
};

function createBaseRequest(): Request {
  return { connect: undefined, leaderboardScore: undefined, preloadImageForStreamSync: undefined };
}

export const Request = {
  encode(message: Request, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.connect !== undefined) {
      Request_Connect.encode(message.connect, writer.uint32(10).fork()).ldelim();
    }
    if (message.leaderboardScore !== undefined) {
      Request_LeaderboardScore.encode(message.leaderboardScore, writer.uint32(18).fork()).ldelim();
    }
    if (message.preloadImageForStreamSync !== undefined) {
      Request_PreloadImageForStreamSync.encode(message.preloadImageForStreamSync, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Request {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.connect = Request_Connect.decode(reader, reader.uint32());
          break;
        case 2:
          message.leaderboardScore = Request_LeaderboardScore.decode(reader, reader.uint32());
          break;
        case 3:
          message.preloadImageForStreamSync = Request_PreloadImageForStreamSync.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Request {
    return {
      connect: isSet(object.connect) ? Request_Connect.fromJSON(object.connect) : undefined,
      leaderboardScore: isSet(object.leaderboardScore)
        ? Request_LeaderboardScore.fromJSON(object.leaderboardScore)
        : undefined,
      preloadImageForStreamSync: isSet(object.preloadImageForStreamSync)
        ? Request_PreloadImageForStreamSync.fromJSON(object.preloadImageForStreamSync)
        : undefined,
    };
  },

  toJSON(message: Request): unknown {
    const obj: any = {};
    message.connect !== undefined &&
      (obj.connect = message.connect ? Request_Connect.toJSON(message.connect) : undefined);
    message.leaderboardScore !== undefined && (obj.leaderboardScore = message.leaderboardScore
      ? Request_LeaderboardScore.toJSON(message.leaderboardScore)
      : undefined);
    message.preloadImageForStreamSync !== undefined &&
      (obj.preloadImageForStreamSync = message.preloadImageForStreamSync
        ? Request_PreloadImageForStreamSync.toJSON(message.preloadImageForStreamSync)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Request>, I>>(object: I): Request {
    const message = createBaseRequest();
    message.connect = (object.connect !== undefined && object.connect !== null)
      ? Request_Connect.fromPartial(object.connect)
      : undefined;
    message.leaderboardScore = (object.leaderboardScore !== undefined && object.leaderboardScore !== null)
      ? Request_LeaderboardScore.fromPartial(object.leaderboardScore)
      : undefined;
    message.preloadImageForStreamSync =
      (object.preloadImageForStreamSync !== undefined && object.preloadImageForStreamSync !== null)
        ? Request_PreloadImageForStreamSync.fromPartial(object.preloadImageForStreamSync)
        : undefined;
    return message;
  },
};

function createBaseRequest_Connect(): Request_Connect {
  return { user: undefined, password: "", clientVersion: 0 };
}

export const Request_Connect = {
  encode(message: Request_Connect, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.user !== undefined) {
      User.encode(message.user, writer.uint32(10).fork()).ldelim();
    }
    if (message.password !== undefined && message.password !== "") {
      writer.uint32(18).string(message.password);
    }
    if (message.clientVersion !== undefined && message.clientVersion !== 0) {
      writer.uint32(24).int32(message.clientVersion);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Request_Connect {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequest_Connect();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.user = User.decode(reader, reader.uint32());
          break;
        case 2:
          message.password = reader.string();
          break;
        case 3:
          message.clientVersion = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Request_Connect {
    return {
      user: isSet(object.user) ? User.fromJSON(object.user) : undefined,
      password: isSet(object.password) ? String(object.password) : "",
      clientVersion: isSet(object.clientVersion) ? Number(object.clientVersion) : 0,
    };
  },

  toJSON(message: Request_Connect): unknown {
    const obj: any = {};
    message.user !== undefined && (obj.user = message.user ? User.toJSON(message.user) : undefined);
    message.password !== undefined && (obj.password = message.password);
    message.clientVersion !== undefined && (obj.clientVersion = Math.round(message.clientVersion));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Request_Connect>, I>>(object: I): Request_Connect {
    const message = createBaseRequest_Connect();
    message.user = (object.user !== undefined && object.user !== null) ? User.fromPartial(object.user) : undefined;
    message.password = object.password ?? "";
    message.clientVersion = object.clientVersion ?? 0;
    return message;
  },
};

function createBaseRequest_LeaderboardScore(): Request_LeaderboardScore {
  return { eventId: "", parameters: undefined };
}

export const Request_LeaderboardScore = {
  encode(message: Request_LeaderboardScore, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.eventId !== undefined && message.eventId !== "") {
      writer.uint32(10).string(message.eventId);
    }
    if (message.parameters !== undefined) {
      GameplayParameters.encode(message.parameters, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Request_LeaderboardScore {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequest_LeaderboardScore();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.eventId = reader.string();
          break;
        case 2:
          message.parameters = GameplayParameters.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Request_LeaderboardScore {
    return {
      eventId: isSet(object.eventId) ? String(object.eventId) : "",
      parameters: isSet(object.parameters) ? GameplayParameters.fromJSON(object.parameters) : undefined,
    };
  },

  toJSON(message: Request_LeaderboardScore): unknown {
    const obj: any = {};
    message.eventId !== undefined && (obj.eventId = message.eventId);
    message.parameters !== undefined &&
      (obj.parameters = message.parameters ? GameplayParameters.toJSON(message.parameters) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Request_LeaderboardScore>, I>>(object: I): Request_LeaderboardScore {
    const message = createBaseRequest_LeaderboardScore();
    message.eventId = object.eventId ?? "";
    message.parameters = (object.parameters !== undefined && object.parameters !== null)
      ? GameplayParameters.fromPartial(object.parameters)
      : undefined;
    return message;
  },
};

function createBaseRequest_PreloadImageForStreamSync(): Request_PreloadImageForStreamSync {
  return { fileId: "", compressed: false, data: new Uint8Array() };
}

export const Request_PreloadImageForStreamSync = {
  encode(message: Request_PreloadImageForStreamSync, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.fileId !== undefined && message.fileId !== "") {
      writer.uint32(10).string(message.fileId);
    }
    if (message.compressed === true) {
      writer.uint32(16).bool(message.compressed);
    }
    if (message.data !== undefined && message.data.length !== 0) {
      writer.uint32(26).bytes(message.data);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Request_PreloadImageForStreamSync {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequest_PreloadImageForStreamSync();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.fileId = reader.string();
          break;
        case 2:
          message.compressed = reader.bool();
          break;
        case 3:
          message.data = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Request_PreloadImageForStreamSync {
    return {
      fileId: isSet(object.fileId) ? String(object.fileId) : "",
      compressed: isSet(object.compressed) ? Boolean(object.compressed) : false,
      data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(),
    };
  },

  toJSON(message: Request_PreloadImageForStreamSync): unknown {
    const obj: any = {};
    message.fileId !== undefined && (obj.fileId = message.fileId);
    message.compressed !== undefined && (obj.compressed = message.compressed);
    message.data !== undefined &&
      (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Request_PreloadImageForStreamSync>, I>>(
    object: I,
  ): Request_PreloadImageForStreamSync {
    const message = createBaseRequest_PreloadImageForStreamSync();
    message.fileId = object.fileId ?? "";
    message.compressed = object.compressed ?? false;
    message.data = object.data ?? new Uint8Array();
    return message;
  },
};

function createBaseResponse(): Response {
  return {
    type: 0,
    respondingToPacketId: "",
    connect: undefined,
    leaderboardScores: undefined,
    loadedSong: undefined,
    modal: undefined,
    modifyQualifier: undefined,
    imagePreloaded: undefined,
  };
}

export const Response = {
  encode(message: Response, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== undefined && message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (message.respondingToPacketId !== undefined && message.respondingToPacketId !== "") {
      writer.uint32(18).string(message.respondingToPacketId);
    }
    if (message.connect !== undefined) {
      Response_Connect.encode(message.connect, writer.uint32(26).fork()).ldelim();
    }
    if (message.leaderboardScores !== undefined) {
      Response_LeaderboardScores.encode(message.leaderboardScores, writer.uint32(34).fork()).ldelim();
    }
    if (message.loadedSong !== undefined) {
      Response_LoadedSong.encode(message.loadedSong, writer.uint32(42).fork()).ldelim();
    }
    if (message.modal !== undefined) {
      Response_Modal.encode(message.modal, writer.uint32(50).fork()).ldelim();
    }
    if (message.modifyQualifier !== undefined) {
      Response_ModifyQualifier.encode(message.modifyQualifier, writer.uint32(58).fork()).ldelim();
    }
    if (message.imagePreloaded !== undefined) {
      Response_ImagePreloaded.encode(message.imagePreloaded, writer.uint32(66).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Response {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.int32() as any;
          break;
        case 2:
          message.respondingToPacketId = reader.string();
          break;
        case 3:
          message.connect = Response_Connect.decode(reader, reader.uint32());
          break;
        case 4:
          message.leaderboardScores = Response_LeaderboardScores.decode(reader, reader.uint32());
          break;
        case 5:
          message.loadedSong = Response_LoadedSong.decode(reader, reader.uint32());
          break;
        case 6:
          message.modal = Response_Modal.decode(reader, reader.uint32());
          break;
        case 7:
          message.modifyQualifier = Response_ModifyQualifier.decode(reader, reader.uint32());
          break;
        case 8:
          message.imagePreloaded = Response_ImagePreloaded.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Response {
    return {
      type: isSet(object.type) ? response_ResponseTypeFromJSON(object.type) : 0,
      respondingToPacketId: isSet(object.respondingToPacketId) ? String(object.respondingToPacketId) : "",
      connect: isSet(object.connect) ? Response_Connect.fromJSON(object.connect) : undefined,
      leaderboardScores: isSet(object.leaderboardScores)
        ? Response_LeaderboardScores.fromJSON(object.leaderboardScores)
        : undefined,
      loadedSong: isSet(object.loadedSong) ? Response_LoadedSong.fromJSON(object.loadedSong) : undefined,
      modal: isSet(object.modal) ? Response_Modal.fromJSON(object.modal) : undefined,
      modifyQualifier: isSet(object.modifyQualifier)
        ? Response_ModifyQualifier.fromJSON(object.modifyQualifier)
        : undefined,
      imagePreloaded: isSet(object.imagePreloaded)
        ? Response_ImagePreloaded.fromJSON(object.imagePreloaded)
        : undefined,
    };
  },

  toJSON(message: Response): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = response_ResponseTypeToJSON(message.type));
    message.respondingToPacketId !== undefined && (obj.respondingToPacketId = message.respondingToPacketId);
    message.connect !== undefined &&
      (obj.connect = message.connect ? Response_Connect.toJSON(message.connect) : undefined);
    message.leaderboardScores !== undefined && (obj.leaderboardScores = message.leaderboardScores
      ? Response_LeaderboardScores.toJSON(message.leaderboardScores)
      : undefined);
    message.loadedSong !== undefined &&
      (obj.loadedSong = message.loadedSong ? Response_LoadedSong.toJSON(message.loadedSong) : undefined);
    message.modal !== undefined && (obj.modal = message.modal ? Response_Modal.toJSON(message.modal) : undefined);
    message.modifyQualifier !== undefined && (obj.modifyQualifier = message.modifyQualifier
      ? Response_ModifyQualifier.toJSON(message.modifyQualifier)
      : undefined);
    message.imagePreloaded !== undefined &&
      (obj.imagePreloaded = message.imagePreloaded
        ? Response_ImagePreloaded.toJSON(message.imagePreloaded)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Response>, I>>(object: I): Response {
    const message = createBaseResponse();
    message.type = object.type ?? 0;
    message.respondingToPacketId = object.respondingToPacketId ?? "";
    message.connect = (object.connect !== undefined && object.connect !== null)
      ? Response_Connect.fromPartial(object.connect)
      : undefined;
    message.leaderboardScores = (object.leaderboardScores !== undefined && object.leaderboardScores !== null)
      ? Response_LeaderboardScores.fromPartial(object.leaderboardScores)
      : undefined;
    message.loadedSong = (object.loadedSong !== undefined && object.loadedSong !== null)
      ? Response_LoadedSong.fromPartial(object.loadedSong)
      : undefined;
    message.modal = (object.modal !== undefined && object.modal !== null)
      ? Response_Modal.fromPartial(object.modal)
      : undefined;
    message.modifyQualifier = (object.modifyQualifier !== undefined && object.modifyQualifier !== null)
      ? Response_ModifyQualifier.fromPartial(object.modifyQualifier)
      : undefined;
    message.imagePreloaded = (object.imagePreloaded !== undefined && object.imagePreloaded !== null)
      ? Response_ImagePreloaded.fromPartial(object.imagePreloaded)
      : undefined;
    return message;
  },
};

function createBaseResponse_Connect(): Response_Connect {
  return { state: undefined, selfGuid: "", serverVersion: 0, message: "" };
}

export const Response_Connect = {
  encode(message: Response_Connect, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.state !== undefined) {
      State.encode(message.state, writer.uint32(10).fork()).ldelim();
    }
    if (message.selfGuid !== undefined && message.selfGuid !== "") {
      writer.uint32(18).string(message.selfGuid);
    }
    if (message.serverVersion !== undefined && message.serverVersion !== 0) {
      writer.uint32(24).int32(message.serverVersion);
    }
    if (message.message !== undefined && message.message !== "") {
      writer.uint32(34).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Response_Connect {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponse_Connect();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.state = State.decode(reader, reader.uint32());
          break;
        case 2:
          message.selfGuid = reader.string();
          break;
        case 3:
          message.serverVersion = reader.int32();
          break;
        case 4:
          message.message = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Response_Connect {
    return {
      state: isSet(object.state) ? State.fromJSON(object.state) : undefined,
      selfGuid: isSet(object.selfGuid) ? String(object.selfGuid) : "",
      serverVersion: isSet(object.serverVersion) ? Number(object.serverVersion) : 0,
      message: isSet(object.message) ? String(object.message) : "",
    };
  },

  toJSON(message: Response_Connect): unknown {
    const obj: any = {};
    message.state !== undefined && (obj.state = message.state ? State.toJSON(message.state) : undefined);
    message.selfGuid !== undefined && (obj.selfGuid = message.selfGuid);
    message.serverVersion !== undefined && (obj.serverVersion = Math.round(message.serverVersion));
    message.message !== undefined && (obj.message = message.message);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Response_Connect>, I>>(object: I): Response_Connect {
    const message = createBaseResponse_Connect();
    message.state = (object.state !== undefined && object.state !== null) ? State.fromPartial(object.state) : undefined;
    message.selfGuid = object.selfGuid ?? "";
    message.serverVersion = object.serverVersion ?? 0;
    message.message = object.message ?? "";
    return message;
  },
};

function createBaseResponse_LeaderboardScores(): Response_LeaderboardScores {
  return { scores: [] };
}

export const Response_LeaderboardScores = {
  encode(message: Response_LeaderboardScores, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.scores !== undefined && message.scores.length !== 0) {
      for (const v of message.scores) {
        LeaderboardScore.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Response_LeaderboardScores {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponse_LeaderboardScores();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.scores!.push(LeaderboardScore.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Response_LeaderboardScores {
    return { scores: Array.isArray(object?.scores) ? object.scores.map((e: any) => LeaderboardScore.fromJSON(e)) : [] };
  },

  toJSON(message: Response_LeaderboardScores): unknown {
    const obj: any = {};
    if (message.scores) {
      obj.scores = message.scores.map((e) => e ? LeaderboardScore.toJSON(e) : undefined);
    } else {
      obj.scores = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Response_LeaderboardScores>, I>>(object: I): Response_LeaderboardScores {
    const message = createBaseResponse_LeaderboardScores();
    message.scores = object.scores?.map((e) => LeaderboardScore.fromPartial(e)) || [];
    return message;
  },
};

function createBaseResponse_LoadedSong(): Response_LoadedSong {
  return { level: undefined };
}

export const Response_LoadedSong = {
  encode(message: Response_LoadedSong, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.level !== undefined) {
      PreviewBeatmapLevel.encode(message.level, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Response_LoadedSong {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponse_LoadedSong();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.level = PreviewBeatmapLevel.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Response_LoadedSong {
    return { level: isSet(object.level) ? PreviewBeatmapLevel.fromJSON(object.level) : undefined };
  },

  toJSON(message: Response_LoadedSong): unknown {
    const obj: any = {};
    message.level !== undefined && (obj.level = message.level ? PreviewBeatmapLevel.toJSON(message.level) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Response_LoadedSong>, I>>(object: I): Response_LoadedSong {
    const message = createBaseResponse_LoadedSong();
    message.level = (object.level !== undefined && object.level !== null)
      ? PreviewBeatmapLevel.fromPartial(object.level)
      : undefined;
    return message;
  },
};

function createBaseResponse_Modal(): Response_Modal {
  return { modalId: "", value: "" };
}

export const Response_Modal = {
  encode(message: Response_Modal, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.modalId !== undefined && message.modalId !== "") {
      writer.uint32(10).string(message.modalId);
    }
    if (message.value !== undefined && message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Response_Modal {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponse_Modal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.modalId = reader.string();
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

  fromJSON(object: any): Response_Modal {
    return {
      modalId: isSet(object.modalId) ? String(object.modalId) : "",
      value: isSet(object.value) ? String(object.value) : "",
    };
  },

  toJSON(message: Response_Modal): unknown {
    const obj: any = {};
    message.modalId !== undefined && (obj.modalId = message.modalId);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Response_Modal>, I>>(object: I): Response_Modal {
    const message = createBaseResponse_Modal();
    message.modalId = object.modalId ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseResponse_ModifyQualifier(): Response_ModifyQualifier {
  return { message: "" };
}

export const Response_ModifyQualifier = {
  encode(message: Response_ModifyQualifier, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.message !== undefined && message.message !== "") {
      writer.uint32(10).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Response_ModifyQualifier {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponse_ModifyQualifier();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.message = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Response_ModifyQualifier {
    return { message: isSet(object.message) ? String(object.message) : "" };
  },

  toJSON(message: Response_ModifyQualifier): unknown {
    const obj: any = {};
    message.message !== undefined && (obj.message = message.message);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Response_ModifyQualifier>, I>>(object: I): Response_ModifyQualifier {
    const message = createBaseResponse_ModifyQualifier();
    message.message = object.message ?? "";
    return message;
  },
};

function createBaseResponse_ImagePreloaded(): Response_ImagePreloaded {
  return { fileId: "" };
}

export const Response_ImagePreloaded = {
  encode(message: Response_ImagePreloaded, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.fileId !== undefined && message.fileId !== "") {
      writer.uint32(10).string(message.fileId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Response_ImagePreloaded {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponse_ImagePreloaded();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.fileId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Response_ImagePreloaded {
    return { fileId: isSet(object.fileId) ? String(object.fileId) : "" };
  },

  toJSON(message: Response_ImagePreloaded): unknown {
    const obj: any = {};
    message.fileId !== undefined && (obj.fileId = message.fileId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Response_ImagePreloaded>, I>>(object: I): Response_ImagePreloaded {
    const message = createBaseResponse_ImagePreloaded();
    message.fileId = object.fileId ?? "";
    return message;
  },
};

function createBaseAcknowledgement(): Acknowledgement {
  return { packetId: "", type: 0 };
}

export const Acknowledgement = {
  encode(message: Acknowledgement, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.packetId !== undefined && message.packetId !== "") {
      writer.uint32(10).string(message.packetId);
    }
    if (message.type !== undefined && message.type !== 0) {
      writer.uint32(16).int32(message.type);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Acknowledgement {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAcknowledgement();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.packetId = reader.string();
          break;
        case 2:
          message.type = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Acknowledgement {
    return {
      packetId: isSet(object.packetId) ? String(object.packetId) : "",
      type: isSet(object.type) ? acknowledgement_AcknowledgementTypeFromJSON(object.type) : 0,
    };
  },

  toJSON(message: Acknowledgement): unknown {
    const obj: any = {};
    message.packetId !== undefined && (obj.packetId = message.packetId);
    message.type !== undefined && (obj.type = acknowledgement_AcknowledgementTypeToJSON(message.type));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Acknowledgement>, I>>(object: I): Acknowledgement {
    const message = createBaseAcknowledgement();
    message.packetId = object.packetId ?? "";
    message.type = object.type ?? 0;
    return message;
  },
};

function createBaseForwardingPacket(): ForwardingPacket {
  return { forwardTo: [], packet: undefined };
}

export const ForwardingPacket = {
  encode(message: ForwardingPacket, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.forwardTo !== undefined && message.forwardTo.length !== 0) {
      for (const v of message.forwardTo) {
        writer.uint32(10).string(v!);
      }
    }
    if (message.packet !== undefined) {
      Packet.encode(message.packet, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ForwardingPacket {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseForwardingPacket();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.forwardTo!.push(reader.string());
          break;
        case 2:
          message.packet = Packet.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ForwardingPacket {
    return {
      forwardTo: Array.isArray(object?.forwardTo) ? object.forwardTo.map((e: any) => String(e)) : [],
      packet: isSet(object.packet) ? Packet.fromJSON(object.packet) : undefined,
    };
  },

  toJSON(message: ForwardingPacket): unknown {
    const obj: any = {};
    if (message.forwardTo) {
      obj.forwardTo = message.forwardTo.map((e) => e);
    } else {
      obj.forwardTo = [];
    }
    message.packet !== undefined && (obj.packet = message.packet ? Packet.toJSON(message.packet) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ForwardingPacket>, I>>(object: I): ForwardingPacket {
    const message = createBaseForwardingPacket();
    message.forwardTo = object.forwardTo?.map((e) => e) || [];
    message.packet = (object.packet !== undefined && object.packet !== null)
      ? Packet.fromPartial(object.packet)
      : undefined;
    return message;
  },
};

function createBaseEvent(): Event {
  return {
    userAddedEvent: undefined,
    userUpdatedEvent: undefined,
    userLeftEvent: undefined,
    matchCreatedEvent: undefined,
    matchUpdatedEvent: undefined,
    matchDeletedEvent: undefined,
    qualifierCreatedEvent: undefined,
    qualifierUpdatedEvent: undefined,
    qualifierDeletedEvent: undefined,
    hostAddedEvent: undefined,
    hostDeletedEvent: undefined,
  };
}

export const Event = {
  encode(message: Event, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userAddedEvent !== undefined) {
      Event_UserAddedEvent.encode(message.userAddedEvent, writer.uint32(10).fork()).ldelim();
    }
    if (message.userUpdatedEvent !== undefined) {
      Event_UserUpdatedEvent.encode(message.userUpdatedEvent, writer.uint32(18).fork()).ldelim();
    }
    if (message.userLeftEvent !== undefined) {
      Event_UserLeftEvent.encode(message.userLeftEvent, writer.uint32(26).fork()).ldelim();
    }
    if (message.matchCreatedEvent !== undefined) {
      Event_MatchCreatedEvent.encode(message.matchCreatedEvent, writer.uint32(50).fork()).ldelim();
    }
    if (message.matchUpdatedEvent !== undefined) {
      Event_MatchUpdatedEvent.encode(message.matchUpdatedEvent, writer.uint32(58).fork()).ldelim();
    }
    if (message.matchDeletedEvent !== undefined) {
      Event_MatchDeletedEvent.encode(message.matchDeletedEvent, writer.uint32(66).fork()).ldelim();
    }
    if (message.qualifierCreatedEvent !== undefined) {
      Event_QualifierCreatedEvent.encode(message.qualifierCreatedEvent, writer.uint32(74).fork()).ldelim();
    }
    if (message.qualifierUpdatedEvent !== undefined) {
      Event_QualifierUpdatedEvent.encode(message.qualifierUpdatedEvent, writer.uint32(82).fork()).ldelim();
    }
    if (message.qualifierDeletedEvent !== undefined) {
      Event_QualifierDeletedEvent.encode(message.qualifierDeletedEvent, writer.uint32(90).fork()).ldelim();
    }
    if (message.hostAddedEvent !== undefined) {
      Event_HostAddedEvent.encode(message.hostAddedEvent, writer.uint32(98).fork()).ldelim();
    }
    if (message.hostDeletedEvent !== undefined) {
      Event_HostDeletedEvent.encode(message.hostDeletedEvent, writer.uint32(106).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Event {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.userAddedEvent = Event_UserAddedEvent.decode(reader, reader.uint32());
          break;
        case 2:
          message.userUpdatedEvent = Event_UserUpdatedEvent.decode(reader, reader.uint32());
          break;
        case 3:
          message.userLeftEvent = Event_UserLeftEvent.decode(reader, reader.uint32());
          break;
        case 6:
          message.matchCreatedEvent = Event_MatchCreatedEvent.decode(reader, reader.uint32());
          break;
        case 7:
          message.matchUpdatedEvent = Event_MatchUpdatedEvent.decode(reader, reader.uint32());
          break;
        case 8:
          message.matchDeletedEvent = Event_MatchDeletedEvent.decode(reader, reader.uint32());
          break;
        case 9:
          message.qualifierCreatedEvent = Event_QualifierCreatedEvent.decode(reader, reader.uint32());
          break;
        case 10:
          message.qualifierUpdatedEvent = Event_QualifierUpdatedEvent.decode(reader, reader.uint32());
          break;
        case 11:
          message.qualifierDeletedEvent = Event_QualifierDeletedEvent.decode(reader, reader.uint32());
          break;
        case 12:
          message.hostAddedEvent = Event_HostAddedEvent.decode(reader, reader.uint32());
          break;
        case 13:
          message.hostDeletedEvent = Event_HostDeletedEvent.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Event {
    return {
      userAddedEvent: isSet(object.userAddedEvent) ? Event_UserAddedEvent.fromJSON(object.userAddedEvent) : undefined,
      userUpdatedEvent: isSet(object.userUpdatedEvent)
        ? Event_UserUpdatedEvent.fromJSON(object.userUpdatedEvent)
        : undefined,
      userLeftEvent: isSet(object.userLeftEvent) ? Event_UserLeftEvent.fromJSON(object.userLeftEvent) : undefined,
      matchCreatedEvent: isSet(object.matchCreatedEvent)
        ? Event_MatchCreatedEvent.fromJSON(object.matchCreatedEvent)
        : undefined,
      matchUpdatedEvent: isSet(object.matchUpdatedEvent)
        ? Event_MatchUpdatedEvent.fromJSON(object.matchUpdatedEvent)
        : undefined,
      matchDeletedEvent: isSet(object.matchDeletedEvent)
        ? Event_MatchDeletedEvent.fromJSON(object.matchDeletedEvent)
        : undefined,
      qualifierCreatedEvent: isSet(object.qualifierCreatedEvent)
        ? Event_QualifierCreatedEvent.fromJSON(object.qualifierCreatedEvent)
        : undefined,
      qualifierUpdatedEvent: isSet(object.qualifierUpdatedEvent)
        ? Event_QualifierUpdatedEvent.fromJSON(object.qualifierUpdatedEvent)
        : undefined,
      qualifierDeletedEvent: isSet(object.qualifierDeletedEvent)
        ? Event_QualifierDeletedEvent.fromJSON(object.qualifierDeletedEvent)
        : undefined,
      hostAddedEvent: isSet(object.hostAddedEvent) ? Event_HostAddedEvent.fromJSON(object.hostAddedEvent) : undefined,
      hostDeletedEvent: isSet(object.hostDeletedEvent)
        ? Event_HostDeletedEvent.fromJSON(object.hostDeletedEvent)
        : undefined,
    };
  },

  toJSON(message: Event): unknown {
    const obj: any = {};
    message.userAddedEvent !== undefined &&
      (obj.userAddedEvent = message.userAddedEvent ? Event_UserAddedEvent.toJSON(message.userAddedEvent) : undefined);
    message.userUpdatedEvent !== undefined && (obj.userUpdatedEvent = message.userUpdatedEvent
      ? Event_UserUpdatedEvent.toJSON(message.userUpdatedEvent)
      : undefined);
    message.userLeftEvent !== undefined &&
      (obj.userLeftEvent = message.userLeftEvent ? Event_UserLeftEvent.toJSON(message.userLeftEvent) : undefined);
    message.matchCreatedEvent !== undefined && (obj.matchCreatedEvent = message.matchCreatedEvent
      ? Event_MatchCreatedEvent.toJSON(message.matchCreatedEvent)
      : undefined);
    message.matchUpdatedEvent !== undefined && (obj.matchUpdatedEvent = message.matchUpdatedEvent
      ? Event_MatchUpdatedEvent.toJSON(message.matchUpdatedEvent)
      : undefined);
    message.matchDeletedEvent !== undefined && (obj.matchDeletedEvent = message.matchDeletedEvent
      ? Event_MatchDeletedEvent.toJSON(message.matchDeletedEvent)
      : undefined);
    message.qualifierCreatedEvent !== undefined && (obj.qualifierCreatedEvent = message.qualifierCreatedEvent
      ? Event_QualifierCreatedEvent.toJSON(message.qualifierCreatedEvent)
      : undefined);
    message.qualifierUpdatedEvent !== undefined && (obj.qualifierUpdatedEvent = message.qualifierUpdatedEvent
      ? Event_QualifierUpdatedEvent.toJSON(message.qualifierUpdatedEvent)
      : undefined);
    message.qualifierDeletedEvent !== undefined && (obj.qualifierDeletedEvent = message.qualifierDeletedEvent
      ? Event_QualifierDeletedEvent.toJSON(message.qualifierDeletedEvent)
      : undefined);
    message.hostAddedEvent !== undefined &&
      (obj.hostAddedEvent = message.hostAddedEvent ? Event_HostAddedEvent.toJSON(message.hostAddedEvent) : undefined);
    message.hostDeletedEvent !== undefined && (obj.hostDeletedEvent = message.hostDeletedEvent
      ? Event_HostDeletedEvent.toJSON(message.hostDeletedEvent)
      : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Event>, I>>(object: I): Event {
    const message = createBaseEvent();
    message.userAddedEvent = (object.userAddedEvent !== undefined && object.userAddedEvent !== null)
      ? Event_UserAddedEvent.fromPartial(object.userAddedEvent)
      : undefined;
    message.userUpdatedEvent = (object.userUpdatedEvent !== undefined && object.userUpdatedEvent !== null)
      ? Event_UserUpdatedEvent.fromPartial(object.userUpdatedEvent)
      : undefined;
    message.userLeftEvent = (object.userLeftEvent !== undefined && object.userLeftEvent !== null)
      ? Event_UserLeftEvent.fromPartial(object.userLeftEvent)
      : undefined;
    message.matchCreatedEvent = (object.matchCreatedEvent !== undefined && object.matchCreatedEvent !== null)
      ? Event_MatchCreatedEvent.fromPartial(object.matchCreatedEvent)
      : undefined;
    message.matchUpdatedEvent = (object.matchUpdatedEvent !== undefined && object.matchUpdatedEvent !== null)
      ? Event_MatchUpdatedEvent.fromPartial(object.matchUpdatedEvent)
      : undefined;
    message.matchDeletedEvent = (object.matchDeletedEvent !== undefined && object.matchDeletedEvent !== null)
      ? Event_MatchDeletedEvent.fromPartial(object.matchDeletedEvent)
      : undefined;
    message.qualifierCreatedEvent =
      (object.qualifierCreatedEvent !== undefined && object.qualifierCreatedEvent !== null)
        ? Event_QualifierCreatedEvent.fromPartial(object.qualifierCreatedEvent)
        : undefined;
    message.qualifierUpdatedEvent =
      (object.qualifierUpdatedEvent !== undefined && object.qualifierUpdatedEvent !== null)
        ? Event_QualifierUpdatedEvent.fromPartial(object.qualifierUpdatedEvent)
        : undefined;
    message.qualifierDeletedEvent =
      (object.qualifierDeletedEvent !== undefined && object.qualifierDeletedEvent !== null)
        ? Event_QualifierDeletedEvent.fromPartial(object.qualifierDeletedEvent)
        : undefined;
    message.hostAddedEvent = (object.hostAddedEvent !== undefined && object.hostAddedEvent !== null)
      ? Event_HostAddedEvent.fromPartial(object.hostAddedEvent)
      : undefined;
    message.hostDeletedEvent = (object.hostDeletedEvent !== undefined && object.hostDeletedEvent !== null)
      ? Event_HostDeletedEvent.fromPartial(object.hostDeletedEvent)
      : undefined;
    return message;
  },
};

function createBaseEvent_UserAddedEvent(): Event_UserAddedEvent {
  return { user: undefined };
}

export const Event_UserAddedEvent = {
  encode(message: Event_UserAddedEvent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.user !== undefined) {
      User.encode(message.user, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Event_UserAddedEvent {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEvent_UserAddedEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.user = User.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Event_UserAddedEvent {
    return { user: isSet(object.user) ? User.fromJSON(object.user) : undefined };
  },

  toJSON(message: Event_UserAddedEvent): unknown {
    const obj: any = {};
    message.user !== undefined && (obj.user = message.user ? User.toJSON(message.user) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Event_UserAddedEvent>, I>>(object: I): Event_UserAddedEvent {
    const message = createBaseEvent_UserAddedEvent();
    message.user = (object.user !== undefined && object.user !== null) ? User.fromPartial(object.user) : undefined;
    return message;
  },
};

function createBaseEvent_UserUpdatedEvent(): Event_UserUpdatedEvent {
  return { user: undefined };
}

export const Event_UserUpdatedEvent = {
  encode(message: Event_UserUpdatedEvent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.user !== undefined) {
      User.encode(message.user, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Event_UserUpdatedEvent {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEvent_UserUpdatedEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.user = User.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Event_UserUpdatedEvent {
    return { user: isSet(object.user) ? User.fromJSON(object.user) : undefined };
  },

  toJSON(message: Event_UserUpdatedEvent): unknown {
    const obj: any = {};
    message.user !== undefined && (obj.user = message.user ? User.toJSON(message.user) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Event_UserUpdatedEvent>, I>>(object: I): Event_UserUpdatedEvent {
    const message = createBaseEvent_UserUpdatedEvent();
    message.user = (object.user !== undefined && object.user !== null) ? User.fromPartial(object.user) : undefined;
    return message;
  },
};

function createBaseEvent_UserLeftEvent(): Event_UserLeftEvent {
  return { user: undefined };
}

export const Event_UserLeftEvent = {
  encode(message: Event_UserLeftEvent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.user !== undefined) {
      User.encode(message.user, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Event_UserLeftEvent {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEvent_UserLeftEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.user = User.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Event_UserLeftEvent {
    return { user: isSet(object.user) ? User.fromJSON(object.user) : undefined };
  },

  toJSON(message: Event_UserLeftEvent): unknown {
    const obj: any = {};
    message.user !== undefined && (obj.user = message.user ? User.toJSON(message.user) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Event_UserLeftEvent>, I>>(object: I): Event_UserLeftEvent {
    const message = createBaseEvent_UserLeftEvent();
    message.user = (object.user !== undefined && object.user !== null) ? User.fromPartial(object.user) : undefined;
    return message;
  },
};

function createBaseEvent_MatchCreatedEvent(): Event_MatchCreatedEvent {
  return { match: undefined };
}

export const Event_MatchCreatedEvent = {
  encode(message: Event_MatchCreatedEvent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.match !== undefined) {
      Match.encode(message.match, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Event_MatchCreatedEvent {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEvent_MatchCreatedEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.match = Match.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Event_MatchCreatedEvent {
    return { match: isSet(object.match) ? Match.fromJSON(object.match) : undefined };
  },

  toJSON(message: Event_MatchCreatedEvent): unknown {
    const obj: any = {};
    message.match !== undefined && (obj.match = message.match ? Match.toJSON(message.match) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Event_MatchCreatedEvent>, I>>(object: I): Event_MatchCreatedEvent {
    const message = createBaseEvent_MatchCreatedEvent();
    message.match = (object.match !== undefined && object.match !== null) ? Match.fromPartial(object.match) : undefined;
    return message;
  },
};

function createBaseEvent_MatchUpdatedEvent(): Event_MatchUpdatedEvent {
  return { match: undefined };
}

export const Event_MatchUpdatedEvent = {
  encode(message: Event_MatchUpdatedEvent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.match !== undefined) {
      Match.encode(message.match, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Event_MatchUpdatedEvent {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEvent_MatchUpdatedEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.match = Match.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Event_MatchUpdatedEvent {
    return { match: isSet(object.match) ? Match.fromJSON(object.match) : undefined };
  },

  toJSON(message: Event_MatchUpdatedEvent): unknown {
    const obj: any = {};
    message.match !== undefined && (obj.match = message.match ? Match.toJSON(message.match) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Event_MatchUpdatedEvent>, I>>(object: I): Event_MatchUpdatedEvent {
    const message = createBaseEvent_MatchUpdatedEvent();
    message.match = (object.match !== undefined && object.match !== null) ? Match.fromPartial(object.match) : undefined;
    return message;
  },
};

function createBaseEvent_MatchDeletedEvent(): Event_MatchDeletedEvent {
  return { match: undefined };
}

export const Event_MatchDeletedEvent = {
  encode(message: Event_MatchDeletedEvent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.match !== undefined) {
      Match.encode(message.match, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Event_MatchDeletedEvent {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEvent_MatchDeletedEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.match = Match.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Event_MatchDeletedEvent {
    return { match: isSet(object.match) ? Match.fromJSON(object.match) : undefined };
  },

  toJSON(message: Event_MatchDeletedEvent): unknown {
    const obj: any = {};
    message.match !== undefined && (obj.match = message.match ? Match.toJSON(message.match) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Event_MatchDeletedEvent>, I>>(object: I): Event_MatchDeletedEvent {
    const message = createBaseEvent_MatchDeletedEvent();
    message.match = (object.match !== undefined && object.match !== null) ? Match.fromPartial(object.match) : undefined;
    return message;
  },
};

function createBaseEvent_QualifierCreatedEvent(): Event_QualifierCreatedEvent {
  return { event: undefined };
}

export const Event_QualifierCreatedEvent = {
  encode(message: Event_QualifierCreatedEvent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.event !== undefined) {
      QualifierEvent.encode(message.event, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Event_QualifierCreatedEvent {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEvent_QualifierCreatedEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.event = QualifierEvent.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Event_QualifierCreatedEvent {
    return { event: isSet(object.event) ? QualifierEvent.fromJSON(object.event) : undefined };
  },

  toJSON(message: Event_QualifierCreatedEvent): unknown {
    const obj: any = {};
    message.event !== undefined && (obj.event = message.event ? QualifierEvent.toJSON(message.event) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Event_QualifierCreatedEvent>, I>>(object: I): Event_QualifierCreatedEvent {
    const message = createBaseEvent_QualifierCreatedEvent();
    message.event = (object.event !== undefined && object.event !== null)
      ? QualifierEvent.fromPartial(object.event)
      : undefined;
    return message;
  },
};

function createBaseEvent_QualifierUpdatedEvent(): Event_QualifierUpdatedEvent {
  return { event: undefined };
}

export const Event_QualifierUpdatedEvent = {
  encode(message: Event_QualifierUpdatedEvent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.event !== undefined) {
      QualifierEvent.encode(message.event, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Event_QualifierUpdatedEvent {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEvent_QualifierUpdatedEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.event = QualifierEvent.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Event_QualifierUpdatedEvent {
    return { event: isSet(object.event) ? QualifierEvent.fromJSON(object.event) : undefined };
  },

  toJSON(message: Event_QualifierUpdatedEvent): unknown {
    const obj: any = {};
    message.event !== undefined && (obj.event = message.event ? QualifierEvent.toJSON(message.event) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Event_QualifierUpdatedEvent>, I>>(object: I): Event_QualifierUpdatedEvent {
    const message = createBaseEvent_QualifierUpdatedEvent();
    message.event = (object.event !== undefined && object.event !== null)
      ? QualifierEvent.fromPartial(object.event)
      : undefined;
    return message;
  },
};

function createBaseEvent_QualifierDeletedEvent(): Event_QualifierDeletedEvent {
  return { event: undefined };
}

export const Event_QualifierDeletedEvent = {
  encode(message: Event_QualifierDeletedEvent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.event !== undefined) {
      QualifierEvent.encode(message.event, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Event_QualifierDeletedEvent {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEvent_QualifierDeletedEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.event = QualifierEvent.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Event_QualifierDeletedEvent {
    return { event: isSet(object.event) ? QualifierEvent.fromJSON(object.event) : undefined };
  },

  toJSON(message: Event_QualifierDeletedEvent): unknown {
    const obj: any = {};
    message.event !== undefined && (obj.event = message.event ? QualifierEvent.toJSON(message.event) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Event_QualifierDeletedEvent>, I>>(object: I): Event_QualifierDeletedEvent {
    const message = createBaseEvent_QualifierDeletedEvent();
    message.event = (object.event !== undefined && object.event !== null)
      ? QualifierEvent.fromPartial(object.event)
      : undefined;
    return message;
  },
};

function createBaseEvent_HostAddedEvent(): Event_HostAddedEvent {
  return { server: undefined };
}

export const Event_HostAddedEvent = {
  encode(message: Event_HostAddedEvent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.server !== undefined) {
      CoreServer.encode(message.server, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Event_HostAddedEvent {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEvent_HostAddedEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.server = CoreServer.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Event_HostAddedEvent {
    return { server: isSet(object.server) ? CoreServer.fromJSON(object.server) : undefined };
  },

  toJSON(message: Event_HostAddedEvent): unknown {
    const obj: any = {};
    message.server !== undefined && (obj.server = message.server ? CoreServer.toJSON(message.server) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Event_HostAddedEvent>, I>>(object: I): Event_HostAddedEvent {
    const message = createBaseEvent_HostAddedEvent();
    message.server = (object.server !== undefined && object.server !== null)
      ? CoreServer.fromPartial(object.server)
      : undefined;
    return message;
  },
};

function createBaseEvent_HostDeletedEvent(): Event_HostDeletedEvent {
  return { server: undefined };
}

export const Event_HostDeletedEvent = {
  encode(message: Event_HostDeletedEvent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.server !== undefined) {
      CoreServer.encode(message.server, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Event_HostDeletedEvent {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEvent_HostDeletedEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.server = CoreServer.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Event_HostDeletedEvent {
    return { server: isSet(object.server) ? CoreServer.fromJSON(object.server) : undefined };
  },

  toJSON(message: Event_HostDeletedEvent): unknown {
    const obj: any = {};
    message.server !== undefined && (obj.server = message.server ? CoreServer.toJSON(message.server) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Event_HostDeletedEvent>, I>>(object: I): Event_HostDeletedEvent {
    const message = createBaseEvent_HostDeletedEvent();
    message.server = (object.server !== undefined && object.server !== null)
      ? CoreServer.fromPartial(object.server)
      : undefined;
    return message;
  },
};

function createBasePacket(): Packet {
  return {
    id: "",
    from: "",
    acknowledgement: undefined,
    forwardingPacket: undefined,
    command: undefined,
    push: undefined,
    request: undefined,
    response: undefined,
    event: undefined,
  };
}

export const Packet = {
  encode(message: Packet, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined && message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.from !== undefined && message.from !== "") {
      writer.uint32(18).string(message.from);
    }
    if (message.acknowledgement !== undefined) {
      Acknowledgement.encode(message.acknowledgement, writer.uint32(26).fork()).ldelim();
    }
    if (message.forwardingPacket !== undefined) {
      ForwardingPacket.encode(message.forwardingPacket, writer.uint32(34).fork()).ldelim();
    }
    if (message.command !== undefined) {
      Command.encode(message.command, writer.uint32(42).fork()).ldelim();
    }
    if (message.push !== undefined) {
      Push.encode(message.push, writer.uint32(50).fork()).ldelim();
    }
    if (message.request !== undefined) {
      Request.encode(message.request, writer.uint32(58).fork()).ldelim();
    }
    if (message.response !== undefined) {
      Response.encode(message.response, writer.uint32(66).fork()).ldelim();
    }
    if (message.event !== undefined) {
      Event.encode(message.event, writer.uint32(74).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Packet {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePacket();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.from = reader.string();
          break;
        case 3:
          message.acknowledgement = Acknowledgement.decode(reader, reader.uint32());
          break;
        case 4:
          message.forwardingPacket = ForwardingPacket.decode(reader, reader.uint32());
          break;
        case 5:
          message.command = Command.decode(reader, reader.uint32());
          break;
        case 6:
          message.push = Push.decode(reader, reader.uint32());
          break;
        case 7:
          message.request = Request.decode(reader, reader.uint32());
          break;
        case 8:
          message.response = Response.decode(reader, reader.uint32());
          break;
        case 9:
          message.event = Event.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Packet {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      from: isSet(object.from) ? String(object.from) : "",
      acknowledgement: isSet(object.acknowledgement) ? Acknowledgement.fromJSON(object.acknowledgement) : undefined,
      forwardingPacket: isSet(object.forwardingPacket) ? ForwardingPacket.fromJSON(object.forwardingPacket) : undefined,
      command: isSet(object.command) ? Command.fromJSON(object.command) : undefined,
      push: isSet(object.push) ? Push.fromJSON(object.push) : undefined,
      request: isSet(object.request) ? Request.fromJSON(object.request) : undefined,
      response: isSet(object.response) ? Response.fromJSON(object.response) : undefined,
      event: isSet(object.event) ? Event.fromJSON(object.event) : undefined,
    };
  },

  toJSON(message: Packet): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.from !== undefined && (obj.from = message.from);
    message.acknowledgement !== undefined &&
      (obj.acknowledgement = message.acknowledgement ? Acknowledgement.toJSON(message.acknowledgement) : undefined);
    message.forwardingPacket !== undefined &&
      (obj.forwardingPacket = message.forwardingPacket ? ForwardingPacket.toJSON(message.forwardingPacket) : undefined);
    message.command !== undefined && (obj.command = message.command ? Command.toJSON(message.command) : undefined);
    message.push !== undefined && (obj.push = message.push ? Push.toJSON(message.push) : undefined);
    message.request !== undefined && (obj.request = message.request ? Request.toJSON(message.request) : undefined);
    message.response !== undefined && (obj.response = message.response ? Response.toJSON(message.response) : undefined);
    message.event !== undefined && (obj.event = message.event ? Event.toJSON(message.event) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Packet>, I>>(object: I): Packet {
    const message = createBasePacket();
    message.id = object.id ?? "";
    message.from = object.from ?? "";
    message.acknowledgement = (object.acknowledgement !== undefined && object.acknowledgement !== null)
      ? Acknowledgement.fromPartial(object.acknowledgement)
      : undefined;
    message.forwardingPacket = (object.forwardingPacket !== undefined && object.forwardingPacket !== null)
      ? ForwardingPacket.fromPartial(object.forwardingPacket)
      : undefined;
    message.command = (object.command !== undefined && object.command !== null)
      ? Command.fromPartial(object.command)
      : undefined;
    message.push = (object.push !== undefined && object.push !== null) ? Push.fromPartial(object.push) : undefined;
    message.request = (object.request !== undefined && object.request !== null)
      ? Request.fromPartial(object.request)
      : undefined;
    message.response = (object.response !== undefined && object.response !== null)
      ? Response.fromPartial(object.response)
      : undefined;
    message.event = (object.event !== undefined && object.event !== null) ? Event.fromPartial(object.event) : undefined;
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

function bytesFromBase64(b64: string): Uint8Array {
  if (globalThis.Buffer) {
    return Uint8Array.from(globalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = globalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if (globalThis.Buffer) {
    return globalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(String.fromCharCode(byte));
    });
    return globalThis.btoa(bin.join(""));
  }
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
