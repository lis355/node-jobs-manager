const { httpStatus } = app.libs;

const router = app.libs.express.Router();

router.get("/jobs/queue/", (req, res) => {
	app.jobsManager.queueJob(req.query.name);

	return res.sendStatus(httpStatus.OK);
});

router.use("*", (req, res) => {
	return res.sendStatus(httpStatus.NOT_FOUND);
});

module.exports = router;
