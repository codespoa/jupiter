const User = require('../../../models/User');

const list = async (req, res) => {
  try {
    const { name, active, sort, page, perPage, filter } = req.query;

    const options = {
      limit: perPage,
      page,
      select: '-password -active',
      sort,
    };

    const query = {};
    if (filter) {
      query.first_name = { $regex: name, $options: 'i' };
    }

    if (typeof active === 'boolean') {
      query.active = active;
    }

    let user = [];

    if (page) {
      user = await User.paginate(query, options);
    } else {
      const total = await User.find().count();
      user = await User.paginate(query, { ...options, limit: total });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log('\x1b[31m', `[API] Error on list users`, error);
    return res.status(500).json(error);
  }
};

module.exports = list;
