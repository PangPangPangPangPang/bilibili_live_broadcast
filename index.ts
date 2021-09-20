import Bilibili from "@core/bilibili";
import { Interact } from "@type/danmu";
import { Gift } from "@type/gift";
import { CmdType } from "@type/types";
import { random } from "@utils/random";
import 'colors';

async function main() {
  if (process.argv.length < 3) {
    console.error("RoomID need!")
    return;
  }
  const bilibili = new Bilibili();
  bilibili.handleDanmu(CmdType.DANMU_MSG, (info: any[]) => {
    console.log(`${random(`${info[2][1]}: `).bold}${info[1]}`)
  })
  bilibili.handleDanmu(CmdType.INTERACT_WORD, (info: Interact) => {
    if (info.msg_type === 1) {
      console.log(`${info.uname} 进入乐直播间`.grey)
    }
  })
  bilibili.handleDanmu(CmdType.SEND_GIFT, (info: Gift) => {
    console.log(`${info.uname} ${info.action} ${info.giftName} 共${info.num}个`.rainbow)

  })
  bilibili.handleDanmu(CmdType.ENTRY_EFFECT, (_info: any) => {

  })
  bilibili.start(`${process.argv[2]}`);
}
main()
