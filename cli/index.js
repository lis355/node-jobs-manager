#!/usr/bin/env node

// если скрипт запускается без аргументов или с аргументом start то значит нужно стартовать демона
// если с аргументами - нужно отправить демону эту команду

const ndapp = require("ndapp");

const info = require("../info");
const Daemon = require("./Daemon");
const DaemonClient = require("./DaemonClient");

ndapp({
	specials: {
		info
	},
	onRun: async () => {
		const daemonClient = new DaemonClient();
		await daemonClient.connect();

		const firstArg = app.libs._.first(app.arguments._);
		const userWantToStart = !firstArg || firstArg === "start";
		const hasDaemon = daemonClient.hasDaemon;

		if (!userWantToStart && hasDaemon) {
			const args = process.argv.slice(2).join(" ");

			await daemonClient.command(args);

			await daemonClient.disconnect();
		} else if (userWantToStart && hasDaemon) {
			app.log.info(`${app.info.name} уже запущен`);

			await daemonClient.disconnect();
		} else if (!userWantToStart && !hasDaemon) {
			app.log.info(`${app.info.name} не запущен`);
		} else if (userWantToStart && !hasDaemon) {
			const daemon = new Daemon();
			daemon.initialize();
		}
	}
});
