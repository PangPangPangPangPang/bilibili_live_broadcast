import Bilibili from "@core/bilibili";
// const Bilibili = require('@core/bilibili');
const bilibili = new Bilibili();
const promise = bilibili.getRoomID('102');
promise.then(ret => {
  console.log(ret)
})

