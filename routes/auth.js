const router = require('express').Router();
const registerController = require('../controllers/register');

router.post('/register', (req, res) => {
    registerController(req, res);
});

module.exports = router;
