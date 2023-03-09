const db = require('../Task2/db');

class GanreController{
    
    async getGanres() {   
        try {
            const ganres = await db.query('SELECT DISTINCT name FROM ganre');            
            return ganres.rows;
        }
        
        catch {
            throw new Error('500');
        }
    }

    async getFilmsWithGanre(name) {        
        try {
            const films = await db.query('SELECT film.id, film.name, film.year FROM ganre JOIN film ON film.id = film_id WHERE ganre.name = $1', [name]);        
        
            if (films.rows.length == 0)
            {
                throw new Error('404');
            }

            return films.rows;
        }

        catch (e) {            
            if (e.message == '404'){
                throw e;
            }

            throw new Error('500');
        }
    }

    async getGanresForSingleFilm(film_id) {           
        let ganres = (await db.query('SELECT name FROM ganre WHERE film_id = $1', [film_id])).rows;

        let ganresNames = [];
        for (let i = 0; i < ganres.length; i++){
            ganresNames.push(ganres[i].name);
        }

        return ganresNames;
    }

    async updateGanres(film_id, ganres){
        const currentFilmGanres = (await db.query('SELECT * FROM ganre WHERE film_id = $1', [film_id])).rows;

        for (let i = 0; i < currentFilmGanres.length; i++){
            if (!ganres.includes(currentFilmGanres[i].name)){
                await db.query('DELETE FROM ganre WHERE Id = $1', [currentFilmGanres[i].id]);
            } else {
                ganres.splice(ganres.indexOf(currentFilmGanres[i].name), 1);
            }
        }

        while (ganres.length){
            let ganre = ganres.shift();            
            await this.insertSingleGanre(film_id, ganre);            
        }
    }

    async insertGanres(film_id, ganres){        
        for (let i = 0; i < ganres.length; i++){
            await this.insertSingleGanre(film_id, ganres[i]);
        }
    }

    async insertSingleGanre(film_id, name){        
        await db.query('INSERT INTO ganre (name, film_id) VALUES ($1, $2)', [name, film_id]);
    }    

    async deleteFilmGanres(film_id){
        await db.query('DELETE FROM ganre WHERE film_id = $1', [film_id]);
    }
}

module.exports = new GanreController();