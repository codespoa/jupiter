const mongoose = require('mongoose');

const createCollection = async (name, model) => {
  try {
    if (!name) throw new Error('Name not provided');
    if (!model) throw new Error('Model not provided');

    const result = await mongoose.connection.db
      .listCollections({ name })
      .next();

    if (result) {
      console.log('\x1b[36m', `[API] The collection ${name} already exists`);
      return 'exists';
    }

    await model.createCollection();
    console.log('\x1b[32m', `[API] The collection ${name} has been created`);
    return 'created';
  } catch (error) {
    console.log('\x1b[31m', `[API] Error on create collection ${name}`, error);

    return false;
  }
};

module.exports = createCollection;
