export type BroadcastMessageMap = {
  PLAYER_LIST: {
    player_ids: string[];
    active_ids: string[];
  };
  PLAYER_MESSAGE: {
    playerId: string;
    message: string;
  };
  HOST_IDENTIFIER: {
    hostId: string;
  };
  PLAYER_CONFIG_LIST: {
    playerConfigs: PlayerConfig[];
  }
  PLAYER_CONFIG_SET: PlayerConfig
};

export type PlayerConfig = {
  playerId: string;
  name: string;
  avatarHash: string;
}

export type BroadcastCodes = keyof BroadcastMessageMap;

export type BroadcastData<T extends BroadcastCodes = BroadcastCodes> =
  BroadcastMessageMap[T];

export type BroadcastMessage<T extends BroadcastCodes = BroadcastCodes> = {
  broadcast_code: T;
  data: BroadcastData<T>;
};
