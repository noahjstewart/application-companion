const express = require('express');
const router = express.Router();

const Application = require('../../models/application');

// GET /api/applications
router.get('/', (req, res) => {
  Application.find({}).sort({company: 'asc'}).exec((err, applications) => {
    if (err) res.status(404);
    console.log("Sending applications")
    res.json(applications);
  });
});

// POST /api/applications
router.post('/', (req, res) => {
  const application = new Application(req.body);
  application.save(err => {
    if (err) res.status(422).json({ message: "Failed to create application" });
    console.log(`Creating application: ${application}`);
    res.status(201).json(application);
  })
});

// DELETE /api/applications/:id
router.delete('/:id', (req, res) => {
  Application.findByIdAndRemove(req.params.id, (err, application) => {
    if (err) res.send(err);
    console.log(`Removing application: ${application}`);
    res.status(200).json(application);
  });
});

module.exports = router;