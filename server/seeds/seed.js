const db = require('../config/connection');
const { Example } = require('../models');

const exampleData = require('./exampleData.json');

db.once('open', async () => {
  await Example.deleteMany({});

  const examples = await Example.insertMany(exampleData);

  console.log('Examples seeded!');
  process.exit(0);
});
