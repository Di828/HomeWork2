const Router = require('express');
const router = new Router();
const filmController = require('../Controllers/filmController');

router.get('/films', filmController.getFilms);
router.get('/films/:id', filmController.getOneFilm);
router.post('/films', filmController.createFilm);
router.put('/films/:id', filmController.updateFilm);
router.delete('/films/:id', filmController.deleteFilm);


module.exports = router;