const { createStage } = require("./Stages");
const executeJavaScript = require("./executeJavaScript");

module.exports = class Job {
	constructor(job) {
		app.libs._.assign(this, job);

		this.stages = this.stages.map(stage => createStage(this, stage));

		this.id = app.tools.hash(`${app.moment()} ${Math.random()}`);
		this.timer = new app.tools.time.Timer();

		this.started = false;
		this.finished = false;

		this.aborted = false;
		this.error = null;
	}

	async run() {
		this.started = true;

		this.timer.reset();

		app.log.info(`Job ${this.name} started`);
		app.log.info(`Working directory ${this.cwd}`);
		app.events.emit(app.events.EVENT_TYPES.JOB_STARTED, this);

		for (let i = 0; i < this.stages.length; i++) {
			try {
				await this.stages[i].run();
			} catch (error) {
				await this.abort(error);

				break;
			}
		}

		this.finished = true;

		app.log.info(`Job ${this.name} finished in ${app.libs._.round(this.timer.time(), 2)} seconds`);
		app.events.emit(app.events.EVENT_TYPES.JOB_FINISHED, this);
	}

	async abort(error) {
		this.error = error;
		this.aborted = true;

		app.log.info(`Job ${this.name} aborted with error ${this.error.message}`);

		if (this.errorHandler && this.errorHandler.file) {
			try {
				await executeJavaScript(this.errorHandler.file, this, this.error);
			} catch (error) {
				app.log.error(error.message);
			}
		}
	}
};
