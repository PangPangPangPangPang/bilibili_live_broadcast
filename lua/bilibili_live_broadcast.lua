local M = {}
local actions = require("bilibili_live_broadcast.utils").actions

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
	local config = M.config
	if config.job ~= nil then
		print("Already start!")
		return
	end
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
		local succ, msg = pcall(vim.fn.json_decode, data)
		if succ then
			config.handler(msg)
		end
	end
	local function print_err(_, data, _)
		local succ, msg = pcall(vim.fn.json_decode, data)
		if succ then
			require("notify")(actions[msg.msg], "error", { title = msg.type })
		end
	end

	local job_id = vim.fn.jobstart(cmd, { on_stdout = print_stdout, on_stderr = print_err })
	config.job = job_id
end
M.stop = function()
	local config = M.config
	if config.job ~= nil then
		vim.fn.jobstop(config.job)
		print("Stopped!")
		return
	end
end
return M
