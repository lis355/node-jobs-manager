const { httpStatus } = app.libs;

const router = app.libs.express.Router();

router.use(app.libs.bodyParser.json());
router.use(app.libs.bodyParser.text());

router.use("/api/", require("../routes/api"));

router.use((req, res) => {
	app.events.emit(app.events.EVENT_TYPES.WEB_REQUEST, req);

	return res.sendStatus(httpStatus.OK);
});

module.exports = router;
