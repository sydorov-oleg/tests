const TourModel = require('./../models/tourModel');

// ===== Tours =====
async function getAllTours(req, res) {
  try {
    const tours = await TourModel.find();
    res.status(200).send({
      status: 'success',
      results: tours.length,
      data: { tours },
    });
  } catch (err) {
    res.status(404).json({ status: 'fail', message: 'Route not active' });
  }
}

async function createTour(req, res) {
  try {
    const { body } = req;
    const newTour = await TourModel.create(body);
    res.status(201).json({ status: 'success', data: { tour: newTour } });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: 'Invalid data' });
  }
}

async function getTour(req, res) {
  try {
    const { id } = req.params;
    const tour = await TourModel.findById(id);
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }
}

async function updateTour(req, res) {
  try {
    const { params, body } = req;
    const tour = await TourModel.findByIdAndUpdate(params.id, body, {
      new: true,
    });
    res.status(200).json({ status: 'success', data: { tour } });
  } catch (err) {
    res.status(404).json({ status: 'fail', message: err });
  }
}

function deleteTour(req, res) {
  res.status(200).json({ status: 'success', data: null });
}

module.exports = {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
};
