const Job = require("./Job");

module.exports = class JobsManager extends ndapp.ApplicationComponent {
	async initialize() {
		await super.initialize();

		this.jobs = app.config.jobs.map(job => new Job(job));
	}

	run(name) {
		const job = this.jobs.find(job => job.name === name);
		if (job) {
			job.run();
		}
	}
};
