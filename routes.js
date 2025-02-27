// routes.js
const express = require('express');
const { getVisits } = require('./visitsController');
const router = express.Router();

router.get('/', getVisits);

module.exports = router;