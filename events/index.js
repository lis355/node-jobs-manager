const EventEmitter = require("events");

const eventEmitter = new EventEmitter();

const EVENT_TYPES = new ndapp.enum([
	"WEB_REQUEST"
]);

eventEmitter.EVENT_TYPES = EVENT_TYPES;

module.exports = eventEmitter;
