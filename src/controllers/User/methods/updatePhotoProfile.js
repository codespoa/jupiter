const User = require('../../../models/User');

const updatePhotoProfile = async (req, res) => {
  try {
    const { tokenUser, body } = req;
    const { id } = body;
    const { location } = req.file;

    // Se o id for informado por um adminstrador na body
    const userId = id || tokenUser._id;

    const user = await User.findById(userId);

    if (!user)
      return res
        .status(400)
        .json({ error: `O id ${userId} não foi encontrado` });

    if (location) user.profile_photo = location;

    // Usuário que está alterando
    user.updated_by = tokenUser._id;

    user.save();

    return res.status(200).json(user);
  } catch (error) {
    console.log('\x1b[31m', `[API] Error on update profile photo user`, error);
    return res.status(500).json(error);
  }
};

module.exports = updatePhotoProfile;
