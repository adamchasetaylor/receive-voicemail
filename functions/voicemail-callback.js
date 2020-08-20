const request = require('request');

exports.handler = function(context, event, callback) {
  console.log(event);
  const recordingUrl = event.url;

  request.get({ uri: recordingUrl, encoding: null }, (error, response, body) => {
    const email = {
      personalizations: [{ to: [{ email: context.TO_EMAIL_ADDRESS }] }],
      from: { email: context.FROM_EMAIL_ADDRESS },
      subject: `New voicemail from ${event.From}`,
      content: [
        {
          type: 'text/plain',
          value: 'Your voicemail is attached.'
        }
      ],
      attachments: []
    };
    if (!error && response.statusCode === 200) {
      email.attachments.push({
        content: body.toString('base64'),
        filename: "Voicemail.wav",
        type: response.headers['content-type']
      });
    }
    request.post(
      {
        uri: 'https://api.sendgrid.com/v3/mail/send',
        body: email,
        auth: {
          bearer: context.SENDGRID_API_KEY
        },
        json: true
      },
      (error, response, body) => {
        if (error) {
          return callback(error);
        } else {
          return callback();
        }
      }
    );
  });
}