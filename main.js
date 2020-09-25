const ndapp = require("ndapp");

const { version, name } = require("./package.json");

ndapp({
	components: [
		() => new (require("./components/server/Server"))(),
		() => new (require("./components/PluginsManager"))(),
		() => new (require("./components/jobs/JobsManager"))()
	],
	enums: {
		"STAGE_TYPES": new ndapp.enum({
			"JS_SCRIPT": "js",
			"SHELL_SCRIPT": "shell",
			"JOB": "job"
		})
	},
	libs: {
		express: require("express"),
		bodyParser: require("body-parser"),
		httpStatus: require("http-status-codes")
	},
	tools: {
	},
	specials: {
		info: { version, name },
		events: require("./events")
	},
	onRun: () => {
		app.jobsManager.queueJob("jbot");
	}
});
