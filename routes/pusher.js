/**
 * New node file
 */
var Pusher = require('pusher');

var pusher = new Pusher({
	appId: '119285',
	key: '379bfc578ad712a7784e',
	secret: 'ad203622556cbdb0f272'
});

pusher.trigger('test_channel', 'my_event', {
	"message": "hello world"
});

exports.pusher=pusher;