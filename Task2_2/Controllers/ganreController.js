const db = require('../db');

class GanreController{

    async createGenre (genreData) {
        const {name} = genreData;
        try { 
            const newGenre = await db.query('INSERT INTO genre (name) VALUES ($1) RETURNING *', [name]);            

            return newGenre.rows[0];
        }
        catch {
            throw new Error('500');
        }
    }

    async updateGenre (genreData, genre_id) {
        const {name} = genreData;

        try {
            const updatedGenre = await db.query('UPDATE genre SET name = $1 WHERE genre_id = $2 RETURNING *', [name, genre_id]);
            if (updatedGenre.rows[0] == undefined){
                throw new Error('404');
            }
            
            return updatedGenre.rows[0];
        }
        catch (e) {            
            if (e.message == '404'){
                throw e;
            }

            throw new Error('500');
        }       
    }

    async deleteGenre (genre_id) {
        try {
            let deleted = (await db.query('DELETE FROM genre WHERE genre_id = $1 RETURNING *', [genre_id])).rows[0];             
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
    
    async getGenres() {   
        try {
            const ganres = await db.query('SELECT * FROM genre'); 
            return ganres.rows;
        }        
        catch {
            throw new Error('500');
        }
    }

    async getFilmsWithGenre(name) {        
        try {
            const films = await db.query("SELECT film.film_id, film.title, film.yr FROM genre JOIN filmgenre USING(genre_id) JOIN film USING(film_id) WHERE genre.name = $1", [name]);
        
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
        let ganres = (await db.query('SELECT name FROM genre JOIN filmgenre USING(genre_id) WHERE film_id = $1', [film_id])).rows;        
        let ganresNames = [];
        
        for (let i = 0; i < ganres.length; i++){
            ganresNames.push(ganres[i].name);
        }

        return ganresNames;
    }

    async updateFilmGenres(film_id, genres){
        const currentFilmGenres = (await db.query('SELECT genre_id, name FROM genre JOIN filmgenre USING(genre_id) WHERE film_id = $1', [film_id])).rows;
        console.log(currentFilmGenres);
        console.log(genres);

        for (let i = 0; i < currentFilmGenres.length; i++){
            if (!genres.includes(currentFilmGenres[i].name)){
                await db.query('DELETE FROM filmgenre WHERE film_id = $1 AND genre_id = $2', [film_id, currentFilmGenres[i].genre_id]);
            } else {
                genres.splice(genres.indexOf(currentFilmGenres[i].name), 1);
            }
        }

        while (genres.length){
            let ganre = genres.shift();            
            await this.insertSingleGenre(film_id, ganre);            
        }
    }

    async insertGenres(film_id, genres){        
        for (let i = 0; i < genres.length; i++){
            await this.insertSingleGenre(film_id, genres[i]);
        }
    }

    async insertSingleGenre(film_id, name){        
        const genre = (await db.query('SELECT genre_id from genre where name = $1', [name])).rows;
        let genre_id = {};           

        if (genre.length == 0){                 
            genre_id = (await db.query('INSERT INTO genre (name) VALUES ($1) RETURNING genre_id', [name])).rows[0].genre_id;  
        } else {                        
            genre_id = genre[0].genre_id;  
        }
        
        await db.query('INSERT INTO filmgenre VALUES ($1, $2)',[film_id, genre_id]);
    }    

    async deleteFilmGanres(film_id){
        await db.query('DELETE FROM ganre WHERE film_id = $1', [film_id]);
    }
}

module.exports = new GanreController();