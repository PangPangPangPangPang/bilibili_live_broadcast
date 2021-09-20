export enum PacketType {
  ClientHeartBeat = 2,
  ServerHeartBeat = 3,
  ServerMsg = 5,
  ClientAuth = 7,
  ServerAuth = 8,
}

export enum CmdType {
  DANMU_MSG = "DANMU_MSG",
  SEND_GIFT = "SEND_GIFT",
  WELCOME = "WELCOME",
  WELCOME_GUARD = "WELCOME_GUARD",
  SYS_MSG = "SYS_MSG",
  PREPARING = "PREPARING",
  LIVE = "LIVE",
  INTERACT_WORD = "INTERACT_WORD",
  ENTRY_EFFECT = "ENTRY_EFFECT",
}
