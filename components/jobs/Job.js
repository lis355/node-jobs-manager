const { createStage } = require("./Stages");

module.exports = class Job {
	constructor(job) {
		app.libs._.assign(this, job);

		this.stages = this.stages.map(stage => createStage(this, stage));
	}

	async run() {
		for (let i = 0; i < this.stages.length; i++) {
			await this.stages[i].run();
		}
	}
};
