const http = require("http");
const httpShutdown = require("http-shutdown");
const cors = require("cors");

const { httpStatus } = app.libs;

module.exports = class Server extends ndapp.ApplicationComponent {
	async initialize() {
		await super.initialize();

		const application = app.libs.express();
		application.disable("x-powered-by");
		application.use(cors());
		application.use(require("./routes"));

		// application.use(app.libs.express.static(app.arguments.homepagedir));

		// application.get("*", (req, res) => {
		// 	return res.sendFile(app.path.join(app.arguments.homepagedir, "index.html"));
		// });

		application.all("*", (req, res) => {
			// return res.redirect("/");

			return res.sendStatus(httpStatus.NOT_FOUND);
		});

		const port = app.config.port;

		httpShutdown(http.createServer({}, application)).listen({ port }, () => {
			app.log.info(`${app.info.name} v${app.info.version} started on port ${port}`);
		});
	}
};
