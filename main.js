const ndapp = require("ndapp");

const info = require("./info");

ndapp({
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
	},
	onRun: () => {
		app.log.info(`${app.info.name} v${app.info.version}`);

		app.jobsManager.run("jbot");
	}
});
