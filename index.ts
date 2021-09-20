import Bilibili from "@core/bilibili";
import { CmdType, Interact } from "@type/danmu";

async function main() {
  const bilibili = new Bilibili();
  bilibili.handleDanmu(CmdType.DANMU_MSG, (info: any[]) => {
    console.log(`${info[2][1]}: ${info[1]}`)
  })
  bilibili.handleDanmu(CmdType.INTERACT_WORD, (info: Interact) => {
    if (info.msg_type === 1) {
      // console.log(`${info.uname} 进入乐直播间`)
    }
  })
  bilibili.start('23386433');
}
main()
