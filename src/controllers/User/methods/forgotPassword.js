const jwt = require('jsonwebtoken');
const emailTokenConfig = require('../../../config/email');
const nodemailer = require('../../../lib/nodemailer');

const User = require('../../../models/User');
const EmailToken = require('../../../models/EmailToken');

const forgotPassword = async (req, res) => {
  try {
    const { device, email } = req.body;

    // Verificando se o e-mail já existe
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ error: 'E-mail não cadastrado' });

    const { _id } = user;

    // Verifica se existem algum token ativo
    const emailToken = await EmailToken.findOne({ user: _id, active: true });

    // Se não ouver token ativo, gera um novo
    const token =
      emailToken.token ||
      jwt.sign({ _id }, emailTokenConfig.secret, {
        expiresIn: emailTokenConfig.expiresIn,
      });

    const links = {
      web: {
        label: 'Abrir página',
        value: `http://localhost/recover/${token}`,
      },
      ios: {
        label: 'Abrir aplicativo',
        value: `bolao://auth/new-password/${token}`,
      },
      android: {
        label: 'Abrir aplicativo',
        value: `bolao://bolao/auth/new-password/${token}`,
      },
    };

    const options = {
      email,
      subject: 'Bolão Bem Bolado - Recuperar senha',
      template: 'recover-password',
      values: {
        text_action: links[device].label,
        recover_link: links[device].value,
      },
    };

    const result = await nodemailer(options);

    if (result.rejected && result.rejected.length > 0)
      return res.status(403).json({
        result: result.rejected,
      });

    return res.status(200).json({
      result: result.accepted,
    });
  } catch (error) {
    console.log('\x1b[31m', `[API] Error on user forgot password`, error);
    return res.status(500).json(error);
  }
};

module.exports = forgotPassword;
