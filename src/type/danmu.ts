export interface Contribution {
  grade: number;
}

export interface FansMedal {
  anchor_roomid: number;
  guard_level: number;
  icon_id: number;
  is_lighted: number;
  medal_color: number;
  medal_color_border: number;
  medal_color_end: number;
  medal_color_start: number;
  medal_level: number;
  medal_name: string;
  score: number;
  special: string;
  target_id: number;
}

export interface Interact {
  contribution: Contribution;
  dmscore: number;
  fans_medal: FansMedal;
  identities: number[];
  is_spread: number;
  msg_type: number;
  roomid: number;
  score: number;
  spread_desc: string;
  spread_info: string;
  tail_icon: number;
  timestamp: number;
  trigger_time: number;
  uid: number;
  uname: string;
  uname_color: string;
}

export interface RootObject {
  cmd: CmdType;
  data: Data;
}

