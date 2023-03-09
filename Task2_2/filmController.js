const db = require('../Task2/db');
const ganreController = require('./ganreController');

class FilmController {
    async createFilm (filmData) {
        const {name, year, ganres} = filmData;            
        try { 
            const newFilm = await db.query('INSERT INTO film (name, year) VALUES ($1, $2) RETURNING *', [name, year]);
            const {id}  = newFilm.rows[0];

            await ganreController.insertGanres(id, ganres);
            newFilm.rows[0].ganres = await ganreController.getGanresForSingleFilm(id);

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
                let {id} = films.rows[i];
                films.rows[i].ganres = await ganreController.getGanresForSingleFilm(id);
            }

            return films.rows;
        }
        catch {            
            throw new Error('500');
        }
    }

    async getOneFilm (id) {        
        try {
            const film = await db.query('SELECT * FROM film WHERE Id = $1', [id]);            
            if (film.rows[0] == undefined){                
                throw new Error('404');
            }
        
            film.rows[0].ganres = await ganreController.getGanresForSingleFilm(id);

            return film.rows[0];
        }
        catch (e) {            
            if (e.message == '404'){
                throw e;
            }

            throw new Error('500');
        }
    }

    async updateFilm (filmData, id) {   
        const {name, year, ganres} = filmData;

        try {
            const updatedFilm = await db.query('UPDATE film SET name = $1, year = $2 WHERE id = $3 RETURNING *', [name, year, id]);
            if (updatedFilm.rows[0] == undefined){
                throw new Error('404');
            }

            await ganreController.updateGanres(id, ganres);
            updatedFilm.rows[0].ganres = await ganreController.getGanresForSingleFilm(id);
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
            await ganreController.deleteFilmGanres(id);
            let deleted = (await db.query('DELETE FROM film WHERE Id = $1 RETURNING *', [id])).rows[0];             
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