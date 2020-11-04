const User = require('../../../models/User');

const update = async (req, res) => {
  try {
    const { tokenUser, body, admin } = req;
    const { email, ...data } = body;
    const { id } = req.params;

    // Se o _id for informado por um adminstrador na body
    const userId = id || tokenUser._id;

    if (!admin && id && id !== tokenUser._id) {
      return res.status(401).json({ error: `O id não pode ser alterado` });
    }

    const user = await User.findById(userId);

    if (!user)
      return res
        .status(400)
        .json({ error: `O id ${userId} não foi encontrado` });

    await User.findByIdAndUpdate(userId, data);

    return res.status(200).json(user);
  } catch (error) {
    console.log('\x1b[31m', `[API] Error on update user`, error);
    return res.status(500).json(error);
  }
};

module.exports = update;
