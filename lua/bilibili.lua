local M = {}
local actions = require("bilibili.utils").actions

M.config = {
	handler = function(msg)
		require("notify")(msg.msg, "info", { title = actions[msg.type] })
	end,
}

M.setup = function(args)
    local config = M.config
	for key, value in pairs(args) do
		config[key] = value
	end
end

M.run = function(args)
    local handler = M.config.handler
	if vim.fn.executable("node") ~= 1 then
		print("Need install node!")
		return
	end
	local present, _ = pcall(require, "notify")
	if present ~= true then
		print("Need install notify!")
		return
	end

	local cmd = string.format("node %s/build/index.js %s", vim.g.bilibili_root, args)
	local function print_stdout(_, data, _)
		local msg = vim.fn.json_decode(data)
		handler(msg)
	end
	local function print_err(_, data, _)
		local msg = vim.fn.json_decode(data)
		require("notify")(actions[msg.msg], "error", { title = msg.type })
	end
	vim.fn.jobstart(cmd, { on_stdout = print_stdout, on_stderr = print_err })
end
return M
