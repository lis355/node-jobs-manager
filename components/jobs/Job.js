const { createStage } = require("./Stages");

module.exports = class Job {
	constructor(job) {
		app.libs._.assign(this, job);

		this.stages = this.stages.map(stage => createStage(this, stage));

		this.started = false;
		this.finished = false;

		this.aborted = false;
		this.error = null;
	}

	async run() {
		this.started = true;

		app.log.info(`Job ${this.name} started`);
		app.log.info(`Working directory ${this.cwd}`);
		app.events.emit(app.events.EVENT_TYPES.JOB_STARTED, this);

		for (let i = 0; i < this.stages.length; i++) {
			try {
				await this.stages[i].run();
			} catch (error) {
				this.abort(error);

				break;
			}
		}

		this.finished = true;

		app.log.info(`Job ${this.name} finished`);
		app.events.emit(app.events.EVENT_TYPES.JOB_FINISHED, this);
	}

	abort(error) {
		this.error = error;
		this.aborted = true;

		app.log.info(`Job ${this.name} aborted with error ${this.error.message}`);
	}
};
