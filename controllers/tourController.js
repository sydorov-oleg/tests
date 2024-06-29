const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

function checkID(req, res, next, value) {
  if (req.params * 1 > tours.length) {
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }
  next();
}

// ===== Tours =====
function getAllTours(req, res) {
  res.status(200).send({
    status: 'success',
    results: tours.length,
    requestedAt: req.requestTime,
    data: { tours },
  });
}

function createTour(req, res) {
  const newID = tours[tours.length - 1].id + 1;
  const newTour = { ...req.body, id: newID };
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'succuss',
        requestedAt: req.requestTime,
        data: { tour: newTour },
      });
    }
  );
}

function getTour(req, res) {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  if (!tour) {
    res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  } else {
    res.status(200).json({ status: 'success', data: { tour } });
  }
}

function updateTour(req, res) {
  res.status(200).json({ status: 'success', data: { tour: 'updated thing' } });
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
  checkID,
};
