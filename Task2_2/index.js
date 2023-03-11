const filmController = require('./Controllers/filmController');
const ganreController = require('./Controllers/ganreController');
const http = require('http');

const PORT = process.env.PORT || 5000;

const server = http.createServer();

server.on('request', async (req, res) => {    
    res.writeHead(200, {'Content-type' : 'text/json'});    
    let url = req.url;  

    try {
        if (req.method === 'GET'){
            switch (true) {
                case /^[/]api[/]films$/.test(url):
                    res.end(JSON.stringify(await filmController.getFilms()));
                    break;
                case /^[/]api[/]films[/]\d+$/.test(url):
                    let id = +req.url.split('/')[3];                     
                    res.end(JSON.stringify(await filmController.getOneFilm(id)));
                    break;
                case /^[/]api[/]genres$/.test(url):
                    res.end(JSON.stringify(await ganreController.getGenres()));
                    break;
                case /^[/]api[/]genres[?]name=[A-Za-z]/.test(url):
                    let genre = url.split('name=')[1];
                    res.end(JSON.stringify(await ganreController.getFilmsWithGenre(genre)));
                    break;
                default :
                    res.writeHead(400);
                    res.end(JSON.stringify({'result' : 'Bad request'}));
            }        
        }

        else if (req.method === 'DELETE'){        
            let id = +req.url.split('/')[3];
            switch (true) {

            case /^[/]api[/]films[/]\d+$/.test(url):                
                res.end(JSON.stringify(await filmController.deleteFilm(id)));
                break;

            case /^[/]api[/]genres[/]\d+$/.test(url):                
                res.end(JSON.stringify(await ganreController.deleteGenre(id)));
                break;

            default :
                res.writeHead(400);
                res.end(JSON.stringify({'result' : 'Bad request'}));
            }
        }

        else if (req.method === 'POST'){                                
            let body = '';
            switch (true) {         

                case /^[/]api[/]films$/.test(url) :                    
                    req.on('data', chunk => {
                    body += chunk.toString();
                    });

                    req.on('end', async () => {            
                    let filmData = await JSON.parse(body);            
                    res.end(JSON.stringify(await filmController.createFilm(filmData)));
                    });

                    break;

                case /^[/]api[/]genres$/.test(url) :                    
                    req.on('data', chunk => {
                    body += chunk.toString();
                    });
    
                    req.on('end', async () => {            
                    let genreData = await JSON.parse(body);            
                    res.end(JSON.stringify(await ganreController.createGenre(genreData)));
                    });
    
                    break;

                default :
                    res.writeHead(400);
                    res.end(JSON.stringify({'result' : 'Bad request'}));            
            }
        }

        else if (req.method === 'PUT'){                    
            let id = +req.url.split('/')[3];
            let body = '';
            switch (true){

            case /^[/]api[/]films[/]\d+$/.test(url):                                
                req.on('data', chunk => {
                body += chunk.toString();
                });

                req.on('end', async () => {            
                let filmData = await JSON.parse(body);            
                res.end(JSON.stringify(await filmController.updateFilm(filmData, id)));
                })  
                
                break;

            case /^[/]api[/]genres[/]\d+$/.test(url):                                 
                req.on('data', chunk => {
                body += chunk.toString();
                });
    
                req.on('end', async () => {            
                let genreData = await JSON.parse(body);            
                res.end(JSON.stringify(await ganreController.updateGenre(genreData, id)));
                })  
                    
                break;

            default :
                res.writeHead(400);
                res.end(JSON.stringify({'result' : 'Bad request'}));            
            }
        }
    }
    catch (e) {
        switch (e.message){
            case '404' :
                res.writeHead(404);
                res.end(JSON.stringify({'result' : 'Not found'}));
                break;
            case '500' :
                res.writeHead(500);
                res.end(JSON.stringify({'result' : 'External error'}));
                break;
        }        
    }   
});

server.listen(PORT, () => console.log(`Server start listen at port ${PORT}`));