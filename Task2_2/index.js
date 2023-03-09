const filmController = require('./filmController');
const ganreController = require('./ganreController');
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
                case /^[/]api[/]ganres$/.test(url):
                    res.end(JSON.stringify(await ganreController.getGanres()));
                    break;
                case /^[/]api[/]ganre[?]name=[A-Za-z]/.test(url):
                    let genre = url.split('name=')[1];
                    res.end(JSON.stringify(await ganreController.getFilmsWithGanre(genre)));
                    break;
                default :
                    res.writeHead(400);
                    res.end(JSON.stringify({'result' : 'Bad request'}));
            }        
        }

        else if (req.method === 'DELETE'){        
            if (/^[/]api[/]films[/]\d+$/.test(url)){            
                let id = +req.url.split('/')[3];
                res.end(JSON.stringify(await filmController.deleteFilm(id)))
            } else {
                res.writeHead(400);
                res.end(JSON.stringify({'result' : 'Bad request'}));
            }
        }

        else if (req.method === 'POST'){        
            let filmData = {};
            if (/^[/]api[/]films$/.test(url)){
                let body = '';
                req.on('data', chunk => {
                body += chunk.toString();
                });

                req.on('end', async () => {            
                filmData = await JSON.parse(body);            
                res.end(JSON.stringify(await filmController.createFilm(filmData)));
                })                 
            } else {
                res.writeHead(400);
                res.end(JSON.stringify({'result' : 'Bad request'}));
            }
        }

        else if (req.method === 'PUT'){        
            let filmData = {};
            if (/^[/]api[/]films[/]\d+$/.test(url)){
                let body = '';
                let id = +req.url.split('/')[3];
                req.on('data', chunk => {
                body += chunk.toString();
                });

                req.on('end', async () => {            
                filmData = await JSON.parse(body);            
                res.end(JSON.stringify(await filmController.updateFilm(filmData, id)));
                })                 
            } else {
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