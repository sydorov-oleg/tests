const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const TourModel = require('./models/tourModel');

dotenv.config({ path: './config.env' });

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.DB).then(() => {
  console.log('DB ready');
});

const toursText = fs.readFileSync(
  `${__dirname}/dev-data/data/tours-simple.json`,
  'utf-8'
);
const tours = JSON.parse(toursText);

async function importData() {
  try {
    await TourModel.create(tours);
    console.log('Data Loaded!');
  } catch (err) {
    console.error(err);
  }
  process.exit();
}

async function deleteData() {
  try {
    await TourModel.deleteMany();
    console.log('Data Deleted!');
  } catch (err) {
    console.error(err);
  }
  process.exit();
}

const [one, two, three] = process.argv;

if (three === '--import') {
  importData();
} else if (three === '--delete') {
  deleteData();
}

console.log(two);
