const os = require("os");

const nodegit = require("nodegit");
const semver = require("semver");

async function rebaseOnRemoteMaster(repo) {
	await repo.fetch("origin", {
		prune: nodegit.Fetch.PRUNE.GIT_FETCH_PRUNE
	});

	await repo.checkoutBranch("master", { checkoutStrategy: nodegit.Checkout.STRATEGY.FORCE });

	const originMasterCommit = await repo.getReferenceCommit("origin/master");
	await nodegit.Reset.reset(repo, originMasterCommit, nodegit.Reset.TYPE.HARD);
}

async function getMasterCommitBuildHistory(repo) {
	let commit = await repo.getMasterCommit();

	await rebaseOnRemoteMaster(repo);

	const history = [];
	let version;
	while (commit) {
		let message = commit.message();

		const commitBuildVersion = semver.valid(message.split(" ")[1]);

		if (!version && !commitBuildVersion) {
			return;
		}

		if (version && commitBuildVersion) {
			break;
		}

		if (!version && commitBuildVersion) {
			version = commitBuildVersion;
			history.push(version);
		}

		message = message.replace(commitBuildVersion, "").replace("  ", " ").replace(/\n+$/, "");

		history.push(message);

		commit = await commit.parent(0);
	}

	return history.join(os.EOL);
}

(async () => {
	const repo = await nodegit.Repository.open("C:/Programming/ndapp");// C:/Programming/JDAM/Code/jbot");
	const history = await getMasterCommitBuildHistory(repo);
	if (history) {
		console.log(history);
	}
})();
