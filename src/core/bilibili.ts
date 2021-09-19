import http from 'http';
import net from 'net';
import _ from 'lodash';
import { Socket } from 'dgram';
import { buffer, json } from 'stream/consumers';
import zlib from 'zlib';

const max = 2000000000;
const min = 1000000000;

export default class Bilibili {
  host = "livecmt-1.bilibili.com"
  port = 788
  roomID = 0
  socket: net.Socket = undefined;
  constructor() {

  }
  async start(id: string) {
    await this.getRoomID(id);
    this.createConnect();
  }
  createConnect() {
    this.socket = net.createConnection({ port: this.port, host: this.host });
    this.socket.on('connect', () => {
      this.joinChannel();
      this.keepHeartBeat();

    })
    this.socket.on('data', (data) => {
      const buf = data.readInt32BE(0)
      const len = Number(buf.toString());
      const expr = Number(data.readInt32BE(8))
      // console.log(expr)
      let body = data.subarray(16);
      // if (expr === 5) {
        zlib.inflate(body, (error, buffer) => {
          if (error === null && buffer) {
            let msg = buffer.subarray(16).toString()
            // let sub = msg.substring(16)
            try {
              let invalid = [];
              for (let index = 0; index < msg.length; index++) {
                const c = msg[index];
                if (c === '}' && index < msg.length) {
                  const nextc = msg[index + 1];
                  if (nextc !== "," && nextc !== "}" && nextc !== "\"") {
                    invalid.push(index + 1);
                    // console.log(msg[index + 1])
                  }
                }
              }
              let msgs = []
              let prev = 0;
              invalid.forEach(idx => {
                msgs.push(msg.substring(prev, idx))
                prev = idx + 16
              })

              console.log(msgs)
              msgs.forEach(item => {
                console.log(JSON.parse(item))

              })
            } catch (error) {
              console.log(error)

            }

          }
        })
        //   const buf2 = data.readIntBE(16, len - 16)
        //   console.log(buf2.toString())
      // }

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
    this.sendSocketData(0, 16, 1, 7, JSON.stringify(body))
  }

  keepHeartBeat() {
    setInterval(() => {
      this.sendSocketData(0, 16, 1, 2, "");
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
