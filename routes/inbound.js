var inbound = {
  handler: function (request) {
    var envelope;
    var to;
    var payload   = request.payload;

    console.log(payload);

    if (payload.envelope) { envelope = JSON.parse(payload.envelope) };
    if (envelope)         { to = envelope.from; }

    var Email     = sendgrid.Email;
    var email     = new Email({
      to:       "leo.m.aguirre@gmail.com",
      from:     "no-reply@aces.conciergeconfirmation.com",
      subject:  "Email from guest, please follow up",
      text:     "Someone replied to an Email that was sent using GoConcierge.com\nhere are the details:\nEmail Text: "
      + payload.text + "\nEmail From:" + payload.from +"\nEmail Subject:" + payload.subject + "\n\nAttached is the full payload"
    });

    email.addFile({
      filename: 'payload.txt',
      content: new Buffer(JSON.stringify(payload))
    });

    sendgrid.send(email, function(err, json) {
      if (err) { 
        console.error(err);
        request.reply({ success: false, error: {message: err.message} });
      } else {
        request.reply({ success: true });
      }
    });
  }
};

server.addRoute({
  method  : 'POST',
  path    : '/inbound',
  config  : inbound
});
