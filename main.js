#!/usr/bin/env node

const ndapp = require("ndapp");

const info = require("./info");

const DEVELOPER_ENVIRONMENT = Boolean(process.env.DEVELOPER_ENVIRONMENT);

class AppManager extends ndapp.Application {
	async initialize() {
		app.log.info(`${app.info.name} v${app.info.version}, NodeJS ${process.version}`);

		if (app.constants.DEVELOPER_ENVIRONMENT) {
			const developConstantsFilePath = app.path.join(process.cwd(), "constants.development.js");
			if (app.fs.existsSync(developConstantsFilePath)) {
				app.libs._.assign(app.constants, require(developConstantsFilePath));
			}
		}

		const workspacePath = app.path.resolve(app.constants.workspace || app.arguments.workspace || "");
		try {
			app.workspace = require(workspacePath);

			app.log.info(`Loaded workspace from ${workspacePath}`);
			app.log.info(`Jobs: [${app.workspace.jobs.map(job => job.name).join(", ")}]`);
		} catch (error) {
			app.log.error(`Error in ${workspacePath}: ${error.message}`);

			return app.quit();
		}

		await super.initialize();
	}

	// async run() {
	// 	await super.run();
	// }
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
