import Pusher from 'pusher-js'

const pusher = new Pusher('651f8f2fd68d8e9f1ab0', {
  cluster: 'mt1',
  forceTLS: true
});

export default {
  pusher: pusher
}