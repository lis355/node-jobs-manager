const ndapp = require("ndapp");

const info = require("./info");

class AppManager extends ndapp.Application {
	async initialize() {
		app.log.info(`${app.info.name} v${app.info.version}`);

		app.workspace = require(app.path.join(process.cwd(), app.arguments.workspace));

		await super.initialize();
	}

	async run() {
		await super.run();

		app.jobsManager.run("jbot2");
	}
}

ndapp({
	app: new AppManager(),
	components: [
		// () => new (require("./components/DaemonServer"))()
		// () => new (require("./components/server/Server"))(),
		// () => new (require("./components/PluginsManager"))(),
		() => new (require("./components/jobs/JobsManager"))()
	],
	enums: require("./enums"),
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
