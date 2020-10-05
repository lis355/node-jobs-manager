const Job = require("./Job");

module.exports = class JobsManager extends ndapp.ApplicationComponent {
	async initialize() {
		await super.initialize();

		this.queue = [];

		this.currentJob = null;
	}

	runJob(name) {
		let job = app.workspace.jobs.find(job => job.name === name);
		if (job) {
			job = new Job(job);
			this.queue.push(job);
			setImmediate(this.update.bind(this));

			return job.id;
		}

		return null;
	}

	async update() {
		if (this.queue.length === 0 || this.currentJob) return;

		this.currentJob = this.queue.pop();
		await this.currentJob.run();
		this.currentJob = null;

		setImmediate(this.update.bind(this));
	}
};
