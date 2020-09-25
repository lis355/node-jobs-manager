module.exports = class Job {
	constructor(job) {
		this.job = job;
	}

	get name() {
		return this.job.name;
	}
};
