const db = require('../db');
const ganreController = require('./ganreController');

class FilmController {
    async createFilm (req, res) {
        const {name, year, ganres} = req.body;       
        try { 
            const newFilm = (await db.query('INSERT INTO film (name, year) VALUES ($1, $2) RETURNING *', [name, year])).rows[0];
            const {id}  = newFilm;

            await ganreController.insertGanres(id, ganres);
            newFilm.ganres = await ganreController.getGanresForSingleFilm(id);

            res.json(newFilm);
        }

        catch {
            res.status(500).send('External error');
            return;
        }
    }

    async getFilms (req, res) {
        try {                           
            const films = await db.query('SELECT * FROM film');

            for (let i = 0; i < films.rows.length; i++){
                let {id} = films.rows[i];
                films.rows[i].ganres = await ganreController.getGanresForSingleFilm(id);
            }

            res.json(films.rows);
        }

        catch {
            res.status(500).send('External error');
            return;
        }
    }

    async getOneFilm (req, res) {
        const id = req.params.id;
        try {
            const film = (await db.query('SELECT * FROM film WHERE Id = $1', [id])).rows[0];
            if (film == undefined){
                res.status(404).send('Not Found');
                return;
            }
        
            film.ganres = await ganreController.getGanresForSingleFilm(id);

            res.json(film);
        }
        catch {
            res.status(500).send('External error');
            return;
        }
    }

    async updateFilm (req, res) {   
        const {name, year, ganres} = req.body;
        const id = req.params.id;

        try {
            const updatedFilm = (await db.query('UPDATE film SET name = $1, year = $2 WHERE id = $3 RETURNING *', [name, year, id])).rows[0];
            if (updatedFilm == undefined){
                res.status(404).send('Not Found');
                return;
            }

            await ganreController.updateGanres(id, ganres);
            updatedFilm.ganres = await ganreController.getGanresForSingleFilm(id);
            res.json(updatedFilm);
        }

        catch {
            res.status(500).send('External error');
            return;
        }        
    }

    async deleteFilm (req, res) {
        const id = req.params.id;

        try {
            await ganreController.deleteFilmGanres(id);
            let deleted = (await db.query('DELETE FROM film WHERE Id = $1 RETURNING *', [id])).rows[0];             
            if (deleted == undefined){
                res.status(404).send('Not Found');
                return;
            }
        }      

        catch {
            res.status(500).send('External error');
            return;
        }

        res.json({result : 'Success'}); 
    }
}

module.exports = new FilmController();