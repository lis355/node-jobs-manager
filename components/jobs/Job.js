const { createStage } = require("./Stages");

module.exports = class Job {
	constructor(jobsManager, job) {
		app.libs._.assign(this, job);

		this.jobsManager = jobsManager;

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
			if (this.canceled) break;

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

	cancel() {
		this.canceled = true;

		app.log.info(`Job ${this.name} canceled`);
	}

	abort(error = null) {
		this.canceled = true;

		app.log.info(`Job ${this.name} aborted`);

		if (error) app.log.error(error.stack);
	}
};
