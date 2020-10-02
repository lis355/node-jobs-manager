module.exports = class PluginsManager extends ndapp.ApplicationComponent {
	async initialize() {
		await super.initialize();

		this.plugins = [];

		app.workspace.plugins.forEach(plugin => {
			const Plugin = require(app.path.join(process.cwd(), plugin.file));
			this.plugins.push(new Plugin());
		});
	}

	async run() {
		await super.run();

		this.plugins.forEach(plugin => {
			plugin.load();
		});
	}
};
