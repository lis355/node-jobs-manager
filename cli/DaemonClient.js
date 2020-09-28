const { IPC } = require("node-ipc");

module.exports = class DaemonClient {
	constructor() {
		this.ipc = new IPC();

		this.DAEMON_NAME = app.info.name;

		this.ipc.config.silent = true;
		this.ipc.config.maxRetries = 0;

		this.hasDaemon = false;
	}

	async connect() {
		this.hasDaemon = await new Promise(resolve => {
			this.ipc.connectTo(this.DAEMON_NAME, () => {
				this.ipc.of[this.DAEMON_NAME].on("error", () => {
					return resolve(false);
				});

				this.ipc.of[this.DAEMON_NAME].on("connect", () => {
					return resolve(true);
				});
			});
		});
	}

	async disconnect() {
		if (this.hasDaemon) {
			this.ipc.disconnect(this.DAEMON_NAME);
		}
	}

	async command(cmd) {
		if (this.hasDaemon) {
			this.ipc.of[this.DAEMON_NAME].emit("command", cmd);
		}
	}
};
