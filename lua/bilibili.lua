local M = {}
M.setup = function()
	vim.cmd([[
        command -nargs=1 BiliLive lua require('bilibili').run(<args>)
    ]])
end

M.run = function(args)
	local cmd = string.format("node %s/../build/index.js %s", vim.fn.expand("%:p:h"), args)
	local function print_stdout(_, data, _)
		local msg = vim.fn.json_decode(data)
		print(vim.inspect(msg))
		require("notify")(msg.msg, "info", { title = msg.type })
	end
	local function print_err(_, data, _)
		local msg = vim.fn.json_decode(data)
		print(vim.inspect(msg))
		require("notify")(msg.msg, "error", { title = msg.type })
    end
	vim.fn.jobstart(cmd, { on_stdout = print_stdout, on_stderr = print_err })
end
return M
