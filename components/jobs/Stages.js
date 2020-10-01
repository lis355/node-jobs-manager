const Stage = require("./Stage");
const executeShellCommand = require("./executeShellCommand");

const { JOB_STAGE_TYPES } = app.enums;

class ShellStage extends Stage {
	async run() {
		await super.run();

		app.log.info(`Execute command: ${this.cmd[0]}`);
		const exitCode = await executeShellCommand({
			cmd: this.cmd[0],
			cwd: this.job.cwd,
			onStdOutData: data => {
				app.log.info(data.toString());
			},
			onStdErrData: data => {
				app.log.error(data.toString());
			}
		});

		if (exitCode !== 0) {
			// error
		}
	}
}

function createStage(job, stage) {
	switch (stage.type) {
		// case JOB_STAGE_TYPES.JS_SCRIPT: return null;
		case JOB_STAGE_TYPES.SHELL_SCRIPT: return new ShellStage(job, stage);
		// case JOB_STAGE_TYPES.JOB: return null;
		default: throw new Error("stage.type");
	}
}

module.exports = {
	ShellStage,
	createStage
};
