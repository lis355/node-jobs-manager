module.exports = class {
	constructor() {
		this.token = app.tools.json.load(app.path.join(process.cwd(), "test", "githubWebhookToken.json"));

		this.handleWebRequest = this.handleWebRequest.bind(this);
	}

	async load() {
		app.events.on(app.events.EVENT_TYPES.WEB_REQUEST, this.handleWebRequest);
	}

	async unload() {
		app.events.off(app.events.EVENT_TYPES.WEB_REQUEST, this.handleWebRequest);
	}

	async handleWebRequest(req) {
		if (req.url.endsWith("webhook/jbot/") &&
			req.headers["x-gitlab-event"] === "Push Hook" &&
			req.headers["x-gitlab-token"] === this.token &&
			req.body.ref === "refs/heads/master") {
			// app.jobsManager.queueJob("jbot");
		}
	}
};
