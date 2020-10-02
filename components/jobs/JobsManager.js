const Job = require("./Job");

module.exports = class JobsManager extends ndapp.ApplicationComponent {
	async initialize() {
		await super.initialize();

		this.queue = [];

		this.currentJob = null;
	}

	run(name) {
		let job = app.workspace.jobs.find(job => job.name === name);
		if (job) {
			this.queue.push(new Job(job));
			setImmediate(this.update.bind(this));
		}
	}

	async update() {
		if (this.queue.length === 0 || this.currentJob) return;

		this.currentJob = this.queue.pop();
		await this.currentJob.run();

		setImmediate(this.update.bind(this));
	}
};
