local M = {}

M.run = function(args)
    if vim.fn.executable('node') ~= 1 then
        print('Need install node!')
        return;
    end
    local present, _ = pcall(require, 'notify')
    if present ~= true then
        print('Need install nofity!')
        return
    end

    local cmd = string.format("node %s/build/index.js %s", vim.g.bilibili_root, args)
    local function print_stdout(_, data, _)
        local msg = vim.fn.json_decode(data)
        require("notify")(msg.msg, "info", { title = msg.type })
    end
    local function print_err(_, data, _)
        local msg = vim.fn.json_decode(data)
        require("notify")(msg.msg, "error", { title = msg.type })
    end
    vim.fn.jobstart(cmd, { on_stdout = print_stdout, on_stderr = print_err })
end
return M
