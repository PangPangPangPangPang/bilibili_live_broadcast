export interface MedalInfo {
  anchor_roomid: number;
  anchor_uname: string;
  guard_level: number;
  icon_id: number;
  is_lighted: number;
  medal_color: number;
  medal_color_border: number;
  medal_color_end: number;
  medal_color_start: number;
  medal_level: number;
  medal_name: string;
  special: string;
  target_id: number;
}

export interface Gift {
  action: string;
  batch_combo_id: string;
  batch_combo_send?: any;
  beatId: string;
  biz_source: string;
  blind_gift?: any;
  broadcast_id: number;
  coin_type: string;
  combo_resources_id: number;
  combo_send?: any;
  combo_stay_time: number;
  combo_total_coin: number;
  crit_prob: number;
  demarcation: number;
  discount_price: number;
  dmscore: number;
  draw: number;
  effect: number;
  effect_block: number;
  face: string;
  giftId: number;
  giftName: string;
  giftType: number;
  gold: number;
  guard_level: number;
  is_first: boolean;
  is_special_batch: number;
  magnification: number;
  medal_info: MedalInfo;
  name_color: string;
  num: number;
  original_gift_name: string;
  price: number;
  rcost: number;
  remain: number;
  rnd: string;
  send_master?: any;
  silver: number;
  super: number;
  super_batch_gift_num: number;
  super_gift_num: number;
  svga_block: number;
  tag_image: string;
  tid: string;
  timestamp: number;
  top_list?: any;
  total_coin: number;
  uid: number;
  uname: string;
}
