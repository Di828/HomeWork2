const Router = require('express');
const router = new Router();
const ganreController = require('../Controllers/ganreController');

router.get('/ganres', ganreController.getGanres);
router.get('/ganre', ganreController.getFilmsWithGanre);

module.exports = router;