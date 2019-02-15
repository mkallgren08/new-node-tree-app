const Pusher = require('pusher');

var pusher = new Pusher({
  appId: '713669',
  key: '651f8f2fd68d8e9f1ab0',
  secret: 'bb6c55ebcb5b177bb6bd',
  cluster: 'mt1',
  useTLS: true
});

module.exports=pusher