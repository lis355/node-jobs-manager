#!/usr/bin/env node

const ndapp = require("ndapp");

const info = require("./info");

const DEVELOPER_ENVIRONMENT = Boolean(process.env.DEVELOPER_ENVIRONMENT);

class AppManager extends ndapp.Application {
	async initialize() {
		app.log.info(`${app.info.name} v${app.info.version}, NodeJS ${process.version}`);

		if (app.constants.DEVELOPER_ENVIRONMENT) {
			const developConstantsFilePath = app.path.join(process.cwd(), "config.development.js");
			app.develop = app.fs.existsSync(developConstantsFilePath) ? require(developConstantsFilePath) : {};
		}

		let workspacePath;
		if (app.arguments.workspace) workspacePath = app.arguments.workspace;
		if (app.constants.DEVELOPER_ENVIRONMENT &&
			app.develop.workspacePath) workspacePath = app.develop.workspacePath;

		if (app.fs.existsSync(workspacePath)) {
			try {
				app.workspace = require(workspacePath);

				app.log.info(`Loaded workspace from ${workspacePath}`);
				app.log.info(`Jobs: [${app.workspace.jobs.map(job => job.name).join(", ")}]`);
			} catch (error) {
				app.log.error(`Error in ${workspacePath}: ${error.message}`);

				return app.quit();
			}
		} else {
			app.log.info("No workspace file");

			return app.quit();
		}

		await super.initialize();
	}

	async run() {
		await super.run();

		if (app.constants.DEVELOPER_ENVIRONMENT &&
			app.develop.runJob) app.jobsManager.runJob(app.develop.runJob);
	}
}

ndapp({
	app: new AppManager(),
	components: [
		// () => new (require("./components/DaemonServer"))()
		() => new (require("./components/server/Server"))(),
		// () => new (require("./components/PluginsManager"))(),
		() => new (require("./components/jobs/JobsManager"))()
	],
	enums: require("./enums"),
	constants: {
		DEVELOPER_ENVIRONMENT
	},
	libs: {
		express: require("express"),
		bodyParser: require("body-parser"),
		httpStatus: require("http-status-codes")
	},
	tools: {
	},
	specials: {
		info,
		events: require("./events")
	}
});
