import http from 'http';
// const http = require('http');
export default class Bilibili {
  constructor() {

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
          resolve(parsed)
        })
      })
    })
  }
}
