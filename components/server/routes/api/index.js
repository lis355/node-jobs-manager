const { httpStatus } = app.libs;

const router = app.libs.express.Router();

router.get("/jobs/run/", (req, res) => {
	const jobId = app.jobsManager.runJob(req.query.name);

	return res.sendStatus(jobId ? httpStatus.OK : httpStatus.NOT_FOUND);
});

router.use("*", (req, res) => {
	return res.sendStatus(httpStatus.NOT_FOUND);
});

module.exports = router;
