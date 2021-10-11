local cmd = string.format("node %s/../build/index.js 3189140", vim.fn.expand("%:p:h"))
local function print_stdout(_, data, _)
	local msg = vim.fn.json_decode(data)
	print(vim.inspect(msg))
	require("notify")(msg.msg, "info", { title = msg.type })
end
local function print_err(chan_id, data, name) end

print(cmd)
vim.fn.jobstart(cmd, { on_stdout = print_stdout, on_stderr = print_err })
