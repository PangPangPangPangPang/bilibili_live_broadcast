let g:bilibili_root = expand('<sfile>:h:h')
command! -nargs=*  BiliLive lua require('bilibili').run(unpack({<f-args>}))
