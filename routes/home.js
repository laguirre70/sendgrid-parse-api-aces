var home = {
  handler: function (request) {
    request.reply({ success: true, message: 'You are using aces-inbound-parse service' });
  }
};

server.addRoute({
  method  : 'GET',
  path    : '/',
  config  : home
});
