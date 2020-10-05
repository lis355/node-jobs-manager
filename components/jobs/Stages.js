const Stage = require("./Stage");
const executeJavaScript = require("./executeJavaScript");
const executeShellCommand = require("./executeShellCommand");

const { JOB_STAGE_TYPES } = app.enums;

class JavaScriptStage extends Stage {
	async run() {
		await super.run();

		app.log.info(`Execute JS script at ${this.file}`);

		await executeJavaScript(this.file, this);
	}
}

class ShellStage extends Stage {
	async run() {
		await super.run();

		this.errorMessage = "";

		for (let i = 0; i < this.cmd.length; i++) {
			const cmd = this.cmd[i];
			app.log.info(`Execute shell command: ${cmd}`);

			const exitCode = await executeShellCommand({
				cmd,
				cwd: this.cwd,
				onStdOutData: data => {
					app.log.info(data.toString().trim());
				},
				onStdErrData: data => {
					const message = data.toString().trim();
					this.errorMessage += message + app.os.EOL;

					app.log.error(message);
				}
			});

			if (exitCode !== 0) {
				throw new Error(this.errorMessage);
			}
		}
	}
}

function createStage(job, stage) {
	switch (stage.type) {
		case JOB_STAGE_TYPES.JS_SCRIPT: return new JavaScriptStage(job, stage);
		case JOB_STAGE_TYPES.SHELL_SCRIPT: return new ShellStage(job, stage);
		// case JOB_STAGE_TYPES.JOB: return null;
		default: throw new Error("stage.type");
	}
}

module.exports = {
	ShellStage,
	createStage
};
