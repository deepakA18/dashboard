const express = require('express');
const router = express.Router();

const getData = require('../controllers/data')

router.route('/data').get(getData);

module.exports = router;