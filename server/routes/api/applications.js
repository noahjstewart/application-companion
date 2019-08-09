const express = require('express');
const router = express.Router();

const Application = require('../../models/application');

// GET /api/applications
router.get('/', (req, res) => {
  Application.find({}).sort({created_at: 'desc'}).exec((err, applications) => {
    if (err) res.status(404).json();
    console.log("Sending applications")
    res.send(applications);
  });
});

// POST /api/applications
router.post('/', (req, res) => {
  const application = new Application(req.body);
  application.save(err => {
    if (err) res.status().json({ message: "Failed to create application" });
    console.log("Created application");
    res.status(201).json(application);
  })
});

module.exports = router;