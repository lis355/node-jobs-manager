module.exports = class Stage {
	constructor(job, stage) {
		this.job = job;

		app.libs._.assign(this, stage);
	}

	async run() { }
};
