const { spawn } = require("child_process");

const { parse } = require("shell-quote");

module.exports = async ({ cmd, cwd, onStdOutData, onStdErrData, onExit }) => new Promise((resolve, reject) => {
	const parsedCmd = parse(cmd);
	const programm = parsedCmd[0];
	const args = parsedCmd.slice(1);

	const options = { shell: true };
	if (cwd) {
		options.cwd = cwd;
	}

	const child = spawn(programm, args, options);

	child.stdout.on("data", data => onStdOutData && onStdOutData(data));

	child.stderr.on("data", data => onStdErrData && onStdErrData(data));

	child.on("exit", code => {
		onExit && onExit();

		return resolve(code);
	});
});
