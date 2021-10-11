import Bilibili from "@core/bilibili";
import { Interact } from "@type/danmu";
import { Gift } from "@type/gift";
import { CmdType } from "@type/types";

async function main() {
  if (process.argv.length < 3) {
    console.error("RoomID need!")
    return;
  }
  const bilibili = new Bilibili();
  bilibili.handleDanmu(CmdType.DANMU_MSG, (info: any[]) => {
    const msg = JSON.stringify({type: CmdType.DANMU_MSG, msg:`${info[2][1]}: ${info[1]}`})
    console.log(msg)
  })
  bilibili.handleDanmu(CmdType.INTERACT_WORD, (info: Interact) => {
    if (info.msg_type === 1) {
      const msg = JSON.stringify({type: CmdType.INTERACT_WORD, msg:`${info.uname} 进入了直播间`})
      console.log(msg)
    }
  })
  bilibili.handleDanmu(CmdType.SEND_GIFT, (info: Gift) => {
      const msg = JSON.stringify({type: CmdType.SEND_GIFT, msg: `${info.uname} ${info.action} ${info.giftName} 共${info.num}个`})
      console.log(msg)

  })
  bilibili.handleDanmu(CmdType.ENTRY_EFFECT, (_info: any) => {

  })
  bilibili.start(`${process.argv[2]}`);
}
main()
