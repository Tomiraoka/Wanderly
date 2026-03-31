const express = require('express');
const router = express.Router();
const { register, login, uploadAvatar, toggleFavorite } = require('../controllers/authController');
const upload = require('../middlewares/upload');

router.post('/register', register);
router.post('/login', login);

router.post('/upload-avatar', upload.single('avatar'), uploadAvatar);

router.post('/toggle-favorite', toggleFavorite);

module.exports = router;