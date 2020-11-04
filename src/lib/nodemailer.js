const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

const sendEmail = async ({ email, subject, template, values }) => {
  const {
    SENDGRID_USERNAME,
    SENDGRID_PASSWORD,
    SENDGRID_FROM_EMAIL,
  } = process.env;

  const source = fs.readFileSync(
    path.join(__dirname, `../templates/${template}.html`),
    'utf8'
  );

  const templates = handlebars.compile(source);

  const smtpTransport = nodemailer.createTransport({
    name: 'Servidor de email',
    service: 'SendGrid',
    auth: {
      user: SENDGRID_USERNAME,
      pass: SENDGRID_PASSWORD,
    },
  });

  const mailOptions = {
    to: email,
    from: `"boilerplate-api"< ${SENDGRID_FROM_EMAIL}>`,
    subject,
    html: templates(values),
  };

  return smtpTransport.sendMail(mailOptions);
};

module.exports = sendEmail;
