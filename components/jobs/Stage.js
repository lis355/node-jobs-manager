module.exports = class Stage {
	constructor(job, stage) {
		this.job = job;

		app.libs._.assign(this, stage);

		this.cwd = this.cwd || this.job.cwd;
	}

	async run() { }
};
