const { spawn } = require("child_process");

module.exports = class Daemon {
	initialize() {
		const child = spawn("node", [app.path.join(__dirname, "../main.js")]);

		child.stdout.on("data", data => {
			console.log(`stdout: ${data}`);
		});

		child.stderr.on("data", data => {
			console.error(`stderr: ${data}`);
		});

		child.on("error", (error) => {
			app.log.error(error.message);

			return app.exit();
		});

		child.on("close", code => {
			return app.exit(code);
		});
	}
};
