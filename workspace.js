module.exports = {
	port: 8090,
	plugins: [
		{
			file: "./test/webhook.js"
		}
	],
	jobs: [
		// {
		// 	"name": "jbot",
		// 	"cwd": "C:/Programming/JDAM/Code/jbot",
		// 	"stages": [
		// 		{
		// 			"type": "shell",
		// 			"cmd": [
		// 				"git reset --hard",
		// 				"git checkout develop",
		// 				"git pull"
		// 			]
		// 		},
		// 		{
		// 			"type": "shell",
		// 			"cmd": [
		// 				"cd common",
		// 				"yarn",
		// 				"cd ..",
		// 				"cd bot",
		// 				"yarn",
		// 				"cd builder",
		// 				"node bot-build.js --botdir=.. --builddir=."
		// 			]
		// 		},
		// 		{
		// 			"type": "shell",
		// 			"cmd": [
		// 				"cd ../..",
		// 				"cd services/deploy",
		// 				"node jbot-deploy.js"
		// 			]
		// 		}
		// 	]
		// },
		{
			name: "jbot2",
			cwd: "C:/Programming/JDAM/Code/jbot",
			stages: [
				{
					type: "js",
					file: "C:/Programming/JSTests/NodeTests/git.js"
				}
			]
		}
	]
};
