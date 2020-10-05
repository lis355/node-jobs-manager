module.exports = async (scriptPath, ...args) => {
	scriptPath = require.resolve(scriptPath);

	delete require.cache[scriptPath];
	const asyncFunction = require(scriptPath);
	await asyncFunction(...args);
};
