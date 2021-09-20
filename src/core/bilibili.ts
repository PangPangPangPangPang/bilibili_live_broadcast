import http from 'http';
import net from 'net';
import _ from 'lodash';
import zlib from 'zlib';
import { PacketType } from '@type/types';
import { CmdType } from '@type/danmu';


const max = 2000000000;
const min = 1000000000;

type CallbackType = {
  [key in CmdType]?: (data: any) => void;
};

export default class Bilibili {
  host = "livecmt-1.bilibili.com"
  port = 788
  roomID = 0
  socket: net.Socket = undefined;
  callbacks: CallbackType = {}
  constructor() {

  }
  async start(id: string) {
    await this.getRoomID(id);
    this.createConnect();
  }

  handleDanmu(type: CmdType, callback: (data: any) => void) {
    this.callbacks[type] = callback;

  }
  createConnect() {
    this.socket = net.createConnection({ port: this.port, host: this.host });
    this.socket.on('connect', () => {
      this.joinChannel();
      this.keepHeartBeat();

    })
    this.socket.on('data', (data) => {
      const expr = Number(data.readInt32BE(8))
      let body = data.subarray(16);
      switch (expr) {
        case PacketType.ServerMsg:
          this.handleMsg(body)
          break;
        case PacketType.ServerAuth:
          break;
        case PacketType.ServerHeartBeat:
          break;
        default:
          break;
      }
    })
  }

  handleMsg(body: Buffer) {
    zlib.inflate(body, (error, buffer) => {
      if (error === null && buffer) {
        let msg = buffer.subarray(16).toString()
        let invalid = [];
        for (let index = 0; index < msg.length; index++) {
          const c = msg[index];
          if (c === '}' && index < msg.length) {
            const nextc = msg[index + 1];
            if (nextc !== "," && nextc !== "}" && nextc !== "\"" && nextc !== "]") {
              invalid.push(index + 1);
            }
          }
        }
        let msgs = []
        let prev = 0;
        invalid.forEach(idx => {
          msgs.push(msg.substring(prev, idx))
          prev = idx + 16
        })
        msgs.forEach(item => {
          try {
            const obj = JSON.parse(item);
            const cmd = _.get(obj, 'cmd')
            const cb = this.callbacks[cmd];
            if (cb) {
              switch (cmd) {
                case CmdType.INTERACT_WORD:
                  cb(obj.data)
                  break;
                case CmdType.DANMU_MSG:
                  cb(obj.info)
                default:
                  break;
              }
            } else {
              console.log(obj)
            }
          } catch (error) {
          }
        })
      }
    })

  }

  getRoomID(id: string) {
    return new Promise((resolve, _reject) => {
      http.get(`http://api.live.bilibili.com/room/v1/Room/room_init?id=${id}`, res => {
        let body = '';
        res.on('data', data => {
          body += data;
        });
        res.on('end', () => {
          const parsed = JSON.parse(body);
          this.roomID = _.get(parsed, 'data.room_id')
          resolve(parsed)
        })
      })
    })
  }

  joinChannel() {
    const body = { roomid: this.roomID, uid: Math.floor(Math.random() * max + min) };
    this.sendSocketData(0, 16, 1, PacketType.ClientAuth, JSON.stringify(body))
  }

  keepHeartBeat() {
    setInterval(() => {
      this.sendSocketData(0, 16, 1, PacketType.ClientHeartBeat, "");
    }, 5000);

  }

  sendSocketData(packageLength: number, headerLength: number, version: number, action: number, body: string) {
    let bodyBuf = Buffer.from(body, 'utf8');
    if (packageLength === 0) {
      packageLength = bodyBuf.length + 16
    }
    let buf = Buffer.from([0, 0, 0, packageLength, 0, headerLength, 0, version, 0, 0, 0, action, 0, 0, 0, 1]);

    const data = Buffer.concat([buf, bodyBuf]);
    this.socket.write(data, err => {
      if (err) {
        console.log(err)
      }
    });
  }
}
