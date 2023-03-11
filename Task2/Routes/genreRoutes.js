const Router = require('express');
const router = new Router();
const ganreController = require('../Controllers/ganreController');

router.get('/genres', ganreController.getGanres);
router.get('/genres', ganreController.getFilmsWithGanre);

module.exports = router;