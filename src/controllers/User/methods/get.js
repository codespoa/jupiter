const User = require('../../../models/User');

const get = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById({ _id: id }).select('-password');

    if (!user)
      return res.status(400).json({ error: `O id '${id}' não foi encontrado` });

    return res.status(200).json(user);
  } catch (error) {
    console.log('\x1b[31m', `[API] Error on get user`, error);
    return res.status(500).json(error);
  }
};

module.exports = get;
