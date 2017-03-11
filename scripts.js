function afterRender(req, res, done) {
  // see https://github.com/sendgrid/sendgrid-nodejs for details about using sendgrid package
  var SendGrid = require('sendgrid');
  var helper = SendGrid.mail;

  // change this with the emails you want to test
  var from_email = new helper.Email('bjrmatos@gmail.com');
  var to_email = new helper.Email('bjrmatos@gmail.com');
  var subject = 'Tes email from jsreport!';
  var content = new helper.Content('text/plain', 'Hello, Email!');
  var mail = new helper.Mail(from_email, subject, to_email, content);
  var attachment = new helper.Attachment();

  attachment.setContent(res.content.toString('base64'));
  attachment.setType("application/pdf");
  attachment.setFilename("report.pdf");
  attachment.setDisposition("attachment");

  mail.addAttachment(attachment);

  console.log('*********************** RUNNING SCRIPTS (SENDING EMAIL) *******************');

  var sg = SendGrid('..YOU SENDGRID API KEY HERE...')

  var request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON(),
  });

  sg.API(request, function(error, response) {
    if (error) {
      console.error('error sending email:', error);
      console.error(error.response && JSON.stringify(error.response.body))
      return done(error);
    }

    console.log(response.statusCode);
    console.log(response.body);
    console.log(response.headers);

    console.log('EMAIL SENT!');
    done();
  });
}
