const mongoose = require('mongoose');
const seedData = require('../data');
const Meals = require('./meals.model');
async function connect() {
  // mongoose.set('debug', true);
  return mongoose.connect('mongodb+srv://arooj-user:Hb4mNCQskRS1YQi9@cluster0.akcml2h.mongodb.net/event-planner?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

async function seedCollection(model, data, upsertField) {
  const count = await model.countDocuments();
  if (count === data.length) {
    return;
  }
  console.log('*** Seeding DB Collection:', model.collection.name);
  // Upsert data
  for (const entry of data) {
    await model.findOneAndUpdate(
      { [upsertField]: entry[upsertField] },
      {
        $set: entry,
      },
      { upsert: true }
    );
  }
  console.log('*** Seeded', model.collection.name, 'with', data.length, 'documents');
}

async function seedDb() {
  await seedCollection(Meals, seedData.meals, 'value');
}

exports.connect = connect;
exports.seedDb = seedDb;
