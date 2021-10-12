let g:bilibili_root = expand('<sfile>:h:h')
command! -nargs=*  BiliLive lua require('bilibili_live_broadcast').run(unpack({<f-args>}))
