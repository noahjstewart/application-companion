const express = require('express');
const router = express.Router();

const Application = require('../../models/application');

// GET /api/applications
router.get('/', (req, res) => {
  Application.find({}).sort({company: 'asc'}).exec((err, applications) => {
    if (err) return res.sendStatus(404);
    console.log("Sending applications")
    res.json(applications);
  });
});

// POST /api/applications
router.post('/', (req, res) => {
  const application = new Application(req.body);
  application.save(err => {
    if (err) return res.status(422).json(err.message);
    console.log(`Creating application: ${application}`);
    res.status(201).json(application);
  })
});

// GET /api/applications/:id
router.get('/:id', (req, res) => {
  Application.findById(req.params.id, (err, application) => {
    if (err) return res.status(404).json(err.message);
    console.log(`Sending application: ${application}`);
    res.status(200).json(application);
  });
});

// PUT /api/applications/:id
router.put('/:id', (req, res) => {
  Application.findByIdAndUpdate(req.params.id,
    req.body,
    { new: true },
    (err, application) => {
      if (err) return res.json(err.message);
    console.log(`Editing application (new): ${application}`);
    res.status(200).json(application);
  });
});

// DELETE /api/applications/:id
router.delete('/:id', (req, res) => {
  Application.findByIdAndRemove(req.params.id, (err, application) => {
    if (err) return res.json(err.message);
    console.log(`Removing application: ${application}`);
    res.status(200).json(application);
  });
});


module.exports = router;