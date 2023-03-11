const db = require('../db');
const ganreController = require('./ganreController');

class FilmController {
    async createFilm (filmData) {
        const {title, yr, genres} = filmData;            
        try { 
            const newFilm = await db.query('INSERT INTO film (title, yr) VALUES ($1, $2) RETURNING *', [title, yr]);
            const {film_id}  = newFilm.rows[0];            

            await ganreController.insertGenres(film_id, genres);
            newFilm.rows[0].ganres = await ganreController.getGanresForSingleFilm(film_id);

            return newFilm.rows[0];
        }
        catch {
            throw new Error('500');
        }
    }

    async getFilms () {
        try {                           
            const films = await db.query('SELECT * FROM film');

            for (let i = 0; i < films.rows.length; i++){
                let {film_id} = films.rows[i];
                films.rows[i].genres = await ganreController.getGanresForSingleFilm(film_id);
            }

            return films.rows;
        }
        catch {            
            throw new Error('500');
        }
    }

    async getOneFilm (film_id) {        
        try {
            const film = await db.query('SELECT * FROM film WHERE film_id = $1', [film_id]);            
            if (film.rows[0] == undefined){                
                throw new Error('404');
            }
        
            film.rows[0].genres = await ganreController.getGanresForSingleFilm(film_id);

            return film.rows[0];
        }
        catch (e) {            
            if (e.message == '404'){
                throw e;
            }

            throw new Error('500');
        }
    }

    async updateFilm (filmData, film_id) {   
        const {title, yr, genres} = filmData;
        try {
            const updatedFilm = await db.query('UPDATE film SET title = $1, yr = $2 WHERE film_id = $3 RETURNING *', [title, yr, film_id]);
            if (updatedFilm.rows[0] == undefined){
                throw new Error('404');
            }

            await ganreController.updateFilmGenres(film_id, genres);
            updatedFilm.rows[0].genres = await ganreController.getGanresForSingleFilm(film_id);
            return updatedFilm.rows[0];
        }
        catch (e) {            
            if (e.message == '404'){
                throw e;
            }

            throw new Error('500');
        }       
    }

    async deleteFilm (id) {        
        try {            
            let deleted = (await db.query('DELETE FROM film WHERE film_id = $1 RETURNING *', [id])).rows[0];             
            if (deleted == undefined){
                throw new Error('404');
            }
        }      
        catch (e) {            
            if (e.message == '404'){
                throw e;
            }

            throw new Error('500');
        }   

        return {result : 'Success'}; 
    }
}

module.exports = new FilmController();