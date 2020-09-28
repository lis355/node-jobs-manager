const { IPC } = require("node-ipc");

module.exports = class DaemonServer extends ndapp.ApplicationComponent {
	constructor() {
		super();

		if (app.arguments.daemon === "false") return;

		this.ipc = new IPC();

		this.DAEMON_NAME = app.info.name;

		this.ipc.config.id = this.DAEMON_NAME;
		this.ipc.config.silent = true;
	}

	async initialize() {
		if (app.arguments.daemon === "false") return;

		this.ipc.serve(() => {
			this.ipc.server.on("command", (cmd, socket) => {
				app.log.info(cmd);
			});
		});

		this.ipc.server.start();
	}
};
