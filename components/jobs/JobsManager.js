const Job = require("./Job");

module.exports = class JobsManager extends ndapp.ApplicationComponent {
	async initialize() {
		await super.initialize();

		this.jobs = app.config.jobs.map(job => new Job(job));
		this.queue = [];
	}

	queueJob(name) {
		const job = this.jobs.find(job => job.name === name);
		if (job) {
			this.queue.push(job);

			setImmediate(this.update.bind(this));
		}
	}

	update() {
		if (this.queue.length === 0) return;

		const job = this.queue.pop();
		job.start();
	}
};
