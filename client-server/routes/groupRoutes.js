
const express = require('express');
const router = express.Router();
const {
  getAllGroups,
  createGroup
} = require('../controllers/groupController');

router.get('/', getAllGroups);
router.post('/', createGroup);

module.exports = router;
