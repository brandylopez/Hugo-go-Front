'use strict'
 
 var http = require('http').createServer(webServer),
     form = require('fs').readFileSync('Index.html'),
     querystring= require('querystring'),
     util = require('util'),
     dataString = '',
     sys = require ('sys'),
     formidable=require('formidable'),

     execSync = require('child_process').execSync;

   


 function webServer(req, res)
 {
    if(req.method == 'GET')
    {
    	res.writeHead(200, {'Content-Type' : 'text/html'})
        res.end(form)
    }
    
    if(req.method == 'POST')
    {
    	req
    	    .on('data', function (data){
    		 dataString += data
    	    })
    	    .on('end', function (){
    	    	var templateStirng = `Los datos que enviaste por POST como string son: ${dataString}`
                console.log(templateStirng)
    	        res.end(templateStirng)
               
    	    })
        //Comando Para crear el sitio
            .on('end', function(){
                querystring = querystring.parse(dataString);
                execSync(`hugo new site ${querystring['titulo']}`).toString();
            })

            //Comando para Descargar y guardar en su respectiva carpeta el tema e Hugo go

            .on('end', function(){
                 execSync(`cd ${querystring['titulo']} && cd themes && git clone ${querystring['tema']}`).toString();
            })
           // Saliendo a la carpeta Raiz
            .on('end', function(){
                 execSync(`cd ..`).toString();
            })
            // Entrando a la carpeta de la pagina y Creando El post con sus respectivos parametros Traidos desde el Front-end
             .on('end', function(){
                 execSync(`cd ${querystring['titulo']} && hugo new post/${querystring['titulopost']}.md && cd .. && ls`).toString();
            })
           // Iniciando el servidor de Hugo go
            .on('end', function(){
                 execSync(`cd ${querystring['titulo']} && hugo server --theme=${querystring['temaName']} --buildDrafts`).toString();
                console.log('El servidor de Hugo esta corriendo en http://localhost:1313/')
            })
        
          console.log("Ya termino todo")
    }
 }

 http.listen(3000)

 console.log('El servidor esta corriendo en http://localhost:3000/')
