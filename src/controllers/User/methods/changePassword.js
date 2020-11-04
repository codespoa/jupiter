const bcrypt = require('bcrypt');
const User = require('../../../models/User');

const update = async (req, res) => {
  try {
    const { tokenUser, body } = req;
    const { _id, current_password, new_password } = body;

    // Se o usuário não for um administrador e estiver tentando alterar outro ID a API não autoriza
    if (_id && !tokenUser.admin && tokenUser._id !== _id)
      return res
        .status(401)
        .json({ error: 'Você não tem permissão para alterar outro usuário' });

    // Se o _id for informado por um adminstrador na body
    const userId = _id || tokenUser._id;

    const user = await User.findOne({ _id: userId }).select('+password');

    if (!user)
      return res
        .status(400)
        .json({ error: `O id ${userId} não foi encontrado` });

    // Se o usuário não for uma admin
    if (!tokenUser.admin || (tokenUser.admin && tokenUser._id !== _id)) {
      // Comparando as senhas
      const passwordIsEqual = await bcrypt.compare(
        current_password,
        user.password
      );

      if (!passwordIsEqual)
        return res.status(401).json({ error: 'A senha atual está incorreta' });
    }

    // Transformando a senha em um hash
    const passwordHashed = await bcrypt.hash(new_password, 8);

    // Busca o usuário, e atualiza a senha
    const userUpdated = await User.findByIdAndUpdate(
      { _id: userId },
      { password: passwordHashed }
    );

    return res.status(200).json(userUpdated);
  } catch (error) {
    console.log('\x1b[31m', `[API] Error on user change password`, error);
    return res.status(500).json(error);
  }
};

module.exports = update;
